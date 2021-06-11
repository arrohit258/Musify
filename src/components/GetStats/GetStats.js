import React,{useEffect,useLayoutEffect,useState} from 'react'
import {useLocation,useHistory} from 'react-router-dom'
import queryString from 'query-string'
import Cards  from '../Cards/Cards'
import SpotifyWebApi from 'spotify-web-api-js'

import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react'
import { Grid,Card, Icon,  Button,Container } from 'semantic-ui-react'
import axios from 'axios'
const ENDPOINT='http://localhost:3000/'

const GetStats = () => {
    let location=useLocation() 
 
    const {access_token,refresh_token}=queryString.parse(location.search)
    
    let spotifyApi=new SpotifyWebApi()
    const[ids,setIds]=useState([])
    const[popularity,setPopularity]=useState([])
    const[danceability,setDanceability]=useState([])
    const[names,setNames]=useState([])
    const[energy,setEnergy]=useState([])
    const[acousticness,setacousticness]=useState([])
    const[speechiness,setSpeechiness]=useState([])
    const[instrumentalness,setInstrumentalness]=useState([])
    const[valence,setValence]=useState([])
    const[loudness,setLoudness]=useState([])
  
    useEffect(()=>{
        if(ids.length >=4)return null
        if(!access_token)return null
        async function getMyTopTracks(){
            console.log("hi")

            await spotifyApi.setAccessToken(access_token)
            await spotifyApi.getMyTopTracks({limit:4,time_range:'long_term'})
            .then(async(data,err)=>{
                if(data){
                    // console.log(data)
                    // console.log(data.items[0].album.images[1].url)
                    await data.items.forEach(item => {
                        console.log(item)
                       console.log(item.id)
                    
                         setIds(ids=>[...ids,item.id])
                         setNames(names=>[...names,item.name])
                         setPopularity(popularity=>[...popularity,item.popularity])
                     

                    });
                  
                }else{
                    console.log(err)
                }
            })

        }

     console.log("arr",ids)

     getMyTopTracks()
        

        
    },[])
console.log(ids) 
    useEffect(()=>{
        if(ids.length!==4 )return null
        async function getTrackFeatures(){
           // await spotifyApi.setAccessToken(access_token)
            await spotifyApi.getAudioFeaturesForTracks(ids)    
            .then(async(data,err)=>{
                //setSuggestedCards([]) 
               if(data){console.log("tr",ids)
                   console.log("audiofeatures",data)
                //    let arr=[]  
                   
                   await data.audio_features.forEach(track=>{
                      
                      setDanceability(danceability=>[...danceability,track.danceability])
                      setSpeechiness(speechiness=>[...speechiness,track.speechiness])
                      setValence(valence=>[...valence,track.valence])
                      setacousticness(acousticness=>[...acousticness,track.acousticness])
                      setEnergy(energy=>[...energy,track.energy])
                      setInstrumentalness(instrumentalness=>[...instrumentalness,track.instrumentalness])
                      setLoudness(loudness=>[...loudness,track.loudness])

                   })
                //    // setSuggestedCards(arr)
                //    console.log("s",suggestedCard)

               }else{
                   console.log(err)
               }

                
            })
        

        }
        getTrackFeatures()

    },[ids])

    console.log(acousticness,popularity,danceability,energy,valence,instrumentalness,loudness,names,speechiness)
    return (
        <div>
            Get stats
        </div>
    )
}

export default GetStats
