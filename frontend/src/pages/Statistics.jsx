import React, { Suspense } from 'react'
import { useEffect,useState } from 'react'
import { PolarAreaChart } from './PolarAreaChart'
import axois from 'axios'
import './css/Statistics.css'
export default function Statistics() {


    const [audioFeatures,setAudioFeatures]  = useState({});
    const [chartData,setChartData] = useState({});
    const [count,setCount] = useState(0)
    useEffect(() =>
    {
        axois.get("http://127.0.0.1:8000/api/get-audio-features").then(
            res => {
                //console.log(res.data.response_data)
                setAudioFeatures(res.data.response_data)
            }
        )
    },[count])

  return (
    <div className='statistics-container'>
        <header>
            <h1 className='statistics-title'>Your Statistics</h1>
        </header>
        <div className='polar-area-and-labels-container'>
            <div className='polar-area-container'>
                <PolarAreaChart data = {audioFeatures} className="polar-area-chart"/>
            </div>
            <div className="labels-container">
            </div>
        </div>
        
        

    </div>
  )
}
