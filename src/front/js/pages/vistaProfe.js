import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { FormularioCurso } from "../component/formularioCurso";
import "../../styles/vistaProfe.css";
import ListaCursosProfe from "../component/listaCursosProfe";

const VistaProfe = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate(); // hook para manejar redirecciones.    // VistaProfe: Debe centrarse en mostrar la información del profesor y los cursos.
    //La lógica de redirección y autenticación y la protección de ruta ya está gestionada por PrivateRoute (privadaProfe.js)
    // Carga y mostrar datos.

    // Estado para controlar la visibilidad del modal
    const [isModalOpen, setIsModalOpen] = useState(false);

    // useEffect(() => {
    //     if (store.autentificacion && store.usuarioPr?.is_teacher) {
    //         actions.obtenerCursosTutor(store.usuarioPr.id); // Si el usuario está autenticado y es profesor, obtenemos los cursos del profesor del store.
    //     }
    // }, [store.autentificacion, store.usuarioPr]); //useEffect se ejecutará cada vez que cualquiera de estos valores cambie
  
    // Función para manejar la apertura y cierre del modal
    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };


    return (
        <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
            <div className="contenedorProfe">
                <div className="seccionSuperiorP">
                    <div className="cursosVP mt-4">
                        <h4>Dashboard de {store.user?.profesor.name}</h4>
                    </div>
                    <div className="cursosLC mt-4">
                        <ListaCursosProfe cursos={store.cursos} />
                    </div>
                </div>
            </div>
            <button onClick={toggleModal} className="btnFormulario"> Crea tu Curso </button>

            {isModalOpen && (
                <div className="modalVP">
                    <div className="modalContentVP">
                        <FormularioCurso />
                        <button onClick={toggleModal} className="btnCloseVPModal">Cerrar</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default VistaProfe