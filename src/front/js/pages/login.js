import React, { useState, useContext, useRef, useEffect } from "react";
import { Context } from "../store/appContext"; // Importa el Contexto desde el store
import { useNavigate } from "react-router-dom";
import "../../styles/login.css";

export const Login = () => {
    const { store, actions } = useContext(Context); // Usa el contexto
    const [dataForm, setDataForm] = useState({
        email: '',     // Inicialmente vacío 
        password: '',  // Inicialmente vacío
    });
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const submitButtonRef = useRef(null); // Crea una referencia para el botón de "Iniciar sesión"

    useEffect(() => {
        if (submitButtonRef.current) {
            submitButtonRef.current.focus(); // Establece el foco en el botón al montar el componente
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDataForm({ ...dataForm, [name]: value }); // Actualiza el estado con el nuevo valor
    };

    const handleClick = (e) => {
        e.preventDefault();
        setVisible(!visible);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Comienza a cargar antes de realizar cualquier acción
    
        try {
            const result = await actions.loginUser(dataForm);
    
            if (result.success && result.user) {
                const userRole = result.user.is_teacher;
                if (userRole) {
                    navigate('/vistaProfe'); // Redirige a vista del profesor
                } else {
                    navigate('/vistaAlumno'); // Redirige a vista del alumno
                }
            } else {
                setMessage('Inicio de sesión fallido. Verifica tus credenciales.');
            }
        } catch (error) {
            console.error('Error en handleSubmit:', error);
            setMessage('Error en la solicitud de inicio de sesión. Inténtalo de nuevo.');
        } finally {
            setLoading(false); // Asegúrate de que el estado de carga se restablezca
        }
    };
    
    return (
        <div>
            <form className="container d-flex flex-column align-items-center mt-5 p-3" id="formularioLogin" onSubmit={handleSubmit} autoComplete="off">
                <h4 className="mt-2 mb-4"><b>Inicia sesión</b></h4>
                <label>Email
                    <input
                        className="form-control"
                        name="email"
                        value={dataForm.email}
                        placeholder="Correo electrónico"
                        onChange={handleChange}
                        type="email"
                        required
                        autoComplete="off"
                    />
                </label>
                <label>Contraseña
                    <div className="contenedor-password">
                        <input
                            className="form-control"
                            name="password"
                            value={dataForm.password}
                            placeholder="Contraseña"
                            onChange={handleChange}
                            type={visible ? "text" : "password"}
                            required
                            autoComplete="off"
                        />
                        {visible ? 
                            <span className="fa-solid fa-eye-slash icon" onClick={handleClick}></span> 
                            : 
                            <span className="fa-solid fa-eye icon" onClick={handleClick}></span>
                        }
                    </div>
                </label>
                <input
                    className="btn btn-secondary mt-3"
                    value="Iniciar sesión"
                    type="submit"
                    disabled={loading}
                    ref={submitButtonRef} // Asigna la referencia al botón de "Iniciar sesión"
                />
                <p>{message}</p>
            </form>
        </div>
    );
};
