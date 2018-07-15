import React, { Component } from 'react';

/*  WIDGETS */
import Trending from '../widgets/Trending';
import SearchBar from '../widgets/SearchBar';
import Loading from '../widgets/Loading';

import {getSearchResults_Api} from '../api/StandardApi';

class Search extends Component {

	constructor(props) {
		super(props);

		this.state = {
			movies:[],
			shows:[],
			query:'',
			searching:true
		}

		if (this.props.location.state === undefined) {
			console.log("UNDEFINED");
			this.props.history.push({
				pathname: '/'
		    })
		    return;
		}
		
		this.query = this.props.location.state.query;
		this.getSearchResults();

		this.itemClicked = this.itemClicked.bind(this);
		this.handleChange = this.handleChange.bind(this);
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

	
	getSearchResults() {
		getSearchResults_Api(this.query)
			.then((data) => {

				this.setState({
					movies:data.movies,
					shows:data.shows,
					searching:false
				})
				
			})
			
	}


	handleChange(event) {
		this.setState({query: event.target.value});
	}

	handleEnter(e) {
		if (e.key === 'Enter') this.search();
	}

	search() {
		if (this.state.query.length < 1) return;

		this.query = this.state.query;
		this.getSearchResults();

	}


	displayResults() {

		if (this.state.searching) {
			return <Loading />
		}

		return (
			<div className="popular_display">
		        <h1>Shows</h1>
		        
		        {
		        	this.state.shows.length > 0 ?
		        	<Trending 
			            items={this.state.shows} 
			            cb={this.itemClicked}
			      	/>
			      	:
			      	<div>No shows found</div>
		        }
		    	
		    

		        <h1>Movies</h1>
		        
		    	{
		        	this.state.movies.length > 0 ?
		        	<Trending 
			            items={this.state.movies} 
			            cb={this.itemClicked}
			      	/>
			      	:
			      	<div>No movies found</div>
		        }
		        
		    </div>
		);
	}

	

	render() {
		return (
			<div>
				<SearchBar 
					query = {this.state.query}
					onchange = {this.handleChange}
					onkey = {this.handleEnter}
					search = {this.search}
					history = {this.props.history}
				/>

				{this.displayResults()}
				
			</div>
		);
	}
}

export default Search;
