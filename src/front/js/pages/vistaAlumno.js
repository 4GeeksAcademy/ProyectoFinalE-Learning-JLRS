import React, { useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate, Link } from "react-router-dom"; // Importa Link para navegación

import BarraBusqueda from "../component/barraBusqueda";
import "../../styles/barraBusqueda.css";
import ListaCursos from "../component/listaCursos";

const VistaAlumno = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        if (store.user?.id) {
            actions.obtenerCursosAlumno(store.user?.id);
        }
    }, []);

    const handleClick = (curso) => {
        actions.seleccionarCurso(curso);
        navigate(`/curso/${curso.id}`);
    };

    return (
        <div className="contenedorAlumno mt-5">
            <div className="perfilAlumno">
                <img src={store.user?.alumno?.photo} alt="Foto del Alumno" className="foto-perfil" />
                <h3>{store.user?.alumno?.name}</h3>
            </div>
            <div className="cursos mt-4">
                <h4>Mis cursos</h4>
                <ul className="lista-grupo">
                    {store.misCursos?.map(cursoAlumno => (
                        <li
                            key={cursoAlumno.id}
                            className="lista-grupo-item"
                        >
                            <Link to={`/curso/${cursoAlumno.id}`} onClick={() => handleClick(cursoAlumno)}>
                                <h3>
                                    {cursoAlumno.title} {/* Muestra el nombre del curso */}
                                </h3>
                            </Link>
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
