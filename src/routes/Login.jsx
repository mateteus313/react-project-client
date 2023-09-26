import React, { useState, useEffect } from "react";
import Axios from 'axios'
import { useNavigate } from "react-router-dom";


const LoginForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    Axios.post('http://localhost:3001/api/login', {
      data: [formData],
    }).then((res) => {
      alert(res.data)
    })

    //console.log(formData);
  };

  return (
    <>
      <h1>Login</h1>
    
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />

        <label>Senha:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />

        <button type="submit">Entrar</button><br /><br />
      </form>
    </>
  )
}
export default LoginForm;
