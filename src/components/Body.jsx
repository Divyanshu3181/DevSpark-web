import React, { useEffect } from 'react'
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { Outlet, useNavigate } from 'react-router-dom'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from "../utils/userSlice"
import axios from 'axios'

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user)
  const fetchUser = async () => {
    if(userData) return;
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(res.data));

    } catch (error) {
      if (error.status === 401) {
        navigate("/login");
      }
      console.log(error)
    }
  }

  useEffect(() => {
    if(!userData){ 
      fetchUser();
    }
   
  }, [])
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  )
}

export default Body