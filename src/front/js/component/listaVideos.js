import React from 'react';
import ReactPlayer from 'react-player';

const ListaVideos = ({ videos }) => {
    return (
        <div>
            {videos.length > 0 ? (
                videos.map((video, index) => (
                    <div key={index} style={{ marginBottom: '20px', width: '800px', height: '450px', border: '1px solid #ccc', borderRadius: '8px', overflow: 'hidden' }}>
                        <ReactPlayer url={video.url} controls width="100%" height="100%" />
                    </div>
                ))
            ) : (
                <p>No hay videos disponibles</p>
            )}
        </div>
    );
}

export default ListaVideos;
