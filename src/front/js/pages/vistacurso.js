import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../styles/vistacurso.css";

function vistacurso() {
  return (
    <div className='vistacurso__main-content'>
      <div className="card-1" style={{ width: "40rem" }}>
        <div className="card-body-vistacurso1">
          <h1 className="card-title">React.JS, Guía desde 0 (Actualizado 2024)</h1>
          <h6 className="card-subtitle mb-2 text-body-secondary">Aprende a crear sitios web de forma rápida y sencilla con React Js</h6>
          <button type="button" class="btn btn-primary me-3 btn-lg">Calificaciones</button>
          <button type="button" class="btn btn-primary btn-lg">Creado por Roberto Losada</button>
        </div>
      </div>
      <div className="card-1" style={{ width: "40rem" }}>
        <div className="card-body-vistacurso2">
          <h5 className="card-title">Lo que aprenderás</h5>
          <p className="card-text"></p>
          <p>Aprenderas a Construir sitios web utilizando la libreria React JS.</p>
          <p>Context API.</p>
          <p>Consumir REST API (Fetch y Axios).</p>
          <p>Pensar en componentes.</p>
          <p>Escribir codigo óptimo de React Js.</p>
          <p>Organización de las carpetas de tu proyecto</p>
        </div>
      </div>
      <div className="card-1" style={{ width: "40rem" }}>
        <div className="card-body-vistacurso3">
          <h5 className="card-title">Este curso Incluye:</h5>
          <p className="card-text"></p>
          <p>14,5 horas de vídeo bajo demanda.</p>
          <p>Acceso en dispositivos móviles y TV</p>
          <p>Acceso de por vida</p>
          <p>35 recursos descargables</p>
          <p>Certificado de finalización</p>
        </div>
      </div>
      <div className="card-1" style={{ width: "40rem" }}>
  <div className="card-body-vistacurso4">
    <h5 className="card-title">Contenido del Curso</h5>
    <ul className="course-content-list">
      <li>¿Qué es React JS?</li>
      <li>Historia de React JS</li>
      <li>Virtual DOM</li>
      <li>¿Qué es JSX?</li>
      <li>¿Qué es la Transpilación?</li>
      <li>Renderizado por primera vez</li>
      <li>¿Qué son los componentes? Parte 1</li>
      <li>¿Qué son los componentes? Parte 2</li>
      <li>Props</li>
      <li>States</li>
      <li>Declarando métodos en tus componentes</li>
      <li>Eventos</li>
      <li>Analizando setState</li>
      <li>Creando primer proyecto con Create React App</li>
      <li>Analizando la estructura de un proyecto con React JS</li>
      <li>Analizando useState</li>
      <li>Ciclo de vida de un componente</li>
      <li>Renderizado condicional</li>
    </ul>
  </div>
</div>

      <div className="containerCurso3">
        <div className="clearfix">
          <img src="https://images.unsplash.com/photo-1535982330050-f1c2fb79ff78?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="col-md-6 float-md-end mb-3 ms-md-3" alt="..." />
          <h1>89,99 € Precio original .</h1>
          <h5>Si realizas tu inscripcion en el mes de Agosto 2024 tendras en 30% de descuento en el valor total del curso.</h5>
          <h5>Acceso de por vida</h5>
          <h5>Puedes pagarlo hasta en 3 cuotas.</h5>
          <a className="btn btn-primary" href="#" role="button">Completar Inscripcion</a>
          <button className="btn btn-primary" type="submit">Añadir a lista de favoritos</button>
        </div>
      </div>
    </div>
  );
}

export default vistacurso;