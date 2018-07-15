



import React from 'react';


function SpotifyUrl(props) {
	if (!props.visible) return <div></div>
	return (
		<div id = "urlArea">
			<a 
				href = {props.SpotifyUrl}
				target="_blank"
				onClick = {()=>{
					props.history.push({
						pathname: '/'
					})
				}}
			>
			{props.SpotifyName}
			</a>
		</div>
	)
}




export default SpotifyUrl;