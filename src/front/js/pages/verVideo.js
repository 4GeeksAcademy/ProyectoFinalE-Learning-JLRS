
import React, { useEffect, useState } from 'react';
import '../../styles/pantallaVideo.css'; 

const VerVideo = ({ cursoId }) => {
    const [videoUrl, setVideoUrl] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchVideo = async () => {
            try {
                // Asume que tienes un token de autenticación en tu almacenamiento local
                const token = localStorage.getItem('token');
                
                const response = await fetch(`/api/curso/${cursoId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setVideoUrl(data.video_url); // Obtenemos la URL del video
            } catch (error) {
                setError(error.message);
                console.error('Error fetching video:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchVideo();
    }, [cursoId]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className='videoPantalla'>
            <div className='videoContainer'>
                {videoUrl ? (
                    <iframe
                        src={videoUrl}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className='videoIframe'
                        title="Video de YouTube"
                    />
                ) : (
                    <p>No video available for this course.</p>
                )}
            </div>
        </div>
    );
};

export default VerVideo;

