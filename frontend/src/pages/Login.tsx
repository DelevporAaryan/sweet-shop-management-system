import React, { useState } from 'react';
import API, { setToken } from '../api';
import { useNavigate } from 'react-router-dom';
export default function Login(){ const [email,setEmail]=useState(''); const [pw,setPw]=useState(''); const nav=useNavigate();
  const login=async(e:any)=>{ e.preventDefault(); try{ const res=await API.post('/auth/login',{email,password:pw}); const { token } = res.data; localStorage.setItem('token', token); setToken(token); nav('/'); }catch(err:any){ alert(err?.response?.data?.error || 'Login failed'); } };
  return (<div className="card"><h2>Login</h2><form onSubmit={login}><input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email"/><input value={pw} onChange={e=>setPw(e.target.value)} placeholder="Password" type="password"/><button type="submit">Login</button></form></div>);
}
