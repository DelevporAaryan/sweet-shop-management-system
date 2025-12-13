import React, { useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';
export default function Register(){ const [email,setEmail]=useState(''); const [pw,setPw]=useState(''); const nav=useNavigate();
  const reg=async(e:any)=>{ e.preventDefault(); try{ await API.post('/auth/register',{ email, password: pw }); alert('Registered. Please login.'); nav('/login'); }catch(err:any){ alert(err?.response?.data?.error || 'Registration failed'); } };
  return (<div className="card"><h2>Register</h2><form onSubmit={reg}><input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email"/><input value={pw} onChange={e=>setPw(e.target.value)} placeholder="Password" type="password"/><button type="submit">Register</button></form></div>);
}
