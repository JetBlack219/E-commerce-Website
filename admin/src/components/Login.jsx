import axios from 'axios'
import React, { useState } from 'react'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

const Login = ({setToken}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const onSubmitHandler = async(e) =>{
        try {
            e.preventDefault();
            const response = await axios.post(backendUrl + '/api/user/admin', {email, password})
            if(response.data.success){
                setToken(response.data.token)
            }else{
                toast.error(response.data.message)
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 px-4">
    <div className="bg-white shadow-xl rounded-xl px-10 py-8 w-full max-w-md transition-all duration-300 ease-in-out">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Admin Panel</h1>
        
        <form onSubmit={onSubmitHandler}>
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="email">Email Address</label>
                <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                id="email"
                className="rounded-md w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-all duration-200"
                type="email"
                placeholder="your@email.com"
                required
                />
            </div>

            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="password">Password</label>
                <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                id="password"
                className="rounded-md w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-all duration-200"
                type="password"
                placeholder="Enter your password"
                required
                />
            </div>

            <button type="submit" className="mt-2 w-full py-2 px-4 rounded-md text-white bg-black hover:bg-gray-800 transition duration-200">Login</button>
        </form>
    </div>
    </div>

  )
}

export default Login