import React, { useEffect, useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate, Link } from "react-router-dom";
import ListaCursosAlumno from "../component/listaCursosAlumno";
import "../../styles/vistaAlumno.css"; 
import ListaCursos from "../component/listaCursos";
import BarraBusqueda from "../component/barraBusqueda";
import "../../styles/barraBusqueda.css";

const VistaAlumno = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [showBarraBusqueda, setShowBarraBusqueda] = useState(false); // Inicializa el estado

    useEffect(() => {
        if (store.user?.id) {
            actions.obtenerCursosAlumno(store.user?.id);
        }
    }, [store.user?.id, actions]);

    const handleClick = (curso) => {
        actions.seleccionarCurso(curso);
        navigate(`/curso/${curso.id}`);
    };

    // Función para alternar la visibilidad de la barra de búsqueda
    const toggleBarraBusqueda = () => {
        setShowBarraBusqueda(!showBarraBusqueda);
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", height: "150vh" }}>
            <div className="contenedor_Alumno">
                {/* Nueva sección superior para el alumno */}
                <div className="seccionSuperiorAlumno">
                    <div className="perfilAlumno mt-5">
                        <h3>{store.user?.alumno?.name}</h3>
                    </div>
                    <div className="cursosAlumno mt-4">
                        <h4>Espacio de trabajo de {store.user?.alumno?.name}</h4>
                    </div>
                    {/* Lista de cursos del profesor */}
                    <div className="cursosLCA mt-4">
                        <ListaCursosAlumno cursos={store.cursosAlumno} />
                    </div>
                </div>
            </div>

             {/* Sección de cursos del alumno */}
             <div className="cursos_alumnos mt-1">
                {/* Botón para mostrar la barra de búsqueda */}
                <button onClick={toggleBarraBusqueda} className="btnToggleBarraBusquedaAlumno">
                    {showBarraBusqueda ? "Ocultar Barra de Búsqueda" : "Mostrar Barra de Búsqueda"}
                </button>

                {/* Condicional para mostrar la barra de búsqueda y ListaCursos */}
                {showBarraBusqueda && (
                    <div className="barraBusquedaYListaCursos">
                        <BarraBusqueda />
                        <ListaCursos />
                    </div>
                )}
            </div>
        </div>
    );
};

export default VistaAlumno;
