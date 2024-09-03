import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

//Barra de búsqueda
import BarraBusqueda from "../component/barraBusqueda";
import "../../styles/barraBusqueda.css";
import ListaCursos from "../component/listaCursos";
import Testimonios from "../component/testimonios";
import "../../styles/testimonios.css";



export const Home = () => {
    const { store, actions } = useContext(Context);
// esto para que al presionar la pestaña, nos lleve a una pagina LINEA 12
return (
    <div>
        <div id="carouselExampleFade" className="carousel slide carousel-fade">
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <a href="https://example.com/page1" target="_blank" rel="noopener noreferrer">
                        <img src="https://i.blogs.es/78408e/programador/1366_2000.jpeg" className="d-block w-100" alt="First Slide" />
                    </a>
                    <div className="text-overlay">Conecta, Aprende y Crece</div>
                </div>
                <div className="carousel-item">
                    <a href="https://example.com/page2" target="_blank" rel="noopener noreferrer">
                        <img src="https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" className="d-block w-100" alt="Second Slide" />
                    </a>
                </div>
                <div className="carousel-item">
                    <a href="https://example.com/page3" target="_blank" rel="noopener noreferrer">
                        <img src="https://esden.es/wp-content/uploads/2024/06/lenguajesdeprogramacion-qbit-01.webp" className="d-block w-100" alt="Third Slide" />
                    </a>
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
        {/* Aquí se agrega el componente BarraBusqueda */}
        <BarraBusqueda />
        <ListaCursos />

        <div className="container-center-elegirnos">
            <div className="card-elegirnos mb-3">
                <div className="row g-0">
                <div className="imagen-elegirnos col-md-6">
                <img src="https://images.pexels.com/photos/8199654/pexels-photo-8199654.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" className="img-fluid " alt="..." />
                </div>
                <div className="col-md-6">
            <div className="card-body-elegirnos">
                <h5 className="card-title-elegirnos">Da el primer paso hacia tu nueva carrera profesional</h5>
                <p className="card-text">Comienza tu camino hacia una carrera gratificante y de gran demanda con nuestra capacitación de nivel profesional. No importa si estás empezando desde cero o buscando cambiar de sector, nuestro programa está diseñado para brindarte las habilidades y conocimientos necesarios para destacar. Al completar nuestro programa, obtendrás una credencial reconocida por las empresas más influyentes del sector, lo que te abrirá puertas en el competitivo mercado laboral. Este reconocimiento es un testimonio de tu dedicación y dominio de las habilidades que las empresas buscan en los profesionales de hoy.</p>
                <p className="card-text"></p>
            </div>
                </div>
                </div>
            </div>
        </div>
        <div className="container-center-elegirnos">
            <div className="card-elegirnos mb-3">
                <div className="row g-0">
                <div className="col-md-6">
                <div className="card-body-elegirnos">
                <h5 className="card-title-elegirnos">Experiencia previa opcional</h5>
                <p className="card-text">No necesitas experiencia previa para comenzar. Ya sea que estés dando tus primeros pasos en un campo nuevo o buscando ampliar tu conjunto de habilidades actuales, nuestro enfoque accesible y comprensible está diseñado para todos. Desarrollarás habilidades esenciales y prácticas que te prepararán para el trabajo, incluso si apenas estás comenzando en el campo. No solo aprenderás conceptos teóricos; aplicarás tus nuevas habilidades en proyectos del mundo real utilizando las herramientas y técnicas más actuales del sector. Esta experiencia práctica te permitirá construir un portafolio impresionante que demuestre tu capacidad para resolver problemas reales y agregar valor a los equipos en los que trabajes.</p>
                <p className="card-text"></p>
                </div>
                </div>
            <div className="imagen-elegirnos col-md-6">
                <img src="https://images.pexels.com/photos/7972359/pexels-photo-7972359.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" className="img-fluid" alt="..." />
            </div>
                </div>
            </div>
            </div>
            <div className="container-center-elegirnos">
            <div className="card-elegirnos mb-3">
                <div className="row g-0">
                <div className="imagen-elegirnos col-md-6">
                <img src="https://images.pexels.com/photos/6958506/pexels-photo-6958506.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" className="img-fluid" alt="..." />
                </div>
                <div className="col-md-6">
            <div className="card-body-elegirnos">
                <h5 className="card-title-elegirnos">Aprende a tu propio ritmo</h5>
                <p className="card-text">Con la flexibilidad de nuestro programa, podrás aprender a tu propio ritmo y completar la capacitación en menos de 6 meses, incluso si trabajas a tiempo completo. Nuestra metodología de aprendizaje está diseñada para ajustarse a tu vida ocupada, permitiéndote avanzar en tu carrera profesional sin comprometer tus responsabilidades actuales. Con cada módulo, estarás un paso más cerca de alcanzar tus objetivos profesionales. Nuestro programa está estructurado para proporcionarte el apoyo y los recursos necesarios para mantenerte motivado y en el camino correcto, asegurando que termines preparado para enfrentar cualquier desafío que tu nueva carrera pueda presentar.</p>
                <p className="card-text"></p>
            </div>
                </div>
                </div>
            </div>
        </div>
   
        <Testimonios />

     <div className="ContenedorEmpresas">
        <div className="BarraDeEmpresas">
            <h4>Más de 7500 empresas y millones de estudiantes de todo el mundo confían en nosotros</h4>
            <div className="icon-container mt-4">
            <span className="fa-brands fa-apple"></span>
            <span className="fa-brands fa-windows"></span>
            <span className="fa-brands fa-google"></span>
            <span className="fa-brands fa-playstation"></span>
            <span className="fa-brands fa-youtube"></span>
            <span className="fa-brands fa-instagram"></span>
            <span className="fa-brands fa-paypal"></span>
            <span className="fa-brands fa-linkedin"></span>
            </div>
        </div>
        </div>
</div>
);
};