// Este componente extrae los cursos del estado global y los muestra en una lista.

import React, { useContext, useEffect } from "react";
import { Context } from '../store/appContext'; // Importa el contexto global
import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import "../../styles/listaCursosProfe.css";

const ListaCursosProfe = ({ cursos }) => {
    const navigate = useNavigate();

    const handleCourseClick = (id) => {
        navigate(`/curso/${id}`);
    };

    return (
        <div className="rowCP">
            {cursos.map((curso) => (
                <div className="colCP-md-4 mb-4" key={curso.id}>
                    <div className="cardCursoProfe" onClick={() => handleCourseClick(curso.id)}>
                        <img src={curso.portada} alt={curso.title} className="cardProfe-img-top" />
                        <div className="cardProfe__content">
                            <h3 className="cardProfe__title">{curso.title}</h3>
                            <p className="cardProfe__description">{curso.resumen}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ListaCursosProfe;