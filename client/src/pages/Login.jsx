import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login(){
  const { register, handleSubmit } = useForm();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error,setError] = React.useState(null);

  const onSubmit = async (data) => {
    const res = await login(data.email, data.password);
    if(res.ok) navigate("/");
    else setError(res.error || "Login failed");
  };

  return (
    <div className="form">
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="label">Email</label>
        <input className="input" {...register("email", { required: true })} />
        <label className="label">Password</label>
        <input type="password" className="input" {...register("password", { required: true })} />

        {error && <div style={{color:'red',marginTop:8}}>{error}</div>}
        <div style={{marginTop:12}}>
          <button className="btn" type="submit">Login</button>
        </div>
      </form>
    </div>
  );
}
