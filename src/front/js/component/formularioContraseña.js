import React, { useState, useContext, useEffect } from "react";
import { Dropdown } from 'react-bootstrap';
import { Context } from "../store/appContext";
import "../../styles/formularioPassword.css";
import { useNavigate } from "react-router-dom";

export const FormularioPassword =() =>{
    const { store, actions } = useContext(Context);
    const [dataForm2, setDataForm2] = useState({
        email: '',
        password: '',
    })
    
    const handleChange2 = (e) => {
        const { name, value} = e.target;
        setDataForm2({ ...dataForm2, [name]: value });
      }

    const handleSubmit2 = async (e) => {
        e.preventDefault()
        console.log(dataForm2)
    }

<form className="formularioPassword" onSubmit={handleSubmit2}>
        <label>Email
          <input className="form-control" name="title" value={dataForm2.email} placeholder="Escribe un nuevo email para cambiarlo" onChange={handleChange2} type="text"></input>
        </label>
        <label>Password
          <input className="form-control" name="title" value={dataForm2.password} placeholder="Escribe una nueva contraseña para cambiarla" onChange={handleChange2} type="text"></input>
        </label>
        <input className="btnFormularioPassword btn-primary" value="Cambiar contraseña" type="submit" />
      </form>
}