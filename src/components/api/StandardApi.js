
const HOST = 'http://gpitot.pythonanywhere.com';


export function addRequested_Api(ent_id) {
	const data = {
		ent_id:ent_id
	}

	const config = {
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
    	},
	    method: "POST",
	    body: JSON.stringify(data)
	}

	return fetch(HOST+'/soundtrack/api/add_requested', config)
		.then((data) => {
			return data.json();
		})
		.catch((err) => {

		})
}


export function getTrending_Api() {
	return fetch(HOST+'/soundtrack/api/popular')
		.then((data) => {
			return data.json();
		})
		.catch((err) => {
			console.log(err);
		});
}


export function getIndividual_Api(ent_id) {
	const data = {
		ent_id:ent_id
	}
	const config = {
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
	    method: "POST",
	    body: JSON.stringify(data)
	}

	return fetch(HOST+'/soundtrack/api/individual', config)
		.then((data) => {
			return data.json();
		})
		.catch((err)=> {
			console.log(err);
		})
}


export function getMovieSongs_Api(ent_id, url, title, image, update) {
	const data = {
		ent_id:ent_id,
		ent_type:'movie',
		url:url,
		title:title,
		image:image,
		update:update
	}
	
	const config = {
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
    	},
	    method: "POST",
	    body: JSON.stringify(data)
	}

	return fetch(HOST+'/soundtrack/api/songs', config)
		.then((data) => {
			return data.json();
		})
		.catch((err) => {
			console.log(err);
		});
}



export function getShowSongsRecursion_Api(ent_id, level, url, title, image, update) {
	const data = {
		ent_id:ent_id,
		ent_type:'show',
		level:level,
		url:url,
		title:title,
		image:image,
		update:update
	}

	const config = {
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
    	},
	    method: "POST",
	    body: JSON.stringify(data)
	}

	return fetch(HOST+'/soundtrack/api/songs', config)
		.then((data) => {
			return data.json();
		})
		.catch((err) => {
			console.log(err);
		})
}



export function getSearchResults_Api(query) {
	const data = {
		query:query
	}

	const config = {
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
    	},
	    method: "POST",
	    body: JSON.stringify(data)
	}

	return fetch(HOST+'/soundtrack/api/search', config)
		.then((data) => {
			return data.json();
		})
		.catch((err) => {
			console.log(err);
		})
}


