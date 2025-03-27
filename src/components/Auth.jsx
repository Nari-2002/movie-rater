import React, { useState,useContext,useEffect } from "react";
import API from "../services/api-service";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const Auth = () => {
    const [username,setUserName]=useState('');
    const [password,setPassword]=useState('');
    const [token,setToken]=useCookies("mr-token");
    const navigate=useNavigate();
    useEffect(()=>{
        console.log(token["mr-token"])
        if(token["mr-token"]){
            navigate('/movies')
        }
    },[token])
    const loginUser=()=>{
        const getToken=async()=>{
            const resp=await API.loginUser({username,password})
            if(resp) setToken("mr-token",resp.token)
        }
        getToken()
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg w-80">
                <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>
               
               
                    <div className="mb-3">
                        <label className="block text-sm font-medium text-gray-600">Username</label>
                        <input
                            type="text"
                            name="username"
                            value={username}
                            onChange={(evt)=>setUserName(evt.target.value)}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                        />
                    </div>
                    <div className="mb-3">
                        <label className="block text-sm font-medium text-gray-600">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={(evt)=>setPassword(evt.target.value)}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                        />
                    </div>
                    <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition" onClick={(evt)=>{loginUser()}}> Login</button>
                
            </div> 
        </div>
    );
};

export default Auth;
