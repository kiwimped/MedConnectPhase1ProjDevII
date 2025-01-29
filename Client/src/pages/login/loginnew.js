import './login.scss';

import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
export default function LoginNEW() {
    const navigate = useNavigate()
    const [data, setData] = useState({
        email: '',
        password: ''
    })
    const loginUser = async (e) => {
        e.preventDefault()
        const { email, password } = data
        try {
            const { data } = await axios.post('/login', {
                email, password
            });
            if (data.error) {
                toast.error(data.error)
            } else {
                if (data.token) {
                    localStorage.setItem('authToken', data.token); // Add the token to localStorage

                }
                setData({});
                navigate('/')

            }
            window.location.reload();
        } catch (error) {
            console.log(error)
        }

    }
    return (
        <div className='login'>
            <div className='card'>
                <div className='left'>
                    <h1>Hello</h1>
                    <span>
                        Don't have an account?
                    </span>
                    <button onClick={() => navigate("/registerNEW")}>Register here</button>


                    <span>
                        Forgot Passord? {" "}
                    </span>
                    <button onClick={() => navigate("/login/ForgotPassword")}>Forgot Password</button>
                </div>
                <div className='right'>
                    <h1>LOGIN</h1>
                    <form onSubmit={loginUser}>
                        <label>Email</label>
                        <input type="email" placeholder="enter email" value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })}></input>
                        <label>Password</label>
                        <input type="password" placeholder="enter password" value={data.password} onChange={(e) => setData({ ...data, password: e.target.value })}></input>
                        <button type='submit'>Login</button>
                    </form>
                </div>


            </div>
        </div>
    )
}