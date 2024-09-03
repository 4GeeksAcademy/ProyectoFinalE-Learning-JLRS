import React, { useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom"; // hook para navegar a diferentes rutas dentro de la aplicación.

import BarraBusqueda from "../component/barraBusqueda";
import "../../styles/barraBusqueda.css";
import ListaCursos from "../component/listaCursos";

const VistaAlumno = () => {
    // obtener el store y las acciones definidas en el contexto.
    const { store, actions } = useContext(Context);
    // hook para navegar a diferentes rutas dentro de la aplicación.
    const navigate = useNavigate();

    // useEffect se ejecuta cuando cambia el estado de autenticación o la información del usuario alumno.
    useEffect(() => {
        // Si el usuario está autenticado y es un alumno (store.usuarioA no es null), se obtienen sus cursos.
        if (store.user?.id) {
            actions.obtenerCursosAlumno(store.user?.id); // Llama a la acción para obtener los cursos del alumno pasando su ID.
        }
    }, []); // El efecto se ejecutará cuando estos valores cambien.

    const handleClick = (curso) => {
        actions.seleccionarCurso(curso)
        navigate(`/curso/${curso.id}`)
    }

    return (
        <div className="contenedorAlumno mt-5">
            <div className="perfilAlumno">
                {/* Muestra la foto del perfil del alumno y su nombre, si están disponibles en el store */}
                <img src={store.user?.alumno?.photo} alt="Foto del Alumno" className="foto-perfil" />
                <h3>{store.user?.alumno?.name}</h3>
            </div>
            <div className="cursos mt-4">
                <h4>Mis cursos</h4>
                <ul className="lista-grupo">
                    {/* Mapea a través de los cursos del alumno y los muestra en una lista */}
                    {store.misCursos?.map(cursoAlumno => (
                        <li
                            key={cursoAlumno.id} // un identificador único (key) a cada elemento de la lista para optimización de React.
                            className="lista-grupo-item"
                            onClick={() => handleClick(cursoAlumno)} // Navega a la página de detalles del curso cuando se hace clic.
                        >


                            <h3>
                                {cursoAlumno.title} {/* Muestra el nombre del curso */}
                            </h3>

                        </li>
                    ))}
                </ul>
            </div>
            <BarraBusqueda />
            <ListaCursos />
        </div>
    );
};

export default VistaAlumno;
