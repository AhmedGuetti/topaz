import React, {useState, useEffect}from 'react'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import Axios from "axios";
import { useNavigate } from "react-router-dom";


function Dashboard() {
  let navigate = useNavigate();
  Axios.defaults.withCredentials = true;
  const [loginStatus, setLoginStatus] = useState("");
  const [isLogged, setIsLogged] = useState();
  useEffect(()=>{
    Axios.get("http://localhost:3005/login").then((response)=>{
      console.log(response.data);
      if (response.data.loggedIn == true)
        setLoginStatus(response.data.user.rows[0].username);
        setIsLogged(response.data.loggedIn);
    })
  },[]);

  return (
    <>
    <Header isLoggedIn={isLogged}/>
    <div>Dashboard</div>
    <Footer />
    </>
  )
}

export default Dashboard