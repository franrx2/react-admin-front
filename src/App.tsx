import React, { useEffect, useState } from 'react'
import axios from 'axios'

type Item = { id?: number; name: string; description?: string; price?: number }

export default function App(){
  const [items, setItems] = useState<Item[]>([])
  const [form, setForm] = useState<Item>({ name: '', description: '', price: 0 })

  async function load(){
    const res = await axios.get('/api/items')
    setItems(res.data.content || [])
  }
  useEffect(()=>{ load() }, [])

  async function create(e: React.FormEvent){
    e.preventDefault()
    await axios.post('/api/items', form)
    setForm({ name:'', description:'', price:0 })
    load()
  }

  return (
    <div style={{ maxWidth: 800, margin: '40px auto', fontFamily: 'system-ui' }}>
      <h1>Admin: Items</h1>
      <form onSubmit={create} style={{ display:'grid', gap:12, gridTemplateColumns:'1fr 1fr 1fr auto', alignItems:'end' }}>
        <input placeholder='Nombre' value={form.name} onChange={e=>setForm({...form, name:e.target.value})}/>
        <input placeholder='Descripción' value={form.description||''} onChange={e=>setForm({...form, description:e.target.value})}/>
        <input placeholder='Precio' type='number' value={form.price||0} onChange={e=>setForm({...form, price: parseFloat(e.target.value)})}/>
        <button>Añadir</button>
      </form>
      <table style={{ width:'100%', marginTop:20, borderCollapse:'collapse' }}>
        <thead><tr><th>ID</th><th>Nombre</th><th>Descripción</th><th>Precio</th></tr></thead>
        <tbody>
          {items.map(i => (
            <tr key={i.id}>
              <td>{i.id}</td>
              <td>{i.name}</td>
              <td>{i.description}</td>
              <td>{i.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p style={{marginTop:30}}>Configura un proxy de desarrollo para <code>/api</code> hacia tu backend.</p>
    </div>
  )
}
