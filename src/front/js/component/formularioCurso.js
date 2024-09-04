import React, { useState, useContext } from "react";
import { Dropdown } from 'react-bootstrap';
import { Context } from "../store/appContext";
import "../../styles/formularioCurso.css";

export const FormularioCurso = () => {
    const { store, actions } = useContext(Context);
    const [dataForm, setDataForm] = useState({
        title: '',
        portada: '',
        resumen: '',
        categoria: '',
        nivel: '',
        precio: '',
        idioma: '',
        fecha_inicio: ''
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
    // Maneja el envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault() //evita que se recargue la página

         // Crear un objeto FormData para manejar archivos e enviar datos al servidor, incluidos archivos.
         const formData = new FormData();
         Object.keys(dataForm).forEach(key => { //Object.keys(dataForm) obtiene un array con los nombres de los campos del formulario
             formData.append(key, dataForm[key]); // añade cada par clave-valor al objeto, por ejemplo formData.append('title', 'Curso de React');
         });
 
         actions.crearCurso(formData); 
 
         // Restablece el formulario
         setDataForm({
             title: '',
             portada: '',
             resumen: '',
             categoria: '',
             nivel: '',
             precio: '',
             idioma: '',
             fecha_inicio: ''
         });

        console.log(dataForm)
    }

    return (<div>
        
        <form className="formularioCurso" onSubmit={handleSubmit}>
            <div>
                <h1 className="text-center mt-5">Crea tu curso</h1>
            </div>
            <label>Título
                <input className="form-control" name="title" value={dataForm.title} placeholder="" onChange={handleChange} type="text"></input>
            </label>
            <label>Portada
                <input className="form-control" name="portada" value={dataForm.portada} placeholder="" onChange={handleChange} type="file"></input>
            </label>
            <label>Resumen
                {/*<input className="form-control" name="resumen" value={dataForm.resumen} placeholder="" onChange={handleChange} type="text"></input>*/}
                <div>
                    <textarea class="form-control" name="resumen" value={dataForm.resumen} placeholder="" onChange={handleChange} type="text" rows="5"></textarea>
                    <p className="descripcionF text-secondary">Describe tu curso aquí</p>
                </div>
            </label>
            <label>Categoría
                <Dropdown>
                    <Dropdown.Toggle id="dropdown-categoria" title={dataForm.categoria || "Seleccionar categoría"}>
                        {dataForm.categoria || "Seleccionar categoría"}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => handleChange({ target: { name: 'categoria', value: "Desarrollo" } })}>
                            Desarrollo
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => handleChange({ target: { name: 'categoria', value: "Negocios" } })}>
                            Negocios
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => handleChange({ target: { name: 'categoria', value: "Diseño" } })}>
                            Diseño
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </label>
            <label>Nivel
                <Dropdown>
                    <Dropdown.Toggle id="dropdown-nivel" title={dataForm.nivel || "Seleccionar nivel"}>
                        {dataForm.nivel || "Seleccionar nivel"}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => handleChange({ target: { name: 'nivel', value: "Principiante" } })}>
                            Principiante
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => handleChange({ target: { name: 'nivel', value: "Intermedio" } })}>
                            Intermedio
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => handleChange({ target: { name: 'nivel', value: "Avanzado" } })}>
                            Avanzado
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => handleChange({ target: { name: 'nivel', value: "Máster" } })}>
                            Máster
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </label>
            <label>Precio
                <input className="form-control" name="precio" value={dataForm.precio} placeholder="" onChange={handleChange} type="range" min="0" max="350"></input>
                <span ClassName="precio-span">{dataForm.precio}</span>
            </label>
            <label>Idioma
                <Dropdown>
                    <Dropdown.Toggle id="dropdown-idioma" title={dataForm.idioma || "Seleccionar idioma"}>
                        {dataForm.idioma || "Seleccionar idioma"}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => handleChange({ target: { name: 'idioma', value: "Español" } })}>
                            Español
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => handleChange({ target: { name: 'idioma', value: "Inglés" } })}>
                            Inglés
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => handleChange({ target: { name: 'idioma', value: "Alemán" } })}>
                            Alemán
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </label>
            <label>Fecha de inicio
                <input className="form-control" name="fecha_inicio" value={dataForm.fecha_inicio} placeholder="" onChange={handleChange} type="date"></input>
            </label>
            <input className="btnFormulario btn-primary" value="enviar" type="submit" />
        </form>
    </div>
    );
};