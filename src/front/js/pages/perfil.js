import React, { useContext, useState, useEffect} from "react";
import { Context } from "../store/appContext";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../styles/perfil.css";
import { Row } from 'react-bootstrap';

function Perfil() {
  const { store, actions } = useContext(Context);
  const [file, setFile] = useState();
  const [uploadedUrl, setUploadedUrl] = useState('');

  const [dataForm, setDataForm] = useState({
      name: '',
      lastname: '',
      telefono: '',
      address: '',
      avatar: '',
      precio: '',
  })

  // Maneja los cambios en los campos de texto y en el archivo
  const handleChange = (e) => {
      const { name, value, type, files } = e.target;
      if (type === 'file') {
          // Si el tipo de campo es 'file', actualiza el estado con el archivo seleccionado
          setDataForm({ ...dataForm, [name]: files[0] });
      } else {
          // Para campos de texto, simplemente actualiza el estado con el valor ingresado
          setDataForm({ ...dataForm, [name]: value });
      }
  };

  useEffect(() => {
      handleUpload()
  }, [file])


  const handleFileChange = (e) => {
      setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
      console.log('-------------------------------------------')
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(`${process.env.BACKEND_URL}/api/upload`, {

          method: 'POST',
          body: formData,
      });

      const data = await response.json();
      console.log(data)
      if (data.secure_url) {
          setUploadedUrl(data.secure_url);
      }
  };
  const handleSubmit = async (e) => {
      e.preventDefault()
      // Crear un objeto FormData para manejar archivos e enviar datos al servidor, incluidos archivos.
      // const formData = new FormData();
      // Object.keys(dataForm).forEach(key => { //Object.keys(dataForm) obtiene un array con los nombres de los campos del formulario
      //     formData.append(key, dataForm[key]); // añade cada par clave-valor al objeto, por ejemplo formData.append('title', 'Curso de React');
      // });
      dataForm.portada = uploadedUrl
      const resp = await actions.crearCurso(dataForm);

      console.log(dataForm)
      if (resp.success) modalToggle()
      navigate('/vistaProfe')
  }
  
  return (
    <div className="text-center containerPrincipalcontainer d-flex flex-column align-items-center mt-5 p-3">
      <div className="row gx-3" >
        <form className="formularioCurso" onSubmit={handleSubmit}>
          <div className='nombrePersona'> <h1><b>{store.user?.profesor.name} {store.user?.profesor?.lastname}</b></h1></div>
          <div className='nombrePersona'> <h4> <b>Cambia tu foto y edita tu información de perfil.</b></h4></div>
          <label>Portada
            <input type="file" onChange={handleFileChange} />
          </label>
          <div className="container">
            <b>Nombre</b>
            <div className='firstName d-flex justify-content-center'>
              <h3>{store.user?.profesor?.name}</h3>
              <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"/>
            </div>
          </div>
        </form>
        <div className="col">
          <div className="p-9 divEditarPerfil">
            
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