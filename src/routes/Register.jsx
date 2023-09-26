import React, { useState, useEffect } from "react";
import InputMask from 'react-input-mask';
import Axios from 'axios'
import { useNavigate } from "react-router-dom";

const RegistrationForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    birthDate: [],
    phone: [],
    address: "",
    zipCode: [],
    password: ""
  });

  /* Formata numeros
  const handleNumbers = (e) => {
    let timed = e.target.value.replace(/[^0-9]/g, '')
    setFormData({
      ...formData,
      [e.target.name]: timed
    });
  }
  */

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let status = false;

    // Previne que existam campos nulos
    Object.keys(formData).forEach(key => {
      if (formData[key] === '' || formData[key].length === 0) {
        alert(`Campo em falta: ${key}`)
        status = false
        return
      } else {
        status = true
      }
    })

    if (status) {
      // Primeiro checar se ja existe usuario com mesmo email no banco
      Axios.post('http://localhost:3001/api/get', {
        data: formData['email'],
      }).then((res) => {
        if (res.data === 'Liberado') {
          // Se retornar 'liberado', pode ser cadastrado
          Axios.post('http://localhost:3001/api/insert', {
            data: [formData],
          }).then((res) => {
            alert(res.data)
            navigate("/login");
          })
        } else {
          alert(res.data)
          navigate("/login");
        }
      })
    }

    //console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Nome:</label>
      <input
        type="text"
        name="username"
        value={formData.username}
        onChange={handleChange}
      />

      <br></br>

      <label>Email:</label>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
      />

      <label>Data nascimento:</label>
      <InputMask
        mask="99/99/9999"
        name="birthDate"
        value={formData.birthDate}
        onChange={handleChange}
      />

      <br></br>

      <label>Telefone:</label>
      <InputMask
        mask="(99)99999-9999"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
      />

      <br></br>

      <label>Endereço:</label>
      <input
        type="address"
        name="address"
        value={formData.address}
        onChange={handleChange}
      />

      <label>CEP:</label>
      <InputMask
        type="zipcode"
        mask="99999-999"
        name="zipCode"
        value={formData.zipCode}
        onChange={handleChange}
      />

      <br></br>

      <label>Senha:</label>
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
      />

      <button type="submit">Registrar</button>
    </form>
  );
};

export default RegistrationForm;