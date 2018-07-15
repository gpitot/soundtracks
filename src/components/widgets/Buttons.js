


import React, { Component } from 'react';






class Buttons extends Component {
	
	constructor(props) {
		super(props);
	}


	addButton() {
		if (this.props.songsComplete) {
			return (
				<div 
					className="add"
					onClick={this.props.add}
				>Add to spotify
				</div>
			);
			
		}
		return (
			<div 
				className="add grayed"
			>Add to spotify
			</div>
		);
	}

	updateButton() {
		if (this.props.songsComplete) {
			return (
				<div 
					className = "update"
					onClick={this.props.update}
				>Update
				</div>
			);
			
		}
		return (
			<div 
				className = "update grayed"
			>Update
			</div>
		);
	}


	goHome() {
		this.props.history.push({
			pathname: '/'
		});
	}

	render() {
		return (
			<div className="buttons">
				
				<div
					className = "home fas fa-home"
					onClick= {() => {this.goHome()}}
				></div>

				{this.addButton()}
				{this.updateButton()}

			</div>

		);
	}
}



export default Buttons;

/* 
set cookie

click on update then check update


clcik on add then check auth
get playlists
add playlists
add songs

*/