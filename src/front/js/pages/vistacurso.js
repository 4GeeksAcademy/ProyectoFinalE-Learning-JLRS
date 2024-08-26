import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../styles/vistacurso.css";

function vistacurso() {
  return (
      <div className='vistacurso__main-content'>
        <div className="card m-5" style={{width: "40rem"}}>
          <div className="card-body">
            <h1 className="card-title">React.JS, Guía desde 0 (Actualizado 2024)</h1>
            <h6 className="card-subtitle mb-2 text-body-secondary">Aprende a crear sitios web de forma rápida y sencilla con React Js</h6>
            <button type="button" class="btn btn-primary me-3 btn-lg">Calificaciones</button>
            <button type="button" class="btn btn-primary btn-lg">Creado por Roberto Losada</button>
          </div>
        </div>
        <div className="card m-5" style={{width: "40rem"}}>
          <div className="card-body">
            <h5 className="card-title">Lo que aprenderás</h5>
            <p className="card-text">Aprenderas a Construir sitios web utilizando la libreria React JS.</p>
            <p>Context API.</p>
            <p>Consumir REST API (Fetch y Axios).</p>
            <p>Pensar en componentes.</p>
            <p>Escribir codigo óptimo de React Js.</p>
            <p>Organización de las carpetas de tu proyecto</p>
          </div>
        </div>
        <div className="card m-5" style={{width: "40rem"}}>
          <div className="card-body">
            <h5 className="card-title">Este curso Incluye:</h5>
            <p className="card-text">14,5 horas de vídeo bajo demanda.</p>
            <p>Acceso en dispositivos móviles y TV</p>
            <p>Acceso de por vida</p>
            <p>35 recursos descargables</p>
            <p>Certificado de finalización</p>
          </div>
        </div>
        <div className="card m-5" style={{width: "40rem"}}>
          <div className="card-body">
            <h5 className="card-title">Contenido del Curso</h5>
            <p className="card-text">Que es React JS?</p>
            <p>Historia de React JS</p>
            <p>Virtual DOM</p>
            <p>Que es JSX?</p>
            <p>Que es la Transpilacion?</p>
            <p>Renderizado por primera vez</p>
            <p>Que son los componentes? Parte 1</p>
            <p>Que son los componentes? Parte 2</p>
            <p>Props</p>
            <p>States</p>
            <p>Declarando metodos en tus componentes</p>
            <p>Eventos</p>
            <p>Analizando setState</p>
            <p>Creando primer proyecto con Create React App</p>
            <p>Analizando la estructura de un proyecto con React JS</p>
            <p>Analizando useState</p>
            <p>Ciclo de vida de un componente</p>
            <p>Renderizado condicional</p>
          </div>
        </div>
        <div className="containerCurso">
          <div className="clearfix">
            <img src="https://images.unsplash.com/photo-1535982330050-f1c2fb79ff78?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="col-md-6 float-md-end mb-3 ms-md-3" alt="..."/>
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