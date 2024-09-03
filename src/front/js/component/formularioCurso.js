import React, { useState,useContext } from "react";
import { Context } from "../store/appContext";

export const FormularioCurso = () =>{
    const { store, actions } = useContext(Context);
    const [dataForm,setDataForm]=useState({
        title: '',
        portada: '',
        resumen: '',
        categoria: '',
        nivel: '',
        idioma: '',
        modulos: ''
    })

    const handleChange = (e) =>{
        const{name,value}=e.target
        setDataForm({...dataForm, [name]: value})
    }

    const handleSubmit = (e) =>{ 
        e.preventDefault() //evita que se recargue la página
        actions.createContact(dataForm)
        setDataForm({
            title: '',
            portada: '',
            resumen: '',
            categoria: '',
            nivel: '',
            idioma: '',
            modulos: ''
        }) 
        console.log(dataForm)
    }

    return(<div>
            <form className="w-50 mx-auto" onSubmit={handleSubmit}>
			    <label>Title
                    <input className="form-control" name="title" value={dataForm.title} placeholder="Full Name" onChange={handleChange} type="text"></input>
                </label>
                <label>Portada
                    <input className="form-control" name="portada" value={dataForm.portada} placeholder="Email" onChange={handleChange} type="text"></input>
                </label>
			    <label>Resumen
                    <input className="form-control" name="resumen" value={dataForm.resumen} placeholder="Phone" onChange={handleChange} type="text"></input>
                </label>
                <label>Categoría
                    <input className="form-control" name="categoria" value={dataForm.categoria} placeholder="Address" onChange={handleChange} type="text"></input>
                </label>
                <label>Nivel
                    <input className="form-control" name="nivel" value={dataForm.nivel} placeholder="Address" onChange={handleChange} type="text"></input>
                </label>
                <label>Idioma
                    <input className="form-control" name="idioma" value={dataForm.idioma} placeholder="Address" onChange={handleChange} type="text"></input>
                </label>
                <label>Módulos
                    <input className="form-control" name="modulos" value={dataForm.modulos} placeholder="Address" onChange={handleChange} type="text"></input>
                </label>
                <input className="btn btn-primary" value="enviar" type="submit"/>
            </form>
        </div>
    );
};