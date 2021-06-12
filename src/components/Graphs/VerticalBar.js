import React, { useState,useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { vBarData } from '../defaults/defaultLayout';
const VerticalBar = ({speechiness,acousticness,names}) => {
    const[data,setData]=useState(vBarData)
    useEffect(() => {
        if(names.length!==4 && data.length > 4)return null
        const obj={
            labels:names,
            datasets:vBarData.datasets
        }
      
      obj.datasets[0].data=speechiness
      obj.datasets[1].data=acousticness
      setData(obj)
      //console.log("bar",names,speechiness,acousticness)
    }, [names,speechiness,acousticness])
    return (
        <div>
            <Bar data={data}/>
            
        </div>
    )
}

export default VerticalBar
