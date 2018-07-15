import React from 'react';






function SearchBar(props) {


	return (
		<div className = "searchArea">
			<div 
				className = "home fas fa-home"
				onClick = {()=> {
					props.history.push({
						pathname: '/'
				    })
				}}
				
			></div>
			<input
				type = "text" 
				value = {props.query} 
				onChange={props.onchange}
				onKeyPress={props.onkey}
				className = "search"
				placeholder = "Search a soundtrack..."

			/>
			<div 
				className = "submit fas fa-search"
				onClick = {props.search}
			></div>
		</div>
	);
}


export default SearchBar;


