/*
once the title and url is decided , go here from either search or home 
*/
import React, { Component } from 'react';


import {
	check_valid_spotify_token,
	get_playlists,
	spotify_search_track,
	add_to_spotify
} from '../api/SpotifyApi';

import { 
	addRequested_Api,
	getIndividual_Api,
	getMovieSongs_Api,
	getShowSongsRecursion_Api
} from '../api/StandardApi';


import Buttons from '../widgets/Buttons';
import Loading from '../widgets/Loading';
import Playlists from '../widgets/Playlists';
import SpotifyUrl from '../widgets/SpotifyUrl';

import Cookies from 'universal-cookie';
const cookies = new Cookies();

class Result extends Component {

	constructor(props) {
		super(props);

		

		this.state = {
			ent_id:null,
			songs:[],
			last_updated:null,
			loading:false,
			songsComplete:false, //this is false while loading songs, or searching for uri, or updating etc

			playlistsComponent:false,
			playlists:[[null,null]],


			SpotifyUrlComponent:false,
			SpotifyName:null,
			SpotifyUrl:null
		}


		this.current = {
			image:null,
			ent_id:null
		}

		this.episodeCount = 0;


		if (this.props.location.state === undefined) {

			this.props.history.push({
				pathname: '/'
		    })
		    return;
		}


		//home or search
		if (this.props.location.state.current != undefined) {
			this.current = this.props.location.state.current;
			
			if (this.current.ent_type == 'show') {
				this.getShowSongs();
			} else if (this.current.ent_type == 'movie') {
				this.getMovieSongs();
			}

			//add new request if from home
			if (this.current.ent_id) {
				addRequested_Api(this.current.ent_id).then((data)=>{console.log(data)})
			}


		} else if (this.props.location.state.ent_id != undefined) {
			//coming from /spotifycallback
			this.setState({loading:true});
			this.current.ent_id = this.props.location.state.ent_id;

			getIndividual_Api(this.current.ent_id)
				.then((data) => {
					this.current = data.data;
					this.setState({
						loading:false
					});

			
					if (this.current.ent_type == 'show') {
						this.getShowSongs();
					} else if (this.current.ent_type == 'movie') {
						this.getMovieSongs();
					}
				})
			
			
		} else {
			this.props.history.push({
				pathname: '/'
		    })
		}


		
		

		
		this.update = this.update.bind(this);
		this.add = this.add.bind(this);
		this.add_to_playlist = this.add_to_playlist.bind(this);
	}


	update() {
		if (this.current.ent_type == 'show') {
			this.getShowSongs(true);
		} else if (this.current.ent_type == 'movie') {
			this.getMovieSongs(true);
		}

		this.setState({
			songs:[],
			songsComplete:false
		});
	}


	getMovieSongs(update=false) {

		getMovieSongs_Api(this.current.ent_id, this.current.url, this.current.title, this.current.image, update)
			.then((data) => {
				if (data.ent_id) {
					this.setState({
						ent_id:data.ent_id,
						last_updated:data.last_updated,
						songs:data.songs,
						songsComplete:true
					});
				}
			})
	}



	getShowSongs(update=false) {
		this.getShowSongs_recursion(this.current.ent_id, 'title', this.current.url, update); //id, level, url, update
	}


	getShowSongs_recursion(ent_id, level, url, update=false) {
		getShowSongsRecursion_Api(ent_id, level, url, this.current.title, this.current.image, update)
			.then((data) => {
				if (data.level == 'complete') {
					//data straight from db, set songs and be happy
					this.setState({
						ent_id:data.ent_id,
						last_updated:data.last_updated,
						songs:data.songs,
						songsComplete:true
					});
					return;
				} else if (data.level == 'seasons') {
					//get ent_id
					this.setState({ent_id:data.ent_id});
					
					//for each season recurse
					for (let url of data.data) {
						this.getShowSongs_recursion(data.ent_id, data.level, url);
					}
				} else if (data.level == 'episodes') {
					this.episodeCount += data.data.length;
					//for each season recurse
					for (let url of data.data) {
						this.getShowSongs_recursion(ent_id, data.level, url);
					}
				} else if (data.level == 'songs') {
					//update songs
					this.episodeCount -= 1;
					if (this.episodeCount == 0) {
						//completed all episodes
						this.setState({songsComplete:true});
					}

					this.setState((prevState, props) => ({
						songs: data.data.concat(prevState.songs)
					}));
					

				}
			});
	}




