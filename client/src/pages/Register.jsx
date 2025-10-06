import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register(){
  const { register, handleSubmit } = useForm();
  const { register: doRegister } = useAuth();
  const [error,setError] = React.useState(null);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    if (data.password !== data.confirm) { setError("Passwords do not match"); return; }
    const res = await doRegister(data.username, data.email, data.password);
    if (res.ok) navigate("/");
    else setError(res.error || "Register failed");
  };

  return (
    <div className="form">
      <h2>Register</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="label">Username</label>
        <input className="input" {...register("username", { required: true })} />
        <label className="label">Email</label>
        <input className="input" {...register("email", { required: true })} />
        <label className="label">Password</label>
        <input type="password" className="input" {...register("password", { required: true })} />
        <label className="label">Confirm Password</label>
        <input type="password" className="input" {...register("confirm", { required: true })} />

        {error && <div style={{color:'red',marginTop:8}}>{error}</div>}
        <div style={{marginTop:12}}>
          <button className="btn" type="submit">Register</button>
        </div>
      </form>
    </div>
  );
}
