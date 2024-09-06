import React, { useState } from "react";

export const Uploader = ({ onUpload }) => {
    const [file, setFile] = useState(null);
    const [uploadedUrl, setUploadedUrl] = useState('');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) {
            alert("Por favor, selecciona un archivo primero.");
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'your_upload_preset'); // Añade tu preset de carga si es necesario

        const response = await fetch(`${process.env.BACKEND_URL}/api/upload`, {
            method: 'POST',
            body: formData,
        });

        const data = await response.json();
        if (data.secure_url) {
            setUploadedUrl(data.secure_url);
            if (onUpload) {
                onUpload(data.secure_url); // Llama al callback con la URL del video
            }
        }
    };

    return (
        <div className="Uploader">
            
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
            {uploadedUrl && (
                <div>
                    
                    {uploadedUrl.endsWith('.mp4') ? (
                        <video src={uploadedUrl} controls style={{ width: '300px' }} />
                    ) : (
                        <img src={uploadedUrl} alt="Uploaded" style={{ width: '300px' }} />
                    )}
                </div>
            )}
        </div>
    );
}
