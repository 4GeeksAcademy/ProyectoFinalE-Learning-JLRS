//VistaDetallada:Frontend (VistaDetallada.js): El usuario selecciona un curso y hace clic en "Ir a pagar".

import React, { useEffect, useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Context } from '../store/appContext';
import "../../styles/VistaDetallaDWeb.css";



const VistaDetallada = () => {
    const { id } = useParams(); // Obtiene el id del curso desde la URL
    const { store, actions } = useContext(Context); // Obtiene el estado global
    const navigate = useNavigate(); // Hook para navegación

    // Convierte el id de la URL a un número entero
    const cursoId = parseInt(id, 10);

    console.log('ID desde la URL:', cursoId); // Verifica el ID obtenido de la URL


    useEffect(() => {
        store.cursos.find(curso => curso.id === cursoId); // Encuentra el curso por ID en el estado global

    }, []);


    console.log('Cursos en store:', store.cursosConFiltros); // Verifica los cursos en el estado global
    console.log('Curso encontrado:', store.cursoSeleccionado); // Verifica el curso encontrado

    // Al hacer clic en el botón "Ir a pagar", el usuario es redirigido a la vista de pago (VistaPago)
    const handleGoToPayment = () => {
        navigate('/vistaPago', { state: store.cursoSeleccionado }); // Pasa información del curso a VistaPago
    };


    if (!store.cursoSeleccionado) {
        return <p>Curso no encontrado</p>; // Mensaje si el curso no existe
    }

    return (
        <div className="curso-vistaDetallada">
            <h1>{store.cursoSeleccionado.title}</h1>
            <div className="cursoVD">
                {/* Columna izquierda: Descripción del curso */}
                <div className="cursoVD-col-izquierda">
                    <div className="cursoVD-aprenderas">
                        <h3>Competencias que desarrollarás</h3>
                        <ul>
                            <li>HTML, CSS, Responsive Design, Figma, SASS, Javascript, Jquery, Bootstrap, Wordpress, Creación de Temas de Wordpress, Git, Github, Alojamiento en Internet.</li>
                            <li>Diseñar cualquier sitio web con HTML y CSS.</li>
                            <li>Crear sitios adaptables a dispositivos móviles.</li>
                            <li>Darle lógica y funcionalidades a sus páginas web mediante Javascript.</li>
                            <li>Darle efectos y animaciones a sus páginas web mediante Jquery.</li>
                            <li>Diseñar bocetos de páginas web en Figma.</li>
                            <li>Crear sitios web responsive y en poco tiempo con Bootstrap.</li>
                            <li>Utilizar Wordpress y crear temas personalizados.</li>
                            <li>Subir sus propios sitios web a Internet.</li>
                            <li>Utilizar Git para compartir código en Github.</li>
                        </ul>
                    </div>

                    <div className="cursoVD-incluye">
                        <h3>Incluye</h3>
                        <ul>
                            <li>38 horas de vídeo bajo demanda</li>
                            <li>5 artículos de profesores con más de 20 años de experiencia</li>
                            <li>Recursos descargables</li>
                            <li>Acceso en dispositivos electrónicos</li>
                            <li>Certificado por la Universidad de 4Geeks</li>
                        </ul>
                    </div>

                    <div className="cursoVD-contenido">
                        <h3>Nuestro curso</h3>
                        <div className="accordion" id="cursoContenido">
                            {/* Tema 1 */}
                            <div className="accordionVC-item">
                                <h2 className="accordionVC-header" id="headingOne">
                                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                        Tema 1: Introducción al Diseño Web
                                    </button>
                                </h2>
                                <div id="collapseOne" className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#cursoContenido">
                                    <div className="accordion-body">
                                        <ul>
                                            <li>Lección 1: Introducción</li>
                                            <li>Lección 2: Configuración del entorno</li>
                                            <li>Lección 3: Primeros pasos en HTML y CSS</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* Tema 2 */}
                            <div className="accordionVC-item">
                                <h2 className="accordion-header" id="headingTwo">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                        Tema 2: Javascript y Jquery
                                    </button>
                                </h2>
                                <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#cursoContenido">
                                    <div className="accordion-body">
                                        <ul>
                                            <li>Lección 1: Fundamentos de Javascript</li>
                                            <li>Lección 2: Manipulación del DOM</li>
                                            <li>Lección 3: Efectos y animaciones</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* Añade más temas según sea necesario */}
                        </div>
                    </div>
                </div>

                {/* Columna derecha: Resumen del curso */}
                {
                    //si no esta en misCursos, aparece para comprar
                }
                <div className="cursoVD-col-derecha">
                    <h2 className="cursoVD-titulo">{store.cursoSeleccionado?.title}</h2> {/* Nombre del curso */}
                    <div className="fotoVD">
                        <img src={store.cursoSeleccionado?.portada} alt={store.cursoSeleccionado?.title} className="cursoVD-imagen" />
                    </div>
                    <p className="cursoVD-precio">€{store.cursoSeleccionado?.precio}</p>
                    <button onClick={handleGoToPayment} className="btn btn-primary_pagar">
                        Adquirir nuestro curso
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VistaDetallada;