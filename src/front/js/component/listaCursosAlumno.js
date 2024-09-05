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
            {cursos && cursos.length > 0 ? (
                cursos.map((curso) => (
                    <div className="colCA-md-4 mb-4" key={curso.id}>
                        <div className="cardCursoAlumno" onClick={() => handleCourseClick(curso.id)}>
                            <div className="cardAlumno__image-container">    
                                <img src={curso.portada} alt={curso.title} className="cardAlumno-img-top" />
                                <h3 className="cardAlumno__title">{curso.title}</h3>
                            </div>
                            <div className="cardAlumno__content"> 
                                <p className="cardAlumno__description">{curso.resumen}</p>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <p>No estás matriculado en ningún curso.</p>
            )}
        </div>
    );
};

export default ListaCursosAlumno;

