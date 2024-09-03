import React, { useState } from "react";

export const Uploader = () => {

    const [file, setFile] = useState(null);
    const [uploadedUrl, setUploadedUrl] = useState('');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        const formData = new FormData();
        formData.append('file', file);
        
        const response = await fetch(process.env.BACKEND_URL + '/api/upload', {
            method: 'POST',
            body: formData,
        });

        const data = await response.json();
        if (data.secure_url) {
            setUploadedUrl(data.secure_url);
        }
    };

    return (
        <div className="App">
            <h1>Upload Image to Cloudinary</h1>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
            {uploadedUrl && (
                <div>
                    <h3>Uploaded Image:</h3>
                    <img src={uploadedUrl} alt="Uploaded" style={{ width: '300px' }} />
                </div>
            )}
        </div>
    );
}
