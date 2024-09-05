// Este componente extrae los cursos del estado global y los muestra en una lista.

import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from '../store/appContext'; // Importa el contexto global
import "../../styles/listaCursos.css";

const ListaCursos = () => {
    // Obtiene el store desde el contexto
    const { store , actions } = useContext(Context); 

    useEffect(() => {
        actions.cargarCursos()
    }, []);

    return (
        <div className="listaDeCursos my-4"> {/* Agrega un margen vertical */}
            {store.cursosConFiltros.length > 0 ? (  /* Verifica si hay cursos filtrados */
                <div className="row row-cols-1 row-cols-md-3 g-4"> {/* Cursos en una cuadrícula y g-4 agrega un espaciado entre los elementos */}
                    {store.cursosConFiltros?.map(curso => ( /* Mapea los cursos filtrados y genera un elemento para cada curso */
                        <div className="col" key={curso.id} name={curso.title} id={curso.id}> {/* Columna para cada tarjeta y usa el id del curso como la clave única */}
                            <div className="cardCursos h-100">
                                <img 
                                    src={curso.portada}/* direccion del models.py donde aparezca cursos y sus imagenes*/
                                    className="cardCursos-img-top" 
                                    alt={curso.title} 
                                /> {/* Muestra la imagen del curso, o una imagen por defecto si no hay imagen */}
                                <div className="cardCursos-body-ListaCurso">
                                    <h5 className="cardCursos-title">{curso.title}</h5> {/* Muestra el nombre del curso en el título de la tarjeta */}
                                    <p className="cardCursos-text">
                                        <strong>Categoría:</strong> {curso.categoria}<br />
                                        <strong>Valoración:</strong> {curso.valoraciones} estrellas<br />
                                        <strong>Nivel:</strong> {curso.nivel}<br />
                                        <strong>Precio:</strong> €{curso.precio}<br />
                                        <strong>Fecha de Inicio:</strong> {new Date(curso.fecha_inicio).toLocaleDateString()}<br />
                                        <strong>Idioma:</strong> {curso.idioma}
                                    </p>
                                </div>
                                <Link to={`/curso/${curso.id}`}><div className="cardCursos-footer">
                                    <div className="btn btn-primary" onClick={()=>actions.seleccionarCurso(curso)}>Informacion del curso</div> {/* Enlace para ir al detalle del curso */}
                                </div></Link>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="noCursos">Filtre para encontrar el curso deseado</p> /* Mensaje cuando no hay cursos filtrados */
            )}
        </div>
    );
};

export default ListaCursos;
