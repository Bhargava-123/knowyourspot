import React, { useEffect,useRef, useState } from 'react'
import './css/ArtBoard.css'
import axios from 'axios'
import { Routes,Route,Link } from 'react-router-dom'

export default function ArtBoard() {

  const [count,setCount] = useState(1)
  const [trackList,setTrackList] = useState([])

  useEffect(() =>
  {
    axios.get("http://127.0.0.1:8000/api/get-top-tracks").then(
      res => {
        //console.log(res.data.data.items)
        let list = res.data.data.items;
        //console.log(list);
        list.forEach(
          obj => {

            let track_details = {
              'track_name' : obj['name'],
              'artist_name' : obj['artists'][0]['name'],
              'track_img_url' : obj['album']['images'][1]['url'],
              'track_url' : obj['external_urls']['spotify'],
            }
            trackList.push(track_details)
            setTrackList(trackList)
            //console.log(obj['name'])
          }
        )
        // list.map((value) =>
        // {
        //     console.log(value)
        //     setTrackList([...[value['name']]])
        // })
        //console.log(trackList)
        setCount(0)
      }
    )
  },[count])
  
  return (
    <div className="art-board-container" >
      <div>
        <h1 className='art-board-title'>
          Your Top Tracks
        </h1>
      </div>
        <div className='content-container'>
              {
                trackList.map((value,key) =>
                {
                  return (
                    <Link to={value['track_url']}>
                    <div key = {key} className="image-container">
                      <img className = "image-img" src={value['track_img_url']}/>
                      <div className="image-overlay">
                          <div className = "image-title">{key+1}. {value['track_name']}</div>
                          <p className="image-description">{ value['artist_name'] }</p>
                      </div>
                    </div>
                    </Link>
                  ) 
                  
                })
              }
        </div>
    </div>
  )
}
