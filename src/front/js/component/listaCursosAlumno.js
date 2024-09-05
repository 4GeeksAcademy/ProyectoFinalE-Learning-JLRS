// Este componente extrae los cursos del estado global y los muestra en una lista.

import React, { useContext, useEffect } from "react";
import { Context } from '../store/appContext'; // Importa el contexto global
import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import "../../styles/listaCursosAlumno.css";

const ListaCursosAlumno = ({ cursos }) => {
    const navigate = useNavigate();

    const handleCourseClick = (id) => {
        navigate(`/curso/${id}`);
    };

    return (
        <div className="rowCA">
            {cursos.map((curso) => (
                <div className="colCA-md-4 mb-4" key={curso.id}>
                    <div className="cardCursoAlumno" onClick={() => handleCourseClick(curso.id)}>
                        <img src={curso.portada} alt={curso.title} className="cardAlumno-img-top" />
                        <div className="cardAlumno__content">
                            <h3 className="cardAlumno__title">{curso.title}</h3>
                            <p className="cardAlumno__description">{curso.resumen}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ListaCursosAlumno;