import React from 'react'
import  About  from './About'
import { Routes,Route,Link } from 'react-router-dom'
import Navbar from './Navbar'
import Login from './Login'
import './css/Home.css'
import MainFeaturesContainer from './MainFeaturesContainer'
import axios from 'axios'
import { useEffect,useState } from 'react'


export default function Home() {
  const [is_authenticated,setIs_Authenticated] = useState("");

  const [userName,setUserName] = useState("")

  useEffect(() =>
  {
    axios.get("http://127.0.0.1:8000/api/get-user-authenticated/").then(
      res => {
        setIs_Authenticated(res.data['Authenticated'])
        console.log(res.data['Authenticated'])
      })
  },[is_authenticated])

  const logOut = () =>
  {
    axios.get("http://127.0.0.1:8000/api/logout").then(
      res => console.log(res.data)
    )
    window.location.replace("http://localhost:5173/home");
  }

  const authenticateUser = () =>
  {
      let url = "http://127.0.0.1:8000/api/get-auth-url";
      const res = axios.get(url).then(
        res =>  window.location.replace(res.data['auth_url'])
      )
  }

  return (
    <div className='home-container'>
        <div className='home-container-container'>
            <Navbar className="NavbarElement"/>
            <div className = 'notNavbar'>
            <MainFeaturesContainer className="MainFeaturesContainerElement"/>
            <div className='LogInOutButton-container'>
                <button className='LogInOutButton' onClick={
                  is_authenticated == "True" ? logOut : authenticateUser
                  }>
                  { is_authenticated == "True" ? "Logout" : "Login"
                  }  
                  </button>
            </div>
            </div>
        </div>
    </div>
   
  )
}
