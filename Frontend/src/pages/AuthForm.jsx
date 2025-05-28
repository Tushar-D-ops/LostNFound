// src/components/AuthForm.jsx
import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import '../AuthForm.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const AuthForm = ({token, setToken}) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUserName] = useState('');
  const formRef = useRef();
  const api=process.env.REACT_APP_API;

  useEffect(() => {
    gsap.fromTo(
      formRef.current,
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }
    );
  }, [isLogin]);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const handleSubmit =async (e) => {
    try {
        if(isLogin){
       e.preventDefault()
       const response = await axios.post(api+ '/api/user/signin', {email,password})
        if(response.data.success){
          setToken(response.data.token)
          toast.success(response.data.message)
        }else{
          toast.error(response.data.message)
        }
    }
    else{
      e.preventDefault()
      const response = await axios.post(api+ '/api/user/signup', {username,email,password})
        if(response.data.success){
          setToken(response.data.token)
          toast.success(response.data.message)
        }else{
          toast.error(response.data.message)
        }
    }

    } catch (error) {
      if(error.response?.data?.message){
        toast.error(error.response.data.message)
      }
      else{
        toast.error("Something went wrong")
      }
      console.log(error)
      
    }
    
  }

  return (
    <div className="auth-main-container">
        <div className="pink-gradient"></div>
        <div className="blue-gradient"></div>
        <div className="white-gradient"></div>
    <div className="auth-container" ref={formRef}>
        
      <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <input type="text" placeholder="Full Name" onChange={(e) => setUserName(e.target.value)} value={username} required />
        )}
        <input type="email" placeholder="Email" onChange={(e)=>setEmail(e.target.value)} value={email} required />
        <input type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} value={password} required />
        <button type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
      </form>
      <div className="toggle-link" onClick={toggleForm}>
        {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Login'}
      </div>
    </div>
    </div>
  );
};

export default AuthForm;
