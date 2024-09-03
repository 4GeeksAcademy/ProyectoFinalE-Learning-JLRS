import React from 'react';
import "../../styles/testimonios.css";

// Importa las imágenes
import estudiante1 from '../../img/estudiante1.png'; // Asegúrate de que la extensión es correcta
import estudiante2 from '../../img/Estudiante2.png';
import estudiante3 from '../../img/estudiante3.png';

function Testimonios() {
    //array de objetos que contienen la información de cada testimonio
    const opiniones = [
        {
          name: 'Lucía M.',
          title: 'Desarrollo Web',
          country: 'España',
          image: estudiante1, // Usa la imagen importada
          feedback: '“El curso de Desarrollo Web me permitió crear aplicaciones desde cero y entender a fondo el ciclo de vida del desarrollo de software. La práctica constante y los proyectos en el curso me dieron la confianza para trabajar en proyectos reales.”',
        },
        {
          name: 'Carlos G.',
          title: 'Curso de Finanzas',
          country: 'México',
          image: estudiante2, // Usa la imagen importada
          feedback: '“El Curso de Finanzas me ayudó a entender conceptos clave como la gestión de inversiones y el análisis de riesgos. Gracias a este conocimiento, he podido optimizar la estructura financiera de mi empresa y tomar decisiones más informadas.”',
        },
        {
          name: 'Marta S.',
          title: 'Curso de Diseño Web',
          country: 'Argentina',
          image: estudiante3, // Usa la imagen importada
          feedback: '“El Curso de Diseño Web me enseñó a crear interfaces atractivas y funcionales. Aprendí a utilizar herramientas de diseño avanzadas y a seguir buenas prácticas que han mejorado la experiencia del usuario en mis proyectos.”',
        },
    ];   

  return (
    <section className="testimonials">
        {/*Contiene todos los testimonios */}
      <div className="testimonials-container"> 
        {/* Itera sobre el array de opiniones y crea un bloque para cada testimonio */}
        {opiniones.map((opinion, index) => (
          <div key={index} className="testimonial">
            {/* Muestra la imagen del testimonio */}
            <img src={opinion.image} alt={opinion.name} className="testimonial-image" />
            <h3 className="testimonial-name">{opinion.name}</h3>{/* Muestra el nombre del testimonio */}
            <p className="testimonial-title">{opinion.title}</p>
            <p className="testimonial-country">{opinion.country}</p>
            <hr className="testimonial-divider" />
            <p className="testimonial-feedback">{opinion.feedback}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Testimonios;
