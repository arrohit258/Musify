import React,{useState,useEffect} from 'react'

import {Bar} from 'react-chartjs-2'
import { barData } from '../defaults/defaultLayout'

const Bars = ({popularity,danceability,names}) => {
  const[data,setData]=useState(barData)
    
    useEffect(() => {
        if(names.length!==4 && data.length > 4)return null
        const obj={
            labels:names,
            datasets:barData.datasets
        }
      
      obj.datasets[0].data=popularity
      obj.datasets[1].data=danceability
      setData(obj)
     // console.log("bar",names,popularity,danceability)
    }, [names,popularity,danceability])
    return (
        <div>
            <Bar
            data={data}
            options={{
                indexAxis:'y',
                scales: {
                    xAxes: [{
                        ticks: {
                            beginAtZero: true,
                        },
                        gridLines: {
                            display: false,
                            lineWidth: 3,
                            color: '#fff',
                            zeroLineWidth: 3,
                            zeroLineColor: '#fff'
                        }
                    }],
                    yAxes: [{
                        gridLines: {
                            display: false,
                            color: '#fff',
                            lineWidth: 3,
                            zeroLineWidth: 3,
                            zeroLineColor: '#fff'
                        }
                    }]
                }
            }}
            />
        </div>
    )
}

export default Bars
