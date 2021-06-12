import React,{useEffect,useState} from 'react'
import {useLocation,useHistory} from 'react-router-dom'
import queryString from 'query-string'
import axios from 'axios'

import SpotifyWebApi from 'spotify-web-api-js'
import {client_id} from '../../AuthParams/authKey'
import {client_secret} from '../../AuthParams/authSecret'
import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react'
const ENDPOINT='http://localhost:3000/'
export const Home = () => {
    let spotifyApi=new SpotifyWebApi()
    let location=useLocation()
    const {code}=queryString.parse(location.search)
    const [refreshToken,setRefreshToken]=useState('')
    let history=useHistory()
   
   
    const[accessToken,setAccessToken]=useState('')
   
    useEffect(()=>{
    
      
     const body={
            grant_type:"authorization_code",
            code:code,
            redirect_uri:`${ENDPOINT}home`,
            client_id:client_id,
            client_secret:client_secret,
          
        
      }
     
        const data = Object.keys(body)
        .map((key) => `${key}=${encodeURIComponent(body[key])}`)
        .join('&');
        
        const options={
            method:'POST',
            headers:{
                'content-type':'application/x-www-form-urlencoded'
            },
           data,
           url:'https://accounts.spotify.com/api/token'
        }
           
              
    //    console.log(options)
     
       
        axios(options)
        .then((data)=>{
          // console.log(data)
            // console.log(data.data.refresh_token)
            setAccessToken(data.data.access_token)
            //if(data.data.refresh_token)
            setRefreshToken(data.data.refresh_token)
           
            
        })
       
        
    
    },[code])
    useEffect(()=>{
        if(!accessToken || !refreshToken)return null;
       
            history.push(`/stats?access_token=${accessToken}&refresh_token=${refreshToken}`)

        

    },[accessToken,refreshToken])
    // console.log('Atokens',accessToken)
    //     console.log('rtoken',refreshToken)
        
    
    // const setCode=async(access_token)=>{

    //     if(!access_token)return null
    //     console.log(code)
    //     await spotifyApi.setAccessToken({code})
    //     spotifyApi.getMe()
    //     .then((data,err)=>{
    //         if(err){
    //             console.log(err)
    //         }
    //         else{
    //             console.log(data)
    //         }
    //     })

    
    // setCode(access_token)
    
    // }
    
  
   
    // console.log(code)

    // spotifyApi.getPlaylist(code)
    // .then(function(data){
    //     console.log(data)

    // },
    // function(error){
    //     console.log(error)

    // }
    // )
    return (
        <div>
     <Dimmer active>
        <Loader size='massive'>Loading</Loader>
     </Dimmer>

        </div>
    )
}
