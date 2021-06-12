import React,{useEffect,useLayoutEffect,useState} from 'react'
import {useLocation,useHistory} from 'react-router-dom'
import queryString from 'query-string'
import Cards  from '../Cards/Cards'
import SpotifyWebApi from 'spotify-web-api-js'
import Doughnuts from '../Graphs/Doughnut'
//import '../Graphs/Doughnut.css'
import Lines from '../Graphs/Line'
import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react'
import { Grid,Card, Icon,  Button,Container } from 'semantic-ui-react'
import axios from 'axios'
import Bars from '../Graphs/Bars'
import VerticalBar from '../Graphs/VerticalBar'
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
    const[tempo,setTempo]=useState([])
  
    useEffect(()=>{
        if(ids.length >=4)return null
        if(!access_token)return null
        async function getMyTopTracks(){
          //  console.log("hi")

            await spotifyApi.setAccessToken(access_token)
            await spotifyApi.getMyTopTracks({limit:4,time_range:'long_term'})
            .then(async(data,err)=>{
                if(data){
                    // console.log(data)
                    // console.log(data.items[0].album.images[1].url)
                    await data.items.forEach(item => {
                    //     console.log(item)
                    //    console.log(item.id)
                    
                         setIds(ids=>[...ids,item.id])
                         setNames(names=>[...names,item.name])
                         setPopularity(popularity=>[...popularity,item.popularity])
                     

                    });
                  
                }else{
                    console.log(err)
                }
            })

        }

     //console.log("arr",ids)

     getMyTopTracks()
        

        
    },[])
//console.log(ids) 
    useEffect(()=>{
        if(ids.length!==4 || danceability.length>=4 || valence.length>=4 || tempo.length>=4 || energy.length>=4)return null
        async function getTrackFeatures(){
           // await spotifyApi.setAccessToken(access_token)
            await spotifyApi.getAudioFeaturesForTracks(ids)    
            .then(async(data,err)=>{
                //setSuggestedCards([]) 
               if(data){//console.log("tr",ids)
                  // console.log("audiofeatures",data)
                //    let arr=[]  
                   
                   await data.audio_features.forEach(track=>{
                      
                      setDanceability(danceability=>[...danceability,track.danceability*100])
                      setSpeechiness(speechiness=>[...speechiness,track.speechiness*1000])
                      setValence(valence=>[...valence,track.valence])
                      setacousticness(acousticness=>[...acousticness,track.acousticness*1000])
                      setEnergy(energy=>[...energy,track.energy*170])
                      setInstrumentalness(instrumentalness=>[...instrumentalness,track.instrumentalness])
                      setLoudness(loudness=>[...loudness,track.loudness])
                      setTempo(tempo=>[...tempo,track.tempo])

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

    //console.log(acousticness,popularity,danceability,energy,valence,instrumentalness,loudness,names,speechiness)
    return (
        <div>
            <Grid stackable columns={2} rows={2} >
                <Grid.Row className="Doughnut">
                <Grid.Column xs={6} sm={6} lg={12} padded>
            <Bars names={names} popularity={popularity} danceability={danceability} />
            </Grid.Column>
            <Grid.Column xs={6} sm={6} lg={12} padded>
            <Doughnuts names={names} valence={valence} />
            </Grid.Column>
            </Grid.Row>
            <Grid.Row>
            <Grid.Column xs={6} sm={6} lg={12} padded>
            <Lines names={names} tempo={tempo} energy={energy} />
            </Grid.Column>
            <Grid.Column xs={6} sm={6} lg={12} padded>
            <VerticalBar names={names} acousticness={acousticness} speechiness={speechiness} />
            </Grid.Column>
            </Grid.Row>
            </Grid>
        </div>
    )
}

export default GetStats
