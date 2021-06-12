import React,{useState,useEffect} from 'react'
import { Doughnut } from 'react-chartjs-2';
import { doughnutData } from '../defaults/defaultLayout';
import {Grid,Segment} from 'semantic-ui-react'
import './Doughnut.css'

const Doughnuts = ({names,valence}) => {

    const[data,setData]=useState(doughnutData)

    useEffect(() => {
        if(names.length!==4 ||data.datasets[0].length >=4)return null
        const obj={
            labels:names,
            datasets:doughnutData.datasets
        }
        
      obj.datasets[0].data=valence
      
      setData(obj)
     // console.log("doughnut",names,data)
    }, [names,valence])
    return (
        <div>
          
            <Doughnut className="doughnut"data={data}/>
          
           
        </div>
    )
}

export default Doughnuts
