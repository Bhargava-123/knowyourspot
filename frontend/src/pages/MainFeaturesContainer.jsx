import React from 'react'
import './css/MainFeaturesContainer.css'
import Login from './Login'
import { Routes,Route,Link } from 'react-router-dom'

export default function () {
  return (
    <>
        <div className="ElementsContainer">
            <div className="CollageMakerContainer">
                <div className='title'>
                    <h4>Art Board</h4>
                </div>
                <div className="image1">
                    <Link to="/home/artboard/">
                    <div className="image1">
                    </div>
                    </Link>
                </div>
                <div className='desc'>
                    <p>All your all time top tracks as a Album Art Board</p>
                </div>
            </div>
            <div className="GetAnalyticsContainer">
                <div className='title'>
                    <h4>Get Statistics</h4>
                </div>
                <Link to="/home/statistics/">
                <div className="image2">
                </div>
                </Link>
                <div className='desc'>
                    <p>Get Deeper insights of your listening history and find your hidden listening habits.</p>
                </div>
          </div>
         {/*<div className="ListenHereContainer">
            <div className='title'>
               <h4>Listen (Visually)</h4>
           </div>
           <div className="image3">
           </div>
               <div className='desc'>
                   <p>Listen your songs with an aesthetic UI and also get similar songs recommendations.</p>
              </div>
            </div> */} 
        </div>
    </>
  )
}
