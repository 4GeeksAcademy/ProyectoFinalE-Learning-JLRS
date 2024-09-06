// src/pages/VideoPlayer.js

import React, { useEffect, useRef } from 'react';

function VideoPlayer({ width, height, cursoId }) {
    const cloudinaryRef = useRef();
    const videoRef = useRef();

    useEffect(() => {
        if (cloudinaryRef.current) return;
        
        if (window.cloudinary) {
            cloudinaryRef.current = window.cloudinary;
            cloudinaryRef.current.VideoPlayer(videoRef.current, {
                cloud_name: 'dzefdelrj'
            });
        } else {
            console.error('Cloudinary script is not loaded');
        }
    }, []);

    return (
        <video
            ref={videoRef}
            data-cld-public-id={`/api/curso/${cursoId}`} // Asegúrate de definir `cursoId` o pásalo como prop
            width={width}
            height={height}
        />
    );
}

export default VideoPlayer;
