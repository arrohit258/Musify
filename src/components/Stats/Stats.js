import React,{useEffect,useState} from 'react'
import {useLocation} from 'react-router-dom'

import './Stats.css'
import axios from 'axios'
import SpotifyWebApi from 'spotify-web-api-js'
import {client_id} from '../../AuthParams/authKey'
import {client_secret} from '../../AuthParams/authSecret'
import queryString from 'query-string'
import CardWrapper from '../CardWrapper/CardWrapper'
import{ Button,Icon }from 'semantic-ui-react'


export const Stats = () => {
  





    return (
        <div>
            <div className="neon6">Neon </div>
            <CardWrapper/>
         
           
        </div>
    )
}
