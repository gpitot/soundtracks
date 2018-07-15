import React from 'react'
import { Switch, Route } from 'react-router-dom'



import Home from './components/pages2/Home'
import Search from './components/pages2/Search'
import Result from './components/pages2/Result'

import SpotifyAuth from './components/pages2/SpotifyAuth'



const Urls = () => (
 
	<div>
	  <Route exact path='/' component={Home}/>
	  <Route exact path='/search' component={Search}/>
	  <Route exact path='/result' component={Result}/>


	  <Route exact path='/playlists/callback' component={SpotifyAuth}/>
	</div>
  
)

export default Urls