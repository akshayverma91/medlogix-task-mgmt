import React, { useEffect, useState } from "react";
import { fetchTasks, createTask, updateTask, fetchUsers } from "../services/taskService";
import TaskModal from "../components/TaskModal";
import TaskCard from "../components/TaskCard";

// Updated to match API response values
const STATUSES = ["Todo", "InProgress", "Done"];

export default function Dashboard(){
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState({ q:"", assignee:"" });

  useEffect(()=>{ load(); loadUsers(); }, []);

  async function load(){
    setLoading(true);
    try {
      const data = await fetchTasks();
      setTasks(data);
    } finally { setLoading(false); }
  }

  async function loadUsers(){
    const u = await fetchUsers();
    setUsers(u);
  }

  async function handleCreate(taskData){
    // optimistic update
    const temp = { ...taskData, id: Date.now(), createdAt: new Date().toISOString() };
    setTasks(prev => [temp, ...prev]);
    setShowModal(false);
    try {
      const saved = await createTask(taskData);
      // replace temp with saved
      setTasks(prev => prev.map(t => (t.id === temp.id ? saved : t)));
    } catch (err) {
      // rollback
      setTasks(prev => prev.filter(t => t.id !== temp.id));
      alert("Failed to create task");
    }
  }

  async function handleUpdate(id, updated){
    // optimistic
    const before = tasks.find(t => t.id === id);
    setTasks(prev => prev.map(t => (t.id === id ? { ...t, ...updated } : t)));
    try {
      await updateTask(id, updated);
    } catch {
      // rollback
      setTasks(prev => prev.map(t => (t.id === id ? before : t)));
      alert("Update failed");
    }
  }

  const filtered = tasks.filter(t => {
    const q = filter.q.trim().toLowerCase();
    return (!q || (t.title && t.title.toLowerCase().includes(q)) || (t.description && t.description.toLowerCase().includes(q))) &&
           (!filter.assignee || String(t.assigneeId) === String(filter.assignee));
  });

  return (
    <div>
      <div className="toolbar">
        <button className="btn" onClick={() => setShowModal(true)}>Create Task</button>
        <input className="search" placeholder="Search title/description" value={filter.q} onChange={e => setFilter({...filter, q: e.target.value})} />
        <select className="select" value={filter.assignee} onChange={e=>setFilter({...filter, assignee: e.target.value})}>
          <option value="">All assignees</option>
          {users.map(u => <option key={u.id} value={u.id}>{u.userName}</option>)}
        </select>
        <button className="small" onClick={load}>Refresh</button>
      </div>

      {loading ? <div>Loading...</div> : (
        <div className="board">
          {STATUSES.map(status => (
            <div className="column" key={status}>
              <h3>{status.replace('_',' ')}</h3>
              {filtered.filter(t=>t.status===status).map(task => (
                <TaskCard key={task.id} task={task} users={users} onUpdate={handleUpdate} />
              ))}
            </div>
          ))}
        </div>
      )}

      {showModal && <TaskModal users={users} onClose={()=>setShowModal(false)} onCreate={handleCreate} />}
    </div>
  );
}
