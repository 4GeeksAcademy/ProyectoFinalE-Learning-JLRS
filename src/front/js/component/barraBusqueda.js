import React, { useContext, useEffect, useState } from 'react';
import { Form, Button, Row, Col, Dropdown } from 'react-bootstrap'; //biblioteca que reescribe los componentes de Bootstrap como componentes de React.
import '../../styles/barraBusqueda.css'; // Importa los estilos para el componente
import { Context } from '../store/appContext'; // Importa el contexto global
import ListaCursos from "../component/listaCursos";



const BarraBusqueda = () => {
    // Accede al estado global y las acciones desde el contexto
    const { store, actions } = useContext(Context);
    // Estado para la categoría seleccionada  y la categoría que está siendo sobrevolada (hover)
    const [seleCategoria, setSeleCategoria] = useState(null);
    const [hoveredCategoria, setHoveredCategoria] = useState(null);
    // Validación de formularios
    const [erroresFormulario, setErroresFormulario] = useState({});
    const [esFormularioValido, setEsFormularioValido] = useState(true);
    // Estado local para manejar el estado de carga y errores
    const [loading, setLoading] = useState(store.loading);
    const [error, setError] = useState(store.error);



    // Función para validar el formulario
    const validarFormulario = () => {
        const errores = {};
        let valido = true;

        // Validación de categoría: es obligatoria
        if (!store.filtros.categoria) { 
            errores.categoria = "La categoría es obligatoria";
            valido = false;
        }

        // Validación de valoración: debe estar entre 1 y 5
        if (store.filtros.valoraciones < 1 || store.filtros.valoraciones > 5) {
            errores.valoraciones = "La valoración debe estar entre 1 y 5";
            valido = false;
        }

        // Validación de precio: solo si el campo precio está definido
        if (store.filtros.precio[0] > store.filtros.precio[1]) {
            errores.precio = "El precio mínimo no puede ser mayor que el precio máximo";
            valido = false;
        }

        // Validación de idioma: es obligatorio
        if (!store.filtros.idioma) {
        errores.idioma = "El idioma es obligatorio";
        valido = false;
        }

        setErroresFormulario(errores);
        setEsFormularioValido(valido);

        return valido;
    };




    // Función para aplicar los filtros y cargar los datos
    const filtrosAplicar = async () => {
        if (!validarFormulario()) { // Validar el formulario antes de aplicar filtros
            return;
        }
        setLoading(true); // Indica que se está cargando los datos
        setError(null); // Limpiar errores anteriores

        try {
            await actions.aplicarFiltrosCursos(); //  Aplica los filtros a los cursos cargados
        } catch (err) {
            setError(err.message); // Maneja errores en la carga de datos
        } finally {
            setLoading(false); // Indica que la carga ha terminado, independientemente de si fue exitosa o fallida
        }
    };



    
    const resetFiltros =  () => {
    // Resetea los filtros en el estado global
        actions.resetFiltros();   
        
        setSeleCategoria(null); // restablece el estado local seleCategoria a null.

        // Llama a la acción para recargar los cursos (puedes necesitar ajustar esta función según tu implementación)
        //await actions.cargarCursos(); // Esta acción debe manejar la lógica para cargar cursos y manejar el estado de "No hay cursos disponibles"
    };



    // Función para manejar los cambios en los campos del formulario
    const handleChange = (e) => {
        const { name, value } = e.target; // Obtiene el nombre del campo de formulario y su valor
        actions.actualizarFiltros({ [name]: value }); // Actualiza el filtro específico en el estado global
    };

    // Función para manejar el cambio de categoría
    const handleCategoriaChange = (categoria) => {
        setSeleCategoria(categoria); // Actualiza la categoría seleccionada
        actions.actualizarFiltros({ categoria }); // Actualiza el filtro de categoría en el estado global
    };

    // Función para manejar el evento de pasar el ratón sobre una categoría
    const handleMouseEnter = (categoria) => {
        setHoveredCategoria(categoria);
    };

    // Función para manejar el evento de salir el ratón de una categoría
    const handleMouseLeave = () => {
        setHoveredCategoria(null);
    };

    // Categorías y sus subtemas  para seleccionar
    const categorias = {
        Desarrollo: ["Desarrollo Web", "Lenguajes de programación", "Diseño y Desarrollo de bases de datos", "Desarrollo de Software"],
        Negocios: ["Finanzas", "Contabilidad", "Marketing", "Banca"],
        Diseño: ["Diseño Web", "Creación de Marca", "3D. y animación"]
    };

    return (
        <div className="barra-busqueda">
            <Form>
                <Row className="filaBarra mb-3">
                    <Col className='colunCategoria' >  {/* Columna para el filtro de categoría */}
                        <Form.Group controlId="formCategoria">
                            <Form.Label>Categoría</Form.Label>
                            <div 
                                className="categoria-menu" 
                                onMouseLeave={handleMouseLeave} /* Función para manejar el evento de salir con el ratón de una categoría */
                            >
                                <Dropdown>
                                    {/* Botón que muestra la categoría seleccionada */}
                                    <Dropdown.Toggle id="dropdown-categorias" title={seleCategoria || "Categoría"}>
                                        {seleCategoria || "Categoría"}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        {/* Opciones de categoría */}
                                        {Object.keys(categorias).map((categoria) => (
                                            <Dropdown.Item 
                                                key={categoria} 
                                                onMouseEnter={() => handleMouseEnter(categoria)}
                                                onClick={() => handleCategoriaChange(categoria)}
                                            >
                                                {categoria}
                                            </Dropdown.Item>
                                        ))}
                                    </Dropdown.Menu>
                                </Dropdown>
                                {/* Menú de subcategorías que se muestra al pasar el ratón sobre una categoría */}
                                {hoveredCategoria && (
                                    <Dropdown.Menu 
                                        className="subcategoria-menu" 
                                        show 
                                        style={{ left: '100%', marginTop: 0 }}
                                    >
                                        {categorias[hoveredCategoria].map((subcategoria) => (
                                            <Dropdown.Item 
                                                key={subcategoria} 
                                                onClick={() => handleCategoriaChange(subcategoria)}
                                            >
                                                {subcategoria}
                                            </Dropdown.Item>
                                        ))}
                                    </Dropdown.Menu>
                                )}
                                {erroresFormulario.categoria && <div className="error">{erroresFormulario.categoria}</div>}
                            </div>
                        </Form.Group>
                    </Col>
                    <Col className='colunValoracion'> {/* Columna dentro de una fila (row) para el filtro de valoraciones */}
                        <Form.Group controlId="formValoracion"> {/* Agrupa elementos de formulario relacionados. controlId se usa para asociar el grupo con una etiqueta de formulario (<Form.Label>). */}
                            <Form.Label>Valoraciones</Form.Label>
                            <div className="contenedorEstrellas">
                                <div className="estrellas">
                                    {/* Muestra estrellas según la valoración actual */}
                                    {[...Array(5)].map((_, i) => ( /* Crea un array de 5 elementos (para representar 5 estrellas) e itera sobre el y genera un span para cada estrella*/
                                        <span
                                            key={i}
                                            className={i < store.filtros.valoraciones ? "estrella rellena" : "estrella vacia"} /* Si la estrella está activada (onclick) (de menos a más ), recibe la clase estrella rellena, si no recibe la clase estrella vacia*/
                                            onClick={() => handleChange({ target: { name: 'valoraciones', value: i + 1 } })}
                                        >
                                            ★
                                        </span>
                                    ))}
                                </div>
                                {erroresFormulario.valoraciones && <div className="error">{erroresFormulario.valoraciones}</div>}
                            </div>
                        </Form.Group>
                    </Col>
                    <Col className="colunNivel-col">
                        <Form.Group controlId="formNivel" className="filtro-nivel-group">
                            <Form.Label className="filtro-nivel-label">Niveles</Form.Label>
                            <div className="contenedorNivel">
                                <Dropdown>
                                    <Dropdown.Toggle id="dropdown-niveles" title={store.filtros.nivel || "Seleccione un nivel"}>
                                        {store.filtros.nivel || "Seleccione un nivel"}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={() => handleChange({ target: { name: 'nivel', value: "principiante" } })}>
                                            Principiante
                                        </Dropdown.Item>
                                        <Dropdown.Item onClick={() => handleChange({ target: { name: 'nivel', value: "intermedio" } })}>
                                            Intermedio
                                        </Dropdown.Item>
                                        <Dropdown.Item onClick={() => handleChange({ target: { name: 'nivel', value: "avanzado" } })}>
                                            Avanzado
                                        </Dropdown.Item>
                                        <Dropdown.Item onClick={() => handleChange({ target: { name: 'nivel', value: "master" } })}>
                                            Máster
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                                {erroresFormulario.nivel && <div className="error">{erroresFormulario.nivel}</div>}
                            </div>
                        </Form.Group>
                    </Col>

                    <Col className="colunPrecio"> {/* Columna para el filtro de precio */}
                        <Form.Group controlId="formPrecio">
                            <Form.Label>Precios</Form.Label>
                            <div className="contenedorPrecio">
                                <Form.Control 
                                    type="range" 
                                    min="0" 
                                    max="350" 
                                    value={store.filtros.precio[1]} /* Flux */
                                    onChange={(e) => handleChange({ target: { name: 'precio', value: [0, e.target.value] } })} 
                                    className="filtro-precio-select"
                                />
                                <span>{`€0 - €${store.filtros.precio[1]}`}</span>
                                {erroresFormulario.precio && <div className="error">{erroresFormulario.precio}</div>}
                            </div>
                        </Form.Group>
                    </Col>
                    <Col className="colunFecha">  {/* Columna para el filtro de fecha */}
                        <Form.Group controlId="formFecha">
                            <Form.Label>Fecha de Inicio</Form.Label>
                            <div className="contenedorFecha">
                                <Form.Control 
                                    type="date" 
                                    name="fecha_inicio" 
                                    value={store.filtros.fecha_inicio} /* Flux */
                                    onChange={handleChange} 
                                    className="filtro-fecha-select" 
                                />
                                {erroresFormulario.fecha_inicio && <div className="error">{erroresFormulario.fecha_inicio}</div>}
                            </div>
                        </Form.Group>
                    </Col>
                    <Col className="colunIdioma">
                        <Form.Group controlId="formIdioma">
                            <Form.Label>Idioma</Form.Label>
                            <div className="contenedorIdioma">
                                <Dropdown>
                                    <Dropdown.Toggle id="dropdown-idioma" title={store.filtros.idioma || "Seleccionar idioma"}>
                                        {store.filtros.idioma || "Seleccionar idioma"}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={() => handleChange({ target: { name: 'idioma', value: "espanol" } })}>
                                            Español
                                        </Dropdown.Item>
                                        <Dropdown.Item onClick={() => handleChange({ target: { name: 'idioma', value: "ingles" } })}>
                                            Inglés
                                        </Dropdown.Item>
                                        <Dropdown.Item onClick={() => handleChange({ target: { name: 'idioma', value: "aleman" } })}>
                                            Alemán
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                                {erroresFormulario.idioma && <div className="error">{erroresFormulario.idioma}</div>}
                            </div>
                        </Form.Group>
                    </Col>

                    <Col className="colunBusqueda">
                        <Form.Group controlId="formBusqueda">
                            <Form.Label>Búsqueda</Form.Label>
                            <div className="buscadorContenedor">
                                <Form.Control
                                    type="text"
                                    name="busqueda"
                                    value={store.filtros.busqueda}
                                    onChange={handleChange}
                                    placeholder="Buscar cursos"
                                />
                                <span className="fa-solid fa-magnifying-glass iconoBuscador"></span>
                            </div>
                        </Form.Group>
                    </Col>
                    <Col className="colunBotones">
                        <div className="botones">
                            <Button className="btn-primary" onClick={filtrosAplicar} disabled={loading}>
                                {loading ? 'Cargando...' : 'Aceptar'}
                            </Button>
                            <Button className="btn-secondary" onClick={resetFiltros}>
                                Restablecer
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Form>
            {error && <div className="error">{error}</div>}
        </div>
    );
};

export default BarraBusqueda;


    // // llama la acción de cargar cursos cuando el componente BarraBusqueda se monta.
    // useEffect(() => {
    //     const fetchCursos = async () => {
    //         setLoading(true); // Indica que se está cargando y se usa para mostrar un indicador de carga en la interfaz de usuario.
    //         try {
    //             await actions.cargarCursos(); // Llama a la acción (cargarCursos del flux) desde el backend y el await asegura que la función fetchCursos esperará a que cargarCursos termine antes de continuar.
    //         } catch (err) {
    //             setError(err.message); // Maneja cualquier error que ocurra
    //         } finally {
    //             setLoading(false); // Indica que la carga ha terminado, independientemente de si la carga de datos fue exitosa o fallida
    //         }
    //     };
    //     fetchCursos(); // Llama a la función para cargar cursos y la ejecuta siempre que actions cambie
    // }, [actions, store.filtros]); // la llamada a fetchCursos()) se ejecutará nuevamente si [actions] o los filtros se actualiza o se reemplaza por una nueva referencia.

    // // Función para aplicar los filtros
    // const filtrosAplicar = () => {
    //     actions.aplicarFiltrosCursos(); // Llama a la acción para aplicar los filtros a los cursos
    // };
    
