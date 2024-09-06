import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Uploader } from "../component/cloudinary";
import ReactPlayer from "react-player";

const VistaProfe = () => {
    const { store, actions } = useContext(Context);

    const [videoUrl, setVideoUrl] = useState("");   
    const [cursoID, setCursoID] = useState("");    
    const [title, setTitle] = useState("");        
    const [text, setText] = useState("");           
    const [isModalOpen, setIsModalOpen] = useState(false); 

    useEffect(() => {
        if (store.user?.profesor) {
            actions.obtenerCursosProfesor(store.user?.profesor.id);
        }
    }, [store.user?.profesor]);

    const handleVideoUpload = (url) => {
        setVideoUrl(url);
       
        fetch(`${process.env.BACKEND_URL}/api/registrarVideo`, {
            method: 'POST',
            body: JSON.stringify({ 
                cursoID: cursoID,   
                title: title,       
                videoUrl: url,      
                text: text         
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
          .then(data => console.log('Video registrado:', data))
          .catch(error => console.error('Error al registrar el video:', error));
    };


    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            {/* Botón que abre el modal */}
            <button className="btn btn-primary" onClick={toggleModal}>
                Subir Video
            </button>
            {/* Modal que contiene los campos para completar */}
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

                        <label>Curso ID:</label>
                        <input 
                            type="text" 
                            placeholder="Curso ID" 
                            value={cursoID} 
                            onChange={(e) => setCursoID(e.target.value)} 
                            style={{ marginBottom: '10px', padding: '8px', width: '100%' }} 
                        />

                        <label>Título del video:</label>
                        <input 
                            type="text" 
                            placeholder="Título del video" 
                            value={title} 
                            onChange={(e) => setTitle(e.target.value)} 
                            style={{ marginBottom: '10px', padding: '8px', width: '100%' }} 
                        />

                        <label>Descripción del video:</label>
                        <textarea 
                            placeholder="Descripción del video" 
                            value={text} 
                            onChange={(e) => setText(e.target.value)} 
                            style={{ marginBottom: '10px', padding: '8px', width: '100%', height: '100px' }}
                        />

                        {/* Componente de subida de video */}
                        <Uploader onUpload={handleVideoUpload} />

                        {/* Botón para cerrar el modal */}
                        <button className="btn btn-secondary" onClick={toggleModal} style={{ marginTop: '10px' }}>
                            Cerrar
                        </button>
                    </div>
                </div>
            )}

            {/* Mostrar el video si ya está subido */}
            {videoUrl && (
                <div style={{ width: '800px', height: '450px', border: '1px solid #ccc', borderRadius: '8px', overflow: 'hidden', marginTop: '20px' }}>
                    <ReactPlayer url={videoUrl} controls width="100%" height="100%" />
                </div>
            )}
        </div>
    );
};

export default VistaProfe;
