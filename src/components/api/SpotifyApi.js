
const HOST = 'http://gpitot.pythonanywhere.com';


export function check_valid_spotify_token(token, rf_token) {
	const data = {
		token:token,
		rf_token:rf_token
	}

	const config = {
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
    	},
	    method: "POST",
	    body: JSON.stringify(data)
	}

	return fetch(HOST+'/soundtrack/api/check_valid_spotify_token', config)
		.then((data) => {
			return data.json();
		})
		.catch((err) => {

		})
}



export function get_playlists(token, user_id) {
	const data = {
		token:token,
		user_id:user_id
	}

	const config = {
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
    	},
	    method: "POST",
	    body: JSON.stringify(data)
	}

	return fetch(HOST+'/soundtrack/api/get_playlists', config)
		.then((data) => {
			return data.json();
		})
		.catch((err) => {

		})
}


export function add_to_spotify(token, songs, user_id, playlist_id, playlist_name) {
	const data = {
		token:token,
		user_id:user_id,
		songs:songs,
		playlist_id:playlist_id,
		playlist_name:playlist_name
	}

	const config = {
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
    	},
	    method: "POST",
	    body: JSON.stringify(data)
	}

	return fetch(HOST+'/soundtrack/api/add_to_spotify', config)
		.then((data) => {
			return data.json();
		})
		.catch((err) => {

		})
}


export function spotify_search_track(token, song) {
	const data = {
		token:token,
		track:song.title + ' ' + song.artist,
		song_id:song.song_id
	}

	const config = {
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
    	},
	    method: "POST",
	    body: JSON.stringify(data)
	}

	return fetch(HOST+'/soundtrack/api/search_track', config)
		.then((data) => {
			return data.json();
		})
		.catch((err) => {

		})
}


export function getToken_Api(data) {

	const config = {
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
    	},
	    method: "POST",
	    body: JSON.stringify(data)
	}

	return fetch(HOST+'/soundtrack/api/get_token', config)
		.then((data) => {
			return data.json();
		})
		.catch((err) => {
			console.log(err);
		});
}