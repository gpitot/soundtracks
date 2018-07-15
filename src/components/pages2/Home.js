import React, { Component } from 'react';


/*  WIDGETS */
import Trending from '../widgets/Trending';
import SearchBar from '../widgets/SearchBar';


import {
	getTrending_Api
} from '../api/StandardApi';

class Home extends Component {

	constructor(props) {
		super(props);

		this.state = {
			shows:[],
			movies:[],
			query:'',
			randomImage:null
		}


		this.getTrending();

		this.itemClicked = this.itemClicked.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleEnter = this.handleEnter.bind(this);
		this.search = this.search.bind(this);
	}

	itemClicked(item) {
	    
	    //push router location with this item
	    this.props.history.push({
	      pathname: '/result',
	      state: {
	        current:item
	      }
	    })
  	}

  	handleChange(event) {
		this.setState({query: event.target.value});
	}

	handleEnter(e) {
		if (e.key === 'Enter') this.search();
	}


	getTrending() {
		getTrending_Api()
			.then((data) => {
				
				this.setState({
					movies:data.movies,
					shows:data.shows,
					randomImage:this.randomImage(data.movies.concat(data.shows))
				});
				
				console.log(data);
			})
	}



	search() {
		if (this.state.query.length < 1) return;

		this.props.history.push({
	      pathname: '/search',
	      state: {
	        query:this.state.query
	      }
	    })
	}


	randomImage(data) {
		
		let images = [];
		for (let m of data) {
			if (m.image.includes('/img-www.tf-cdn.com')) {
				images.push(m.image);
			}
		}
		return images[Math.floor(Math.random() * images.length)];

	}
	

	render() {
		return (
			<div>

				<img 
					src = {this.state.randomImage} 
					className = "background homeImage"
				/>
				
				<SearchBar 
					query = {this.state.query}
					onchange = {this.handleChange}
					onkey = {this.handleEnter}
					search = {this.search}
					history = {this.props.history}
				/>


				<div className="popular_display">
			        <h1>Trending shows</h1>
			        
		        	<Trending 
			            items={this.state.shows} 
			            cb={this.itemClicked}
		          	/>
		        

			        <h1>Trending movies</h1>
			        
		        	<Trending 
			            items={this.state.movies} 
			            cb={this.itemClicked}
		          	/>
			        
			    </div>
		   </div>
		);
	}
}

export default Home;
