import React, { useEffect, useState } from 'react';
import API, { setToken } from '../api';
type Sweet = { id:string; name:string; category:string; price:number; quantity:number };
export default function Dashboard(){ const [sweets,setSweets]=useState<Sweet[]>([]); const [q,setQ]=useState('');
  useEffect(()=>{ const t=localStorage.getItem('token'); if(t) setToken(t); fetchAll(); },[]);
  async function fetchAll(){ const res = await API.get('/sweets'); setSweets(res.data); }
  async function purchase(id:string){ try{ await API.post(`/sweets/${id}/purchase`, { qty:1 }); fetchAll(); }catch(err:any){ alert(err?.response?.data?.error||'Purchase failed'); } }
  async function search(){ const res = await API.get('/sweets/search', { params: { name: q } }); setSweets(res.data); }
  return (<div><div className="toolbar"><input placeholder="Search by name" value={q} onChange={e=>setQ(e.target.value)}/><button onClick={search}>Search</button><button onClick={fetchAll}>Reset</button></div><div className="grid">{sweets.map(s=> (<div key={s._id||s.id} className="card"><h3>{s.name}</h3><p>{s.category}</p><p>₹{s.price.toFixed(2)}</p><p>Stock: {s.quantity}</p><button disabled={s.quantity===0} onClick={()=>purchase(s._id||s.id)}>{s.quantity===0?'Sold out':'Purchase'}</button></div>))}</div></div>); }
