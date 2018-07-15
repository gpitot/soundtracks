import React, { Component } from 'react';


class Playlists extends Component {

	constructor(props) {
		super(props);
		
		
		this.state = {
			current:this.props.playlists[0]
		}
			
		this.add_to_playlist = this.add_to_playlist.bind(this);
		
	}


	componentWillReceiveProps(nextProps) {
	// You don't have to do this check first, but it can help prevent an unneeded render
		if (nextProps.playlists[0] !== this.state.current) {
			this.setState({ current: nextProps.playlists[0] });
		}
	}
	

	add_to_playlist() {
		//[id, name]
		if (this.state.current[0] == null) {
			let v = document.getElementById("playlistArea").getElementsByTagName("INPUT")[0].value;
			this.props.add_to_playlist([null, v]);
		} else {
			this.props.add_to_playlist(this.state.current);
		}
		
	}
	
	
	
	
	
	render() {
		if (!this.props.visible) return <div></div>;
		return  (
			<div className = "playlists"  id = "playlistArea">
				<div className = "current" onClick = {toggle_dropdown}>
					{this.state.current[1]}
				</div>
				<div className = "dropdown" id = "playlists_dropdown">
					{
						this.props.playlists.map((playlist, i) => {
							return (<div 
								className = "item"
								key = {i}
								onClick= {()=>{
									this.setState({current : this.props.playlists[i]});
									toggle_dropdown();					
								}}
							>
								{playlist[1]}

							</div>)
						})
					}
					
				</div>
				<input type = "text" className = 'search new' />
				<div 
					className = "submit"
					onClick = {this.add_to_playlist}
				></div>

			</div>
		);
	}
	
}



function toggle_dropdown() {
	let d = document.getElementById("playlists_dropdown");
	let r = document.getElementsByClassName("results")[0];
	if (d.style.display == "none" || d.style.display == "") {
		d.style.display = "block";
		r.style.display = "none";
	} else {
		d.style.display = "none";
		r.style.display = "block";
	}
}



export default Playlists;