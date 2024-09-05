//localStorage es una API de almacenamiento web que proporciona una forma de almacenar datos en el navegador de manera persistente, 
//es decir, los datos almacenados en localStorage permanecen incluso después de cerrar el navegador o recargar la página.
//está asociado con un dominio web. Solo el mismo dominio puede acceder a los datos que almacenó.

//localStorage.setItem('token', 'mi_token_de_autenticacion'); para guardar un token
//const token = localStorage.getItem('token'); para recuperar un token
//localStorage.removeItem('token');Eliminar un token 
// Ejemplo en un flujo de autenticación:
// El usuario inicia sesión con sus credenciales.
// La aplicación recibe un token de autenticación desde el servidor.
// El token se guarda en localStorage.
// Para futuras solicitudes, el token se envía en los encabezados para autenticar al usuario.
// Si el usuario cierra la sesión, se elimina el token de localStorage




const getState = ({ getStore, getActions, setStore }) => {


    return {
        store: {
            paymentInfo: {},
            cursos: [
                // {
                //     id: 1,
                //     nombre: "Curso de Desarrollo Web",
                //     categoria: "Desarrollo",
                //     subcategoria: "Desarrollo Web",
                //     valoracion: 5,
                //     nivel: "principiante",
                //     precio: 100,
                //     fecha: "2023-09-01",
                //     idioma: "espanol"
                // },
                // {
                //     id: 2,
                //     nombre: "Curso de Finanzas",
                //     categoria: "Negocios",
                //     subcategoria: "Finanzas",
                //     valoracion: 4,
                //     nivel: "intermedio",
                //     precio: 200,
                //     fecha: "2023-10-01",
                //     idioma: "ingles"
                // },
                // {
                //     id: 3,
                //     nombre: "Curso de Diseño Web",
                //     categoria: "Diseño",
                //     subcategoria: "Diseño Web",
                //     valoracion: 3,
                //     nivel: "avanzado",
                //     precio: 150,
                //     fecha: "2023-11-01",
                //     idioma: "aleman"
                // }

            ], //  Almacena todos los cursos obtenidos del mockup mientras no funciona la API del el backend. Siempre tiene los cursos sin filtrar.
            cursosConFiltros: [], // Almacena los cursos después de aplicar filtros. Se actualiza cuando aplicas filtros
            //categorias: [], // Asegúrate de tener categorías en el estado
            //subcategorias: [], // Y también subcategorías si son independientes
            loading: false, // Estado para mostrar carga
            error: null, // Estado para errores
            cursosProfe: [], //Almacena los cursos asignados al profesor específico.
            cursosAlumno: [], // Almacena los cursos en los que el alumno está inscrito
            cursoSeleccionado: [], //Almacena los cursos seleccionados por el alumno para comprar.
            autentificacion: false, // Indica si el usuarioProfe está autenticado.
            usuarioPr: null,  // Usuario que es un profesor.
            usuarioA: null, //información del usuario que se ha autenticado como alumno.
            filtros: { // Define los filtros aplicados para la búsqueda de cursos.
                categoria: "",
                valoracion: 0,
                nivel: "",
                precio: [0, 350],
                fecha_inicio: "",
                idioma: "",
                busqueda: "",

            },

        },
        actions: {
            //FUNCIONES DE JAVIER (mirar abajo)
            crearCurso: async (dataForm) => {

                try {
                    const response = await fetch(process.env.BACKEND_URL + '/api/cursos', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('token')}`,

                        },
                        body: JSON.stringify(dataForm)
                    });

                    const data = await response.json();
                    console.log('Response data:', data);

                    if (response.ok) {
                      getActions().obtenerCursosProfesor()
                        return {
                            success: true,
                            message: 'Curso creado con éxito'
                        };
                    } else {
                        return {
                            success: false,
                            message: data.message || 'Error desconocido durante la creación'
                        };
                    }
                } catch (error) {
                    console.error('Error en crear curso:', error);
                    return {
                        success: false,
                        message: 'Error de conexión o servidor no disponible'
                    };
                }
            },
            //FUNCIONES DE JAVIER (mirar arriba)

            // Cargar los cursos desde el backend
            cargarCursos: async () => {
                const store = getStore();
                setStore({ ...store, loading: true }); // Muestra el estado de carga

                try { // Enviamos una solicitud GET para obtener todos los cursos.
                    const response = await fetch(process.env.BACKEND_URL + '/api/cursos'); // Solicita los datos de cursos
                    const data = await response.json(); // Convierte la respuesta en JSON
                    console.log('Cursos cargados:', data); // Verifica los cursos cargados
                    setStore({ ...store, cursos: data, cursosConFiltros: data, loading: false });
                    // Actualizamos ambos estados tanto de cursos y cursosConFiltrado y oculta el estado de carga
                } catch (error) {
                    setStore({ ...store, error: error.message, loading: false }); // Maneja el error
                    console.error('Error loading courses:', error);
                }
            },

            // cargarCurso: async (id) => {
            //     const store = getStore();
            //     setStore({ ...store, loading: true }); // Muestra el estado de carga

            //     try { // Enviamos una solicitud GET para obtener todos los cursos.
            //         const response = await fetch(process.env.BACKEND_URL + '/api/cursos/<int:id>'); // Solicita los datos del curso
            //         const data = await response.json(); // Convierte la respuesta en JSON
            //         console.log('Curso cargado:', data); // Verifica los cursos cargados
            //         setStore({ ...store, curso: data, loading: false });
            //         // Actualizamos ambos estados tanto de cursos y cursosConFiltrado y oculta el estado de carga
            //     } catch (error) {
            //         setStore({ ...store, error: error.message, loading: false }); // Maneja el error
            //         console.error('Error loading course:', error);
            //     }
            // },

            // Aplicar filtros a los cursos
            // aplicarFiltrosCursos: () => {
            //     const store = getStore();
            //     const { cursos, filtros } = store;

            //     const cursosFiltrados = cursos.filter(curso => {
            //         return (
            //             (!filtros.categoria || curso.categoria === filtros.categoria) &&
            //             (!filtros.valoracion || curso.valoracion >= filtros.valoracion) &&
            //             (!filtros.nivel || curso.nivel === filtros.nivel) &&
            //             (!filtros.precio || (curso.precio >= filtros.precio[0] && curso.precio <= filtros.precio[1])) &&
            //             (!filtros.fecha_inicio || new Date(curso.fecha_inicio) >= new Date(filtros.fecha_inicio)) &&
            //             (!filtros.idioma || curso.idioma === filtros.idioma) &&
            //             (!filtros.busqueda || curso.title.toLowerCase().includes(filtros.busqueda.toLowerCase()))
            //         );
            //     });
            //        // Actualiza el estado global con los cursos filtrados
            //     setStore({ cursosConFiltros: cursosFiltrados });
            // },

            aplicarFiltrosCursos: () => {
                const store = getStore();
                const { cursos, filtros } = store;
                const cursosFiltrados = cursos.filter(curso => {
                    return (
                        (!filtros.categoria || curso.categoria.toLowerCase() === filtros.categoria.toLowerCase()) &&
                        (!filtros.valoraciones || curso.valoraciones >= filtros.valoraciones) &&
                        (!filtros.nivel || curso.nivel.toLowerCase() === filtros.nivel.toLowerCase()) &&
                        (!filtros.precio || (curso.precio >= filtros.precio[0] && curso.precio <= filtros.precio[1])) &&
                        (!filtros.fecha_inicio || new Date(curso.fecha_inicio) >= new Date(filtros.fecha_inicio)) &&
                        (!filtros.idioma || curso.idioma.toLowerCase() === filtros.idioma.toLowerCase()) &&
                        (!filtros.busqueda || curso.title.toLowerCase().includes(filtros.busqueda.toLowerCase()))
                    );
                });
                // Actualiza el estado global con los cursos filtrados
                setStore({ cursosConFiltros: cursosFiltrados });
            },

            // Función para actualizar los filtros aplicados
            actualizarFiltros: (nuevosFiltros) => {
                const store = getStore();
                // Combina los filtros existentes con los nuevos filtros proporcionados
                const filtrosActualizados = { ...store.filtros, ...nuevosFiltros };

                // Si el filtro de precio se actualiza, asegúrate de manejar el caso del rango.
                if (nuevosFiltros.precio) {
                    filtrosActualizados.precio = nuevosFiltros.precio;
                }
                // Actualiza el estado global con los filtros actualizados
                setStore({ filtros: filtrosActualizados });

                // Aplica los filtros actualizados a la lista de cursos
                getActions().aplicarFiltrosCursos();

            },
            //Actualizar el estado global,limpiando los cursos filtrados. 
            //Esto significa que el array cursosConFiltros se vacía.
            resetFiltros: () => {
                const store = getStore(); // Obtiene el estado actual del store.
                setStore({
                    ...store, // Copia el estado actual.
                    filtros: {
                        categoria: '',
                        valoracion: 0,
                        nivel: '',
                        precio: [0, 350],
                        fecha_inicio: '',
                        idioma: '',
                        busqueda: ''
                    }, // Restablece los filtros a sus valores predeterminados.
                    cursosConFiltros: [] // Limpia los cursos filtrados.
                });
                // Llama a la función que carga todos los cursos
            
                // //  filtros vacíos para mostrar todos los cursos
                // getActions().aplicarFiltrosCursos();
            },

            // Acción para obtener los cursos del alumno
            obtenerCursosAlumno: async () => {
                const token = localStorage.getItem('token');

                try {
                    const response = await fetch(process.env.BACKEND_URL + `/api/mis_cursos`, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        }
                    });

                    if (response.ok) {
                        const data = await response.json();
                        setStore({ cursosAlumno: data.misCursos });
                    } else {
                        console.error('Error al obtener los cursos del alumno');
                    }
                } catch (error) {
                    console.error('Error fetching student courses:', error);
                }
            },

            // Cerrar sesión
            logout: () => {
                localStorage.removeItem('token'); // Elimina el token del localStorage
                setStore({ usuarioPr: null, autentificado: false, cursosProfe: [] });
            },

            // Acción para obtener los cursos del profesor
            obtenerCursosProfesor: async () => {
                const token = localStorage.getItem('token'); // Obtén el token de autenticación

                try {
                    const response = await fetch(process.env.BACKEND_URL + `/api/cursos_profe`, {
                        headers: {
                            'Authorization': `Bearer ${token}`, // Autorización de la solicitud con el token.
                            'Content-Type': 'application/json'
                        }
                    });

                    if (response.ok) {
                        const cursosProfe = await response.json();
                        setStore({cursosProfe: cursosProfe.misCursos });
                    } else {
                        console.error('Error al obtener los cursos del profesor');
                    }
                } catch (error) {
                    console.error('Error fetching courses:', error);
                }
            },

            // Acción para manejar errores
            handleError: (error) => {
                setStore({ error: error.message });
            },

            // Acción para registro de usuario
            register: async (formData) => {
                try {
                    const response = await fetch(process.env.BACKEND_URL + '/api/signup', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(formData)
                    });

                    const data = await response.json();
                    console.log('Response data:', data);

                    if (response.ok) {
                        return {
                            success: true,
                            message: 'Usuario creado exitosamente.',
                        };
                    } else {
                        return {
                            success: false,
                            message: data.message || 'Error desconocido durante el registro '
                        };
                    }
                } catch (error) {
                    console.error('Error en registerUser:', error);
                    return {
                        success: false,
                        message: 'Error de conexión o servidor no disponible'
                    };
                }
            },

            // Acción para inicio de sesión
            loginUser: async ({ email, password }) => {
                try {
                    const response = await fetch(process.env.BACKEND_URL + '/api/login', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ email, password })
                    });

                    const data = await response.json();
                    console.log('Response data:', data);

                    if (response.ok) {
                        localStorage.setItem("token", data.token)
                        setStore({ user: data.user })
                        return {
                            success: true,
                            user: data.user,
                            data: {
                                token: data.token
                            },
                            message: 'Conexión exitosa con el servidor'
                        };
                    } else {
                        return {
                            success: false,
                            message: data.message || 'Error desconocido'
                        };
                    }
                } catch (error) {
                    console.error('Error en loginUser:', error);
                    return {
                        success: false,
                        message: 'Error de conexión o servidor no disponible'
                    };
                }
            },
            seleccionarCurso: (val) => {
                setStore({ cursoSeleccionado: val })
            },
            setPaymentInfo: (val) => {
                setStore({ paymentInfo: val })
            },
            nuevaCompra: async (paymentId) => {
                const store = getStore()
                let date = Date()
                date.toString()
                try {
                    const response = await fetch(process.env.BACKEND_URL + '/api/compra', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        },
                        body: JSON.stringify({
                            curso_id: store.cursoSeleccionado.id,
                            profesor_id: store.cursoSeleccionado.profesor_id,
                            fecha_pago: date,
                            cantidad: store.cursoSeleccionado.precio,
                            pago_stripe_id: paymentId
                        })
                    });

                    const data = await response.json();
                    console.log('Response data:', data);


                } catch (error) {
                    console.error('Error en pago:', error);
                    return {
                        success: false,
                        message: 'Error en pago'
                    };
                }
            }
        }
    };
};

export default getState;



// // Ejemplo de función para cargar categorías y subcategorías
// cargarCategorias: async () => {
//     const store = getStore();
//     setStore({ ...store, loading: true });

//     try {
//         const response = await fetch(process.env.BACKEND_URL+'/api/categorias');
//         const data = await response.json();
//         setStore({ categorias: data, loading: false });
//     } catch (error) {
//         setStore({ error: error.message, loading: false });
//         console.error('Error loading categories:', error);
//     }
// },

// Llama a cargarCategorias en algún lugar de tu aplicación para que las categorías estén disponibles

