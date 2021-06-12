import React, { useState,useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { lineData } from '../defaults/defaultLayout';

const Lines = ({names,tempo,energy}) => {

    const[data,setData]=useState(lineData)
    useEffect(() => {
        if(names.length!==4 && data.length > 4)return null
        const obj={
            labels:names,
            datasets:lineData.datasets
        }
      
      obj.datasets[0].data=tempo
      obj.datasets[1].data=energy
      setData(obj)
      //console.log("bar",names,tempo,energy)
    }, [names,tempo,energy])
    return (
        <div>
            <Line 
            data={data}
            />
            
        </div>
    )
}

export default Lines
