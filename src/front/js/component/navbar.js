import React, { useContext, useEffect } from "react";
import { Link , useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/navbar.css";
import logo from '../../img/LogoNombre2b.png';
import { Dropdown } from "react-bootstrap";

export const Navbar = () => {
    const{store,actions}=useContext(Context)
	//localStorage, almacenar datos en el navegador del usuario de manera persistente, después de que el navegador se cierra o la página se recarga
    // Leer el estado de autenticación y la imagen de perfil desde localStorage
    const logueado = localStorage.getItem('logueado'); //Verifica si el usuario está autenticado.
    const usuarioImage = localStorage.getItem('usuarioImage'); //Obtiene la URL de la imagen del perfil del usuario.
    useEffect(
        ()=>{
            console.log(logueado)
        },[logueado])
    
    const navigate = useNavigate();
    const handleLogout = ()=>{
        actions.logout()
        navigate("/")
    }

    return (
        <nav className="navbar mb-0">
            <Link to="/" className="navbar-brand">
                <img src={logo} alt="Logo Elearning" className="logo"/>
            </Link>
            {logueado ? ( //es true, se muestra el dropdown con la imagen del perfil y las opciones del menú.
                <div className="navbar-buttons">
                    {/* <Link to="/vistaProfe" className="btn btn-secondary">
                        Volver
                    </Link> */}
                    <Dropdown> 
                        <Dropdown.Toggle variant="success" id="dropdown-basic" className="foto-perfil-toggle"> 
                            <img src={store.usuarioPr?.photo} alt="" className="foto-perfilProfe" />
                        </Dropdown.Toggle> 
                        <Dropdown.Menu> 
                        <   Dropdown.Item as={Link} to="/perfil">Editar perfil</Dropdown.Item> 
                            <Dropdown.Item onClick={handleLogout}>Cerrar sesión</Dropdown.Item>
                        </Dropdown.Menu> 
                    </Dropdown>
                </div>
            ) : ( //Si no está autenticado, se muestran los botones de "Iniciar sesión" y "Registrarse".
                <div className="navbar-buttons">
                    <Link to="/login" className="btn btn-secondary">
                        Iniciar sesión
                    </Link>
                    <Link to="/signUp" className="btn btn-secondary">
                        Registrarse
                    </Link>
                </div>
            )}
        </nav>
    );
};


//navbar-brand es una clase específica que se utiliza para identificar el elemento que contiene el logotipo o nombre de la aplicación en una barra de navegación
