import React, { useContext, useState, useEffect} from "react";
import { Context } from "../store/appContext";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../styles/perfil.css";
import { Row } from 'react-bootstrap';
import { FormularioPassword } from "../component/formularioContraseña";

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
      dataForm.avatar = uploadedUrl
      const resp = await actions.crearCurso(dataForm);
  }


  
  return (
    <div>
      <form className="formularioPerfil" onSubmit={handleSubmit}>
        <div>
          <div className='nombrePersona'> <h1><b>{store.user?.profesor.name} {store.user?.profesor?.lastname}</b></h1></div>
          <div className='nombrePersona'> <h3> <b>Cambia tu foto y edita tu información de perfil.</b></h3></div>
        </div>
        <label>
          <div className="container px-4 text-center">
            <div className="row gx-5">
              <div className="imagen2">
                <img alt={store.user?.profesor?.avatar} src="https://i.pinimg.com/564x/31/ec/2c/31ec2ce212492e600b8de27f38846ed7.jpg" />
              </div>
              <input type="file" onChange={handleFileChange} />
            </div>
          </div>
        </label>
        <label>Nombre
          <input className="form-control" name="title" value={dataForm.name} placeholder="" onChange={handleChange} type="text"></input>
          <h5>Actual: {store.user?.profesor.name}</h5>
        </label>
        <label>Apellidos
          <input className="form-control" name="title" value={dataForm.lastname} placeholder="" onChange={handleChange} type="text"></input>
          <h5>Actual: {store.user?.profesor.lastname}</h5>
        </label>
        <label>Telefono
          <input className="form-control" name="title" value={dataForm.telefono} placeholder="" onChange={handleChange} type="text"></input>
          <h5>Actual: {store.user?.profesor.telefono}</h5>
        </label>
        <label>Dirección
          <input className="form-control" name="title" value={dataForm.address} placeholder="" onChange={handleChange} type="text"></input>
          <h5>Actual: {store.user?.profesor.address}</h5>
        </label>
        <input className="btnFormularioPerfil btn-primary" value="Actualizar perfil" type="submit" />
      </form>
      {/* <FormularioPassword/> */}
    </div>
  );
};

export default Perfil;