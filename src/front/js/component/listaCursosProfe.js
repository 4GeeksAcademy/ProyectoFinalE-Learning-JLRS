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
                    <Card className="cardCP" onClick={() => handleCourseClick(curso.id)} style={{ cursor: "pointer" }}>
                        <Card.Img variant="top" src={curso.portada} alt={curso.title} />
                        <Card.Body>
                            <Card.Title>{curso.title}</Card.Title>
                        </Card.Body>
                    </Card>
                </div>
            ))}
        </div>
    );
};

export default ListaCursosProfe;