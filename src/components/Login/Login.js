import React from 'react'
import {useHistory,Link} from 'react-router-dom'
import axios from 'axios'
import SpotifyWebApi from 'spotify-web-api-js'
import spotify from '../../assets/spotify-16.png'
import { Button, Icon} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import {client_id} from '../../AuthParams/authKey'


import './Login.css'
const ENDPOINT='http://localhost:3000/'
const Login = () => {
	let history=useHistory()
	const response_type='code'
	const redirect_uri=`${ENDPOINT}home`
	const authUrl=`https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=${response_type}&redirect_uri=${redirect_uri}&scope=user-top-read ugc-image-upload`
  //console.log(authUrl)
	const handleClick=()=>{
		//history.push('https://accounts.spotify.com/authorize?client_id=cb70eaed88a34c4c98c8f940a76d7844&response_type=code&redirect_uri=http://localhost:3000')
		history.push('/home')
	}

    return (<div>
        <div className="neon">
          Musify
          </div>
          <a href={authUrl}>
		<Button className="login" color='green'  
		//onClick={handleClick}
		>
			<Icon name='spotify' /> Login
		</Button>
		</a>
        </div>
    )
}

export default Login
