//usar PrivateRoute te proporciona un método más limpio y reutilizable para manejar la protección de rutas.

//PrivateRoute es una forma de proteger rutas específicas, como VistaProfe: asegurando que solo usuarios que cumplan con ciertos criterios (en este caso, ser profesores autenticados) puedan acceder a esas rutas.

import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { Context } from "../store/appContext";


// Componente PrivateRoute que verifica la autenticación y redirige al usuario si no cumple con los requisitos. Funciona con react-router-dom versión 6
const PrivateRoute = ({ vista: VistaProfe, ...rest }) => { //  = componente = vista es el nombre del prop que representa el componente a renderizar y ...rest: Captura todos los props adicionales que se pasan al componente PrivateRoute y los pasa al componente VistaProfe
    const { store } = useContext(Context);

    // Verifica si el usuario está autenticado y si cumple con los requisitos específicos para acceder a la ruta VistaProfe (layout.js)
    const autenticado = store.autentificacion;
    const profesor = store.usuarioPr?.is_teacher;

    // Retorna el componente si el usuario está autenticado y es profesor, de lo contrario redirige a la página de login
    return autenticado && profesor ? (
        <VistaProfe {...rest}  /> //Renderiza VistaProfe si el usuario está autenticado y es un profesor.
    ) : (
        <Navigate to="/login" /> //Si el usuario no está autenticado o no es un profesor, se redirige automáticamente a la página de login (/login).
    );
};

export default PrivateRoute;
