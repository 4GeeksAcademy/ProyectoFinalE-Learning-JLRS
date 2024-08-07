import React, { useContext } from "react";
import { Context } from "../store/appContext";
//PENDIENTE CAMBIAR FUNCIONES Y CONECTAR CON API
export const signUp = () =>{
    const { store, actions } = useContext(Context);
    const [dataForm,setDataForm]=useState({
        email: '',
        password: '',
        confirmPassword: ''
    })

    const handleChange = (e) =>{
        const{name,value}=e.target
        setDataForm({...dataForm, [name]: value})
    }

    const handleSubmit = (e) =>{ 
        e.preventDefault() //evita que se recargue la página
        actions.createContact(dataForm)
        setDataForm({
            email: '',
            password: '',
            confirmPassword: ''
        }) 
        console.log(dataForm)
    }

	return(
        <div>
            <form className="container d-flex flex-column align-items-center mt-5 p-5" id="formularioRegistro">
				<label>Email
                    <input className="form-control" name="email" value={dataForm.email} placeholder="" onChange={handleChange} type="text"></input>
                </label>
			    <label>Password
                    <input className="form-control" name="phone" value={dataForm.password} placeholder="" onChange={handleChange} type="text"></input>
                </label>
				<input className="btn btn-primary" value="Iniciar sesión" type="submit"/>
			</form>
        </div>
    )
};
};
