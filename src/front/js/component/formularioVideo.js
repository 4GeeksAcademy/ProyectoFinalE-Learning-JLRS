import React, { useState } from "react";
import { Uploader } from "../component/cloudinary";

const Formulario = ({ onSubmit }) => {
    const [cursoID, setCursoID] = useState("");
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [videoUrl, setVideoUrl] = useState("");

    const handleVideoUpload = (url) => {
        setVideoUrl(url);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (cursoID && title && text && videoUrl) {
            onSubmit({ cursoID, title, text, videoUrl });
        } else {
            alert("Por favor, completa todos los campos.");
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <input 
                type="text" 
                placeholder="Curso ID" 
                value={cursoID} 
                onChange={(e) => setCursoID(e.target.value)} 
                style={{ marginBottom: '10px', padding: '8px', width: '300px' }}
            />
            <input 
                type="text" 
                placeholder="Título del video" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                style={{ marginBottom: '10px', padding: '8px', width: '300px' }}
            />
            <textarea 
                placeholder="Descripción del video" 
                value={text} 
                onChange={(e) => setText(e.target.value)} 
                style={{ marginBottom: '10px', padding: '8px', width: '300px', height: '100px' }}
            />
            
            {/* Componente de subida de video */}
            <Uploader onUpload={handleVideoUpload} />

            <button type="submit" className="btn btn-primary" style={{ marginTop: '10px' }}>
                Añadir Video
            </button>
        </form>
    );
};

export default Formulario;
