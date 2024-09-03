import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../styles/about.css";

function About() {
  return (
  <div className='Titulo'>
    <h5 className='Titulo-principal-about'>Sobre Nosotros</h5>
   <div className='about'>
      <div className='about__main-content'>
        <div className="card cartaAbout mb-5">
          <img src="https://images.pexels.com/photos/4145190/pexels-photo-4145190.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" class="card-img-top-about"/>
      <div className="card-body-about">
          <h5 className="card-title-about">Quienes Somos</h5>
          <p className="card-text-about">En Learning Network, nos dedicamos a brindar una plataforma de aprendizaje en línea de alta calidad, diseñada para satisfacer las necesidades educativas de personas de todo el mundo. Con una amplia variedad de cursos en múltiples disciplinas, nos esforzamos por democratizar el acceso a la educación y empoderar a nuestros estudiantes para que alcancen sus metas académicas y profesionales.</p>
      </div>
        </div>
        <div class="card cartaAbout mb-5">
          <img src="https://images.pexels.com/photos/4144923/pexels-photo-4144923.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" className="card-img-top-about" alt="..."/>
      <div class="card-body-about">
          <h5 class="card-title-about">Nuestros Valores</h5>
          <p>Accesibilidad: Creemos que la educación debe estar al alcance de todos, sin importar su ubicación o situación económica.</p>
          <p>Calidad: Nos aseguramos de que cada curso ofrecido en nuestra plataforma sea creado y enseñado por expertos en la materia.</p>
          <p>Innovación: Utilizamos las últimas tecnologías para proporcionar una experiencia de aprendizaje interactiva y atractiva.</p>
          <p>Colaboración: Fomentamos una comunidad de aprendizaje donde los estudiantes y profesores pueden colaborar y crecer juntos.</p>
      </div>
      </div>
      <div class="card cartaAbout mb-5">
          <img src="https://images.pexels.com/photos/2041540/pexels-photo-2041540.jpeg" className="card-img-top-about"/>
      <div class="card-body-about">
          <h5 class="card-title-about">Nuestra Historia</h5>
          <p class="card-text-about">Learning Network fue fundada en 2005 por un grupo de entusiastas de la educación y la tecnología. Desde entonces, hemos crecido rápidamente, ampliando nuestra oferta de cursos y nuestra comunidad de estudiantes. Hoy, Learning Network es una de las plataformas de aprendizaje en línea más respetadas, con miles de cursos y millones de estudiantes en todo el mundo.</p>
      </div>
        </div>
        <div class="card cartaAbout mb-5">
          <img src="https://images.pexels.com/photos/4861363/pexels-photo-4861363.jpeg?auto=compress&cs=tinysrgb&w=800" className="card-img-top-about"/>
      <div class="card-body-about">
          <h5 class="card-title-about">Nuestra Mision</h5>
          <p class="card-text-about">Nuestra misión es transformar la educación a través de la tecnología, proporcionando acceso a cursos y recursos educativos de calidad a estudiantes de todas las edades y orígenes. Nos comprometemos a fomentar un entorno de aprendizaje inclusivo, accesible y efectivo que inspire a los estudiantes a alcanzar su máximo potencial.</p>
      </div>
        </div>
        <div class="card cartaAbout mb-5">
          <img src="https://images.pexels.com/photos/8199708/pexels-photo-8199708.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" className="card-img-top-about"/>
      <div class="card-body-about">
          <h5 class="card-title-about">Nuestra Equipo</h5>
          <p class="card-text-about">Nuestro equipo está compuesto por educadores, desarrolladores, diseñadores y especialistas en soporte al cliente que trabajan en conjunto para ofrecer la mejor experiencia de aprendizaje posible. Cada miembro de Learning Network está apasionado por la educación y comprometido con el éxito de nuestros estudiantes.</p>
      </div>
        </div>
        <div class="card cartaAbout mb-5">
          <img src="https://images.pexels.com/photos/6476577/pexels-photo-6476577.jpeg?auto=compress&cs=tinysrgb&w=800" className="card-img-top-about"/>
      <div class="card-body-about">
          <h5 class="card-title-about">Que Ofrecemos</h5>
          <p>Variedad de Cursos: Desde habilidades técnicas y profesionales hasta intereses personales y académicos, ofrecemos cursos en una amplia gama de temas.</p>
          <p>Flexibilidad: Aprende a tu propio ritmo con acceso las 24 horas del día, los 7 días de la semana a todos los cursos.</p>
          <p>Certificaciones: Obtén certificados de finalización que pueden ayudarte a avanzar en tu carrera o en tus estudios.</p>
          <p>Soporte: Nuestro equipo de soporte está disponible para ayudarte con cualquier pregunta o problema que puedas tener.</p>
      </div>
        </div>
        </div>
      </div>
      </div>
  );
}

export default About;
