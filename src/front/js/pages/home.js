import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Home = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        // Inicializa el carrusel y establece el intervalo en 5000 ms (5 segundos)
        const carouselElement = document.querySelector('#carouselExampleFade');
        if (carouselElement) {
            const carousel = new bootstrap.Carousel(carouselElement, {
                interval: 5000, // Cambia de diapositiva cada 5 segundos
                wrap: true, // Permite que el carrusel vuelva al principio al final
                ride: 'carousel' // Inicia el carrusel automáticamente
            });
        }
    }, []);

    return (
        <div id="carouselExampleFade" className="carousel slide carousel-fade">
            <div className="carousel-inner">
                <div className="carousel-item active">
                
                    <img src="https://img.freepik.com/foto-gratis/aula-virtual-espacio-estudio_23-2149178706.jpg?t=st=1723192613~exp=1723196213~hmac=5a8c53b98fc8081ce0f78826031202b016eb1128019beb8e54b2f9508617f6aa&w=1380" className="d-block w-100" alt="First Slide" />
                </div>
                <div className="carousel-item">
                    <img src="https://img.freepik.com/foto-gratis/mujer-negocios-ordenador-portatil-mano-esta-feliz-exito-retrato-mujer-gafas-blusa-rayas-gritando-entusiasmo-haciendo-gesto-ganador_197531-13438.jpg?t=st=1723192685~exp=1723196285~hmac=7faa32b9dc3b55e7e55660b571c612b19388cde64dac483baf3791d4a6ec970e&w=1380" className="d-block w-100" alt="Second Slide" />
                </div>
                <div className="carousel-item">
                    <img src="https://img.freepik.com/foto-gratis/jovencitas-que-miran-ordenador-portatil-junto_23-2147655843.jpg?t=st=1723192975~exp=1723196575~hmac=ef90509bdffa2f4885fa72349a79644ea59d21ad210bb665780a5cc265828351&w=1380" className="d-block w-100" alt="Third Slide" />
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
    );
};
