import React from "react";
import { useForm } from "react-hook-form";

export default function TaskModal({ onClose, onCreate, users }){
  const { register, handleSubmit } = useForm({
    defaultValues: { title:"", description:"", status:"Todo", priority:"Medium", assigneeId: "" }
  });

  const submit = (data) => {
    // convert assigneeId to null if empty
    const payload = { ...data, assigneeId: data.assigneeId || null };
    onCreate(payload);
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h3>Create Task</h3>
        <form onSubmit={handleSubmit(submit)}>
          <label className="label">Title</label>
          <input className="input" {...register("title", { required: true })} />

          <label className="label">Description</label>
          <textarea className="input" {...register("description")} />

          <label className="label">Status</label>
          <select className="select" {...register("status")}>
            <option value="Todo">Todo</option>
            <option value="InProgress">In Progress</option>
            <option value="Done">Done</option>
          </select>

          <label className="label">Priority</label>
          <select className="select" {...register("priority")}>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>

          <label className="label">Assignee</label>
          <select className="select" {...register("assigneeId")}>
            <option value="">Unassigned</option>
            {users.map(u => <option key={u.id} value={u.id}>{u.userName}</option>)}
          </select>

          <div style={{marginTop:12}}>
            <button className="btn" type="submit">Create</button>
            <button className="small" type="button" onClick={onClose} style={{marginLeft:8}}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}
