import React, { useContext } from "react";
import { Context } from "../store/appContext";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../styles/perfil.css";
import { Row } from 'react-bootstrap';

function Perfil() {
  const { store, actions } = useContext(Context);
  return (
    <div className="container overflow-hidden text-center containerPrincipal">
      <div className="row gx-3" >
        <div className="col p-3 confIzq">
            <div className="Pagos">
              <h3><span className="fa-solid fa-credit-card"></span>Pagos recibidos</h3>
            </div>
        </div>
        <div className="col">
          <div className="p-9 divEditarPerfil">
            <div className='nombrePersona'> <h2>{store.user?.profesor.name} {store.user?.profesor?.lastname}</h2></div>
            <div className='nombrePersona'> <h4> <b>Cambia tu foto y edita tu información de perfil.</b></h4></div>
            <div className="container px-4 text-center">
              <div className="row gx-5">
                <div className="col">
                  <div className="p-3 imagen2"> <img alt={store.user?.profesor?.avatar} src="https://i.pinimg.com/564x/31/ec/2c/31ec2ce212492e600b8de27f38846ed7.jpg" />
                  </div>
                </div>
                <div className="col">
                  <div className="p-3 lado2"><button type="button" id="boton">Cambiar foto</button>
                    <div> JPG o PNG  </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="container">
              <b>Nombre</b>
              <div className='firstName d-flex justify-content-center'>
                {store.user?.profesor?.name}

                <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"/>
              </div>
            </div>
            <div className='firstName'>
              <b>Apellidos</b>
              <input
                type="text"
                className="form-control"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-sm"
              />
            </div>
            <div className='firstName'>
              <b>Email</b>
              <input
                type="email"
                className="form-control"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-sm"
              />
            </div>
            <div className='firstName'>
              <b>Contraseña</b>
              <input
                type="password"
                className="form-control"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-sm"
              />
            </div>
            <div className='firstName'>
              <b>Dirección</b>
              <input
                type="text"
                className="form-control"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-sm"
              />
            </div>
            <div className='firstName'>
              <b>Telefono</b>
              <input
                type="text"
                className="form-control"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-sm"
              />
            </div>

            <div className="saveChanges"  ><button type="button" id="boton">Save Changes</button></div>

          </div>
        </div>
      </div>
    </div>

  );
}

export default Perfil;