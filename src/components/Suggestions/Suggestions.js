import React,{useEffect,useLayoutEffect,useState} from 'react'
import {useLocation,useHistory} from 'react-router-dom'
import queryString from 'query-string'
import Cards  from '../Cards/Cards'
import SpotifyWebApi from 'spotify-web-api-js'

import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react'
import { Grid,Card, Icon,  Button,Container } from 'semantic-ui-react'
import axios from 'axios'
const ENDPOINT='http://localhost:3000/'

const Suggestions = () => {
    let location=useLocation() 
 
    const {access_token,refresh_token}=queryString.parse(location.search)
    
    let spotifyApi=new SpotifyWebApi()
    const[ids,setIds]=useState([])
    const[suggestedCard,setSuggestedCards]=useState([])

    useLayoutEffect(()=>{
        if(!access_token)return null
        async function getMyTopTracks(){
        //    console.log("hi")

            await spotifyApi.setAccessToken(access_token)
            await spotifyApi.getMyTopTracks({limit:4,time_range:'long_term'})
            .then(async(data,err)=>{
                if(data){
                    // console.log(data)
                    // console.log(data.items[0].album.images[1].url)
                    await data.items.forEach(item => {
                     //  console.log(item.id)
                    
                         setIds(ids=>[...ids,item.id])
                     

                    });
                  
                }else{
                    console.log(err)
                }
            })

        }

    // console.log("arr",ids)

     getMyTopTracks()
        

        
    }, [access_token])

    useEffect(()=>{
        if(ids.length!==4 || suggestedCard.length>=4)return null
        async function getRecommendations(){
           // await spotifyApi.setAccessToken(access_token)
            await spotifyApi.getRecommendations({limit:50,seed_tracks:ids})
            .then(async(data,err)=>{
                setSuggestedCards([]) 
               if(data){
                 //  console.log(data)
                   let arr=[]  
                   
                   await data.tracks.forEach(track=>{
                       const obj={name:track.name,url:track.external_urls.spotify,image:track.album.images[1].url}
                       setSuggestedCards((suggestedCard)=>suggestedCard.concat(obj))

                   })
                   // setSuggestedCards(arr)
                  // console.log("s",suggestedCard)

               }else{
                   console.log(err)
               }

                
            })
        

        }
        getRecommendations()

    },[ids])
//console.log(suggestedCard)

const renderCards=(card,index)=>{
   // console.log("1",card)
    return(<Grid padded xs={12} sm={6} lg={3}>
       <Cards image={card.image} url={card.url} name={card.name} />
       </Grid>
    )
}

    return (
        <div>
              <Grid className="cardwrapper" textAlign="center" padded ="true">{suggestedCard.map(renderCards)}</Grid>
            
        </div>
    )
}

export default Suggestions
