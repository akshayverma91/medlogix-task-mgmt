import React, { useState } from "react";

export default function TaskCard({ task, users, onUpdate }){
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    title: task.title || "",
    description: task.description || "",
    status: task.status || "Todo",
    assigneeId: task.assigneeId || ""
  });

  function save(){
    setEditing(false);
    onUpdate(task.id, form);
  }

  return (
    <div className="card">
      {editing ? (
        <>
          <input className="inline-input" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} />
          <textarea className="inline-input" style={{marginTop:6}} value={form.description} onChange={e=>setForm({...form,description:e.target.value})} />
          <select className="select" value={form.status} onChange={e=>setForm({...form,status:e.target.value})}>
            <option value="Todo">Todo</option>
            <option value="InProgress">In Progress</option>
            <option value="Done">Done</option>
          </select>
          <select className="select" value={form.assigneeId || ""} onChange={e=>setForm({...form,assigneeId:e.target.value})}>
            <option value="">Unassigned</option>
            {users.map(u=> <option key={u.id} value={u.id}>{u.userName}</option>)}
          </select>

          <div style={{marginTop:8}}>
            <button className="btn" onClick={save}>Save</button>
            <button className="small" onClick={()=>setEditing(false)} style={{marginLeft:8}}>Cancel</button>
          </div>
        </>
      ) : (
        <>
          <strong>{task.title}</strong>
          <div style={{marginTop:6}}>{task.description}</div>
          <div className="meta">Assignee: {task.assignee?.userName || task.assigneeId || "—"}</div>
          <div className="meta">Created: {new Date(task.createdAt).toLocaleString()}</div>
          <div style={{marginTop:8}}>
            <button className="small" onClick={()=>setEditing(true)}>Edit</button>
            <button className="small" style={{marginLeft:8}}
              onClick={() => onUpdate(task.id, { status: task.status === "Todo" ? "InProgress" : task.status === "InProgress" ? "Done" : "Done" })}>
              Move
            </button>
          </div>
        </>
      )}
    </div>
  );
}
