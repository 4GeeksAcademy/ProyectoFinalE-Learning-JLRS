import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Uploader } from "../component/cloudinary";
import ReactPlayer from "react-player";
import { useParams, useNavigate } from "react-router-dom";const VistaProfe = () => {
    const { store, actions } = useContext(Context);
    const { id } = useParams()
    const [cursoID, setCursoID] = useState("");
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [videos,setVideos] = useState([]);
    const navigate = useNavigate()
    useEffect(() => {
        if (store.user?.profesor) {
            actions.obtenerCursosProfesor(store.user.profesor.id);
            fetchVideos();
        }
    }, [store.user?.profesor]);    const fetchVideos = () => {
        fetch(`${process.env.BACKEND_URL}/api/videos`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(response => response.json())
            .then(data => setVideos(data))
            .catch(error => console.error('Error fetching videos:', error));
    };    const handleVideoUpload = (url) => {        fetch(`${process.env.BACKEND_URL}/api/videos`, {
            method: 'POST',
            body: JSON.stringify({
                cursoID: store.cursoSeleccionado.id,
                title: title,
                videoUrl: url,
                text: text,
                profesorID: store.user?.profesor.id
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log('Video registrado:', data);
                fetchVideos(); // Actualiza la lista de videos después de subir uno nuevo
                // Resetea el estado del modal
                setCursoID("");
                setTitle("");
                setText("");
                toggleModal(); // Cierra el modal
            })
            .catch(error => console.error('Error al registrar el video:', error));
    };    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };    const handleGoToPayment = () => {
        navigate('/vistaPago', { state: store.cursoSeleccionado }); // Pasa información del curso a VistaPago
    };    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            {/* Botón que abre el modal */}
            {store.user?.is_teacher ? <button className="btn btn-primary" onClick={toggleModal}>
                Subir Video
            </button> : ''}            {/* Modal que contiene los campos para completar */}
            {isModalOpen && (
                <div className="modal" style={{
                    display: 'block',
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0,0,0,0.5)'
                }}>
                    <div className="modal-content" style={{
                        margin: 'auto',
                        padding: '20px',
                        backgroundColor: '#fff',
                        width: '50%',
                        borderRadius: '8px'
                    }}>
                        <h3>Subir Video</h3>                        
                        {/* <label>Curso ID:</label> */}
                        {/* <input
                            type="text"
                            placeholder="Curso ID"
                            value={cursoID}
                            onChange={(e) => setCursoID(e.target.value)}
                            style={{ marginBottom: '10px', padding: '8px', width: '100%' }}
                        />                         */}
                        <label>Título del video:</label>
                        <input
                            type="text"
                            placeholder="Título del video"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            style={{ marginBottom: '10px', padding: '8px', width: '100%' }}
                        />                        <label>Descripción del video:</label>
                        <textarea
                            placeholder="Descripción del video"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            style={{ marginBottom: '10px', padding: '8px', width: '100%', height: '100px' }}
                        />                        {/* Componente de subida de video */}
                        <Uploader onUpload={handleVideoUpload} />                        {/* Botón para cerrar el modal */}
                        <button className="btn btn-secondary" onClick={toggleModal} style={{ marginTop: '10px' }}>
                            Cerrar
                        </button>
                    </div>
                </div>
            )}            {/* Mostrar la lista de videos subidos */}            {store.user?.is_teacher && store.cursoSeleccionado?.videos
                ?
                store.cursoSeleccionado?.videos?.map(video => (
                    <div key={video.id} style={{ width: '800px', height: 'auto', border: '1px solid #ccc', borderRadius: '8px', overflow: 'hidden', marginTop: '20px', marginBottom: '5rem'}}>
                        <h4>{video.title}</h4>
                        <p>{video.text}</p>
                        <ReactPlayer url={video.url} controls width="100%" height="100%" />
                    </div>
                ))
                : store.user && store.cursosAlumno?.filter(curso => curso.id == id)[0]
                    ?
                    store.cursosAlumno?.filter(curso => curso.id == id)[0]?.videos?.map(video => (
                        <div key={video.id} style={{ width: '800px', height: 'auto', border: '1px solid #ccc', borderRadius: '8px', overflow: 'hidden', marginTop: '20px' }}>
                            <h4>{video.title}</h4>
                            <p>{video.text}</p>
                            <ReactPlayer url={video.url} controls width="100%" height="100%" />
                        </div>
                    ))
                    :
                    !store.user?.profesor
                        ?
                        <>
                            <div className="cursoVD-col-derecha">
                                <h2 className="cursoVD-titulo">{store.cursoSeleccionado?.title}</h2> {/* Nombre del curso */}
                                <div className="fotoVD">
                                    <img src={store.cursoSeleccionado?.portada} alt={store.cursoSeleccionado?.title} className="cursoVD-imagen" />
                                </div>
                                <p>Resumen: {store.cursoSeleccionado?.resumen}</p>
                                <div className="d-flex justify-items-between">
                                    <p>Idioma: {store.cursoSeleccionado?.idioma}</p>
                                    <p>Nivel: {store.cursoSeleccionado?.nivel}</p>
                                    <p>Categoría: {store.cursoSeleccionado?.categoria}</p>
                                </div>
                                <p className="cursoVD-precio">€{store.cursoSeleccionado?.precio}</p>
                                <button onClick={handleGoToPayment} className="btn btn-primary_pagar">
                                    Adquirir nuestro curso
                                </button>
                            </div>
                        </>
                        :
                        ''            }
            {!store.cursoSeleccionado ? <p>Curso no encontrado</p> : ''}
        </div>
    );
};export default VistaProfe;
