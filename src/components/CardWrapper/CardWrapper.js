import React,{useEffect,useLayoutEffect,useState} from 'react'
import {useLocation,useHistory} from 'react-router-dom'
import axios from 'axios'
import SpotifyWebApi from 'spotify-web-api-js'
import {client_id} from '../../AuthParams/authKey'
import {client_secret} from '../../AuthParams/authSecret'
import queryString from 'query-string'
import { ImageGroup,Grid } from 'semantic-ui-react'
import Cards  from '../Cards/Cards'
import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react'
import { Card, Icon,  Button,Container } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import './CardWrapper.css'

const ENDPOINT='http://localhost:3000/'

const CardWrapper = () => {
    let location=useLocation() 
 
    const {access_token,refresh_token}=queryString.parse(location.search)
    //console.log('a',access_token)
   // console.log('r',refresh_token)
    const [cardInfo,setCardInfo]=useState([])
   //let cardInfo=[]

    let spotifyApi=new SpotifyWebApi()
    

  
    useLayoutEffect(()=>{
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
                        const obj={
                            name:item.name,
                            url:item.album.external_urls.spotify,
                            image:item.album.images[1].url
                        }
                    
                         setCardInfo(cardInfo=>cardInfo.concat(obj))
                       
                     

                    });
                   
                }else{
                    console.log(err)
                }
            })

        }

    // console.log(cardInfo)

         getMyTopTracks()
         return null

        
    }, [access_token])
   // console.log(cardInfo)
   
    let suggestionUrl=`${ENDPOINT}suggestions?access_token=${access_token}&refresh_token=${refresh_token}`
    let statUrl=`${ENDPOINT}getStats?access_token=${access_token}&refresh_token=${refresh_token}`
   
    const renderCards=(card,index)=>{
        //console.log("1",card)
        return(<Grid padded xs={12} sm={6} lg={3}>
           <Cards image={card.image} url={card.url} name={card.name} />
           </Grid>
        )
    }

//console.log(cardInfo)

return ( <div>
     
        <Grid className="cardwrapper" textAlign="center" padded ="true">{cardInfo.map(renderCards)}</Grid>
    <a href={statUrl}>
        <Button color='green'>
      <Icon name='spotify' /> Get Stats
    </Button>
    </a>
    <a href={suggestionUrl}>
    <Button color='green'>
      <Icon name='spotify'/> Get 50 Best Songs for You
    </Button>
    </a>
        </div>
        //<Cards image={cardInfo[0].image} url={cardInfo[0].url} name={cardInfo[0].name} />
        //<div>HI</div>
        
    )
}

export default CardWrapper
