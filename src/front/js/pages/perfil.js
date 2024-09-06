import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../styles/perfil.css";

function Perfil() {
  return (
    <div class="container overflow-hidden text-center" className="containerPrincipal">
      <div class="row gx-3" >
        <div class="col">
          <div class="p-3" className='confIzq'>
            <div>
              <h2 className="confiTituloIzq"> Configuración </h2></div>


            <div className="generalzq" >
              <h3>  <a href="/general" className="btnInvisible">
                <svg width="20" height="20" fill="currentColor" className="bi bi-gear-fill" viewBox="0 0 16 16">
                  <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z" />
                </svg>
                General
              </a></h3></div>

            <div className="perfil"> <h3>  <a href="/perfil" className="btnInvisible">
              <svg width="20" height="20" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
              </svg>
              Perfil
            </a></h3> </div>

            <div className="cuenta" > <h3>    <a href="/cuenta" className="btnInvisible">
              <svg width="20" height="20" fill="currentColor" className="bi bi-shield-lock-fill" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M8 0c-.69 0-1.843.265-2.928.56-1.11.3-2.229.655-2.887.87a1.54 1.54 0 0 0-1.044 1.262c-.596 4.477.787 7.795 2.465 9.99a11.8 11.8 0 0 0 2.517 2.453c.386.273.744.482 1.048.625.28.132.581.24.829.24s.548-.108.829-.24a7 7 0 0 0 1.048-.625 11.8 11.8 0 0 0 2.517-2.453c1.678-2.195 3.061-5.513 2.465-9.99a1.54 1.54 0 0 0-1.044-1.263 63 63 0 0 0-2.887-.87C9.843.266 8.69 0 8 0m0 5a1.5 1.5 0 0 1 .5 2.915l.385 1.99a.5.5 0 0 1-.491.595h-.788a.5.5 0 0 1-.49-.595l.384-1.99A1.5 1.5 0 0 1 8 5" />
              </svg>
              Cuenta
            </a></h3> </div>

            <div className="notificaciones"> <h3>     <a href="/notificaciones" className="btnInvisible">
              <svg width="20" height="20" fill="currentColor" className="bi bi-bell-fill" viewBox="0 0 16 16">
                <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2m.995-14.901a1 1 0 1 0-1.99 0A5 5 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901" />
              </svg>
              Notificaciones
            </a> </h3> </div>
            <div className="Pagos"> <h3>     <a href="/Pagos" className="btnInvisible">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-credit-card-2-back-fill" viewBox="0 0 16 16">
                <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v5H0zm11.5 1a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zM0 11v1a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-1z" />
              </svg>
              Pagos
            </a> </h3> </div>

          </div>
        </div>
        <div class="col">
          <div class="p-9" className='confiDere'>

            <div className='nombrePersona'> <h2>Perfil (Nombre de la persona) </h2></div>
            <div className='nombrePersona'> <h6> <b>Cambia tu foto y edita tu información de perfil.</b></h6></div>
            <div><div class="container px-4 text-center">
              <div class="row gx-5">
                <div class="col">
                  <div class="p-3" className='imagen2'> <img src="https://i.pinimg.com/564x/31/ec/2c/31ec2ce212492e600b8de27f38846ed7.jpg" />
                  </div>
                </div>


                <div class="col">
                  <div class="p-3" className='lado2' ><button type="button" id="boton"   >Cambiar foto</button>
                    
                    <div> JPG o PNG  </div>
                  </div>
                </div>
              </div>
            </div>
            </div>
            <div className='firstName'>
              <b>Nombres</b>
              <input
                type="text"
                className="form-control"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-sm"
              />
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