import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { FormularioCurso } from "../component/formularioCurso";
import "../../styles/vistaProfe.css";

const VistaProfe = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate(); // hook para manejar redirecciones.    // VistaProfe: Debe centrarse en mostrar la información del profesor y los cursos.
    //La lógica de redirección y autenticación y la protección de ruta ya está gestionada por PrivateRoute (privadaProfe.js)
    // Carga y mostrar datos.
    useEffect(() => {
        if (store.autentificacion && store.usuarioPr?.is_teacher) {
            actions.obtenerCursosTutor(store.usuarioPr.id); // Si el usuario está autenticado y es profesor, obtenemos los cursos del profesor del store.
        }
    }, [store.autentificacion, store.usuarioPr]); //useEffect se ejecutará cada vez que cualquiera de estos valores cambie
    
    return (
        <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
            <div className="contenedorProfe">
                <div className="seccionSuperiorP">
                    <div className="cursosVP mt-4">
                        <h4>Mis cursos</h4>
                        <ul className="vPlista-grupo">
                            {store.cursos.map(cursoProfe => (
                                <li key={cursoProfe.id} className="lista-grupo-item" onClick={() => navigate(`/curso/${cursoProfe.id}`)}>
                                    {cursoProfe.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            <div className="formularioContenedor">
                <FormularioCurso />
            </div>
        </div>
    );
}

export default VistaProfe