	add() {
		//check if token in cookies
		let token = cookies.get('token');
		let rf_token = cookies.get('rf_token');

		check_valid_spotify_token(token, rf_token).then((data)=>{

			if (data.auth) {
				//token is correct, get song uris
				this.get_song_uris(token, ()=> {
					//after getting uris get playlists
					get_playlists(token, data.user_id).then((data)=>{
						let playlists = [[null, 'New playlist']].concat(data.playlists);
						this.setState({
							playlists:playlists,
							playlistsComponent:true
						})
					});
				});
				


			} else {
				//set cookie for ent_id
				cookies.set('ent_id', this.state.ent_id, {path:'/'});
				window.location.href = data.redirect;

			}
		})
	}
	

	get_song_uris(token, cb) {
		let songs = this.state.songs;
		let index = 0;
		this.setState({songsComplete:false})
		for (let s of songs) {
			if (s.uri === null) {
				spotify_search_track(token, s).then((data)=> {
					s.uri = data.uri;
					s.searched = true;

					index += 1;
					this.setState({songs:songs});

					if (index == songs.length) {
						cb();
					}
					
				});
			} else {
				index += 1;
				s.searched = true;
			}

			
		}
		if (index == songs.length) {
			cb();
		}
	}

	add_to_playlist(playlist) {
		let token = cookies.get('token');
		let rf_token = cookies.get('rf_token');
		check_valid_spotify_token(token, rf_token).then((data)=>{

			if (data.auth) {
				//token is correct, get song uris
				add_to_spotify(token, this.state.songs, data.user_id, playlist[0], playlist[1]).then((data)=> {
					console.log(data);
					if (data.success) {
						this.setState({
							playlistsComponent:false,
							SpotifyUrlComponent:true,
							SpotifyName:data.playlistname,
							SpotifyUrl:data.url
						})
					}
				})


			} else {
				//set cookie for ent_id
				cookies.set('ent_id', this.props.ent_id, {path:'/'});
				
				window.location.href = data.redirect;

			}
	});
		
	}


	get_song_link(song) {
		if (song.searched === undefined) return;
		if (song.uri === null) {
			return <div className = 'missing'></div>
		}
		let h = 'https://open.spotify.com/track/' + song.uri.split(':')[2];
		return <a 
					className = 'found'
					href = {h} target="_blank"
				> </a>
	}







	render() {
		if (this.state.loading) {
			return <Loading />
		} else {
			return (
				<div>
			      	<img src={this.current.image} className="background" />


			      	<Playlists 
			      		visible={this.state.playlistsComponent}
			      		playlists = {this.state.playlists}
			      		add_to_playlist = {this.add_to_playlist}
			      	/>

			      	<SpotifyUrl
			      		visible = {this.state.SpotifyUrlComponent}
			      		SpotifyName = {this.state.SpotifyName}
			      		SpotifyUrl = {this.state.SpotifyUrl}
			      		history = {this.props.history}
			      	/>

			      	<div className="results">
			      		<h1>{this.current.title}</h1>

			      		<Buttons 
			      			update = {this.update}
			      			add = {this.add}
			      			ent_id = {this.state.ent_id}
			      			songs = {this.state.songs}
			      			history = {this.props.history}
			      			songsComplete = {this.state.songsComplete}
			      		/>
						
						{
							this.state.songs.map((song, i) => {
								return (
									<div 
										key = {i}
										className="row"
									>
										{song.title} - {song.artist}

										{this.get_song_link(song)}

									</div>
								)
							})
							
						}
						
			      	</div>
			    </div>
			   );
		}
		
	}
}




export default Result;
