import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../styles/contacto.css";
import mapa from '../../img/direccionDeMadrid.png'; // Imagen importada

function Contacto() {
  return (
    <div className="container3 d-flex flex-column justify-content-center align-items-center vh-100">
      {/* Bloque de texto de contacto */}
      <div className="mb-4">
        <h1 className="text-center mb-4">Contáctanos</h1>
        <div className="card mb-3" style={{ maxWidth: "540px" }} id="cajaPrincipal-contacto">
          <div className="row g-0">
            <div className="col-md-4">
              <img src={mapa} className="img-fluid rounded-start" alt="Ubicación de nuestras oficinas en Madrid" />
            </div>
            <div className="col-md-8">
              <div className="card-body" >
                <h5 className="card-title">Plaza España 123</h5>
                <p className="card-text">Piso 5to Puerta 123, Código Postal 08070109, Madrid - España.</p>
                <p className="card-text">Teléfono de Contacto: 6008500178</p>
                <p className="card-text">Email: Info@learningnetwork.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <p className="text-center-contacto" id="textoCentralContact">
        <strong>¡Nos encantaría saber de ti!</strong><br /><br />
        En <strong>Learning Network</strong>, valoramos cada oportunidad de conectar y brindar apoyo a nuestros usuarios. Si tienes alguna consulta, necesitas información adicional o simplemente quieres ponerte en contacto con nosotros, estamos aquí para ayudarte.
        <br /><br />
        Puedes visitarnos en nuestra oficina ubicada en <strong>Plaza España 123, Piso 5to Puerta 123, Código Postal 08070109, Madrid - España</strong>. Nuestro equipo estará encantado de recibirte y asistirte en persona durante nuestro horario de atención.
        <br /><br />
        Si prefieres contactarnos por teléfono, no dudes en llamarnos al <strong>6008500178</strong>. Estamos disponibles para resolver tus dudas y ofrecerte la información que necesites.
        <br /><br />
        También puedes enviarnos un correo electrónico a <strong>Info@learningnetwork.com</strong>. Responderemos a tus preguntas y comentarios a la mayor brevedad posible.
        <br /><br />
        Tu satisfacción es nuestra prioridad, y estamos comprometidos a ofrecerte el mejor servicio. No dudes en ponerte en contacto con nosotros a través de cualquiera de estos medios. <br /><br /> <strong>¡Esperamos saber de ti pronto!</strong>
      </p>
    </div>







  );
}

export default Contacto;
