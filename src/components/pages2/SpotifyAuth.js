import React from 'react';

import { getToken_Api } from '../api/SpotifyApi';

import Cookies from 'universal-cookie';
const cookies = new Cookies();


function SpotifyAuth(props) {
	
	const params = param_to_object(props.location.search);
	getToken_Api(params)
		.then((data) => {	
	
			if (data.auth) {
				cookies.set('token', data.token, {path:'/'});
				cookies.set('rf_token', data.rf_token, {path:'/'});

				//redirect to results
				let ent_id = cookies.get('ent_id');

				if (ent_id === undefined) {
					props.history.push({
						pathname: '/'
					})
					
				}

				props.history.push({
					pathname: '/result',
					state : {
						ent_id:ent_id
					}
				});
			} else {
				
			}
		})


	return (<div></div>);
}



function param_to_object(param) {

	if (param.length < 0 || param === null || param === undefined) return {};
	let dict = {};
	param = param.substr(1);
	
	let params = param.split('&');
	for (let p of params) {
		let x = p.split('=');
		if (x.length > 1) {
			dict[x[0]] = x[1];
		}
	}
	return dict;
}






export default SpotifyAuth;