const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            cursos: [], //  Almacena todos los cursos obtenidos desde el backend.
            cursosConFiltros: [], // Almacena los cursos después de aplicar filtros
            loading: false, // Estado para mostrar carga
            error: null, // Estado para errores
            cursosProfe: [], //Almacena los cursos asignados al profesor específico.
            cursosAlumno: [], // Almacena los cursos en los que el alumno está inscrito
            autentificacion: false, // Indica si el usuarioProfe está autenticado.
            usuarioPr: null,  // Usuario que es un profesor.
            usuarioA: null, //información del usuario que se ha autenticado como alumno.
            filtros: { // Define los filtros aplicados para la búsqueda de cursos.
                categoria: "",
                valoracion: 0,
                nivel: "",
                precio: [0, 350],
                fecha: "",
                idioma: "",
                busqueda: "",
                
            }
        },
        actions: {
            // Acción para iniciar sesión alumno
            loginAlumno: async (dataForm) => {
                try {
                    const response = await fetch(process.env.BACKEND_URL + '/api/login', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(dataForm)
                    });

                    if (response.ok) {
                        const userData = await response.json();
                        setStore({ usuarioA: userData.user, autentificacion: true });
                        localStorage.setItem('token', userData.token);
                        return true;
                    } else {
                        console.error('Login fallido');
                        return false;
                    }
                } catch (error) {
                    console.error('Login error:', error);
                    return false;
                }
            },

            // Cerrar sesión Alumno
            logoutAlumno: () => {
                localStorage.removeItem('token');
                setStore({ usuarioA: null, autentificacion: false, cursosAlumno: [] });
            },

            // Acción para obtener los cursos del alumno
            obtenerCursosAlumno: async (alumnoId) => {
                const store = getStore();
                const token = localStorage.getItem('token');

                try {
                    const response = await fetch(`/api/students/${alumnoId}/courses`, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        }
                    });

                    if (response.ok) {
                        const cursosAlumno = await response.json();
                        setStore({ ...store, cursosAlumno });
                    } else {
                        console.error('Error al obtener los cursos del alumno');
                    }
                } catch (error) {
                    console.error('Error fetching student courses:', error);
                }
            },

            // Acción para iniciar sesión profe
            login: async (dataForm) => {
                try {
                    const response = await fetch(process.env.BACKEND_URL + '/api/login', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(dataForm)
                    });

                    if (response.ok) {
                        const userData = await response.json();
                        setStore({ usuarioPr: userData.user, autentificado: true });
                        localStorage.setItem('token', userData.token);
                        return true;
                    } else {
                        console.error('Login fallido');
                        return false;
                    }
                } catch (error) {
                    console.error('Login error:', error);
                    return false;
                }
            },

            // Cerrar sesión Profe
            logout: () => {
                localStorage.removeItem('token');
                setStore({ usuarioPr: null, autentificado: false, cursosProfe: [] });
            },

            // Acción para obtener los cursos del profesor
            obtenerCursosTutor: async (profesorId) => {
                const store = getStore();
                const token = localStorage.getItem('token');

                try {
                    const response = await fetch(`/api/tutors/${profesorId}/courses`, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        }
                    });

                    if (response.ok) {
                        const cursosProfe = await response.json();
                        setStore({ ...store, cursosProfe });
                    } else {
                        console.error('Error al obtener los cursos del profesor');
                    }
                } catch (error) {
                    console.error('Error fetching courses:', error);
                }
            },

            // Cargar los cursos desde el backend
            cargarCursos: async () => {
                const store = getStore();
                setStore({ ...store, loading: true });

                try {
                    const response = await fetch('/api/cursos');
                    const data = await response.json();
                    setStore({ cursos: data, cursosConFiltros: data, loading: false });
                } catch (error) {
                    setStore({ error: error.message, loading: false });
                    console.error('Error loading courses:', error);
                }
            },

            // Aplicar filtros a los cursos
            aplicarFiltrosCursos: () => {
                const store = getStore();
                const { cursos, filtros } = store;

                const cursosFiltrados = cursos.filter(curso => {
                    return (
                        (!filtros.categoria || curso.categoria === filtros.categoria) &&
                        (!filtros.valoracion || curso.valoracion >= filtros.valoracion) &&
                        (!filtros.nivel || curso.nivel === filtros.nivel) &&
                        (!filtros.precio || (curso.precio >= filtros.precio[0] && curso.precio <= filtros.precio[1])) &&
                        (!filtros.fecha || new Date(curso.fecha) >= new Date(filtros.fecha)) &&
                        (!filtros.idioma || curso.idioma === filtros.idioma) &&
                        (!filtros.busqueda || curso.nombre.includes(filtros.busqueda)) &&
                        (!filtros.cursoRelacionado || curso.relacionados.includes(filtros.cursoRelacionado))
                    );
                });

                setStore({ cursosConFiltros: cursosFiltrados });
            },

            // Acción para actualizar los filtros
            actualizarFiltros: (nuevosFiltros) => {
                const store = getStore();
                setStore({ filtros: { ...store.filtros, ...nuevosFiltros } });
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
                            message: 'Registro exitoso. Puedes iniciar sesión ahora.'
                        };
                    } else {
                        return {
                            success: false,
                            message: data.message || 'Error desconocido durante el registro'
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

            // Acción para inicio de sesión de contacto
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

            // Acción para crear un contacto
            createContact: async ({ name, email, password }) => {
                try {
                    const response = await fetch(process.env.BACKEND_URL + '/api/signup', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ name, email, password })
                    });

                    const data = await response.json();
                    console.log('Response data:', data);

                    if (response.ok) {
                        return {
                            success: true,
                            message: 'Registro exitoso. Puedes iniciar sesión ahora.'
                        };
                    } else {
                        return {
                            success: false,
                            message: data.message || 'Error desconocido durante el registro'
                        };
                    }
                } catch (error) {
                    console.error('Error en createContact:', error);
                    return {
                        success: false,
                        message: 'Error de conexión o servidor no disponible'
                    };
                }
            }
        }
    };
};

export default getState;
