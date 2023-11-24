import React from "react";

export const Lightbox = ({imageUrl, onClose, tipoArquivo}) => {
    return (
        <div className="lightbox-overlay" onClick={onClose}>
            <div className="lightbox-content">
                {tipoArquivo === 'imagem' && <>
                    <img src={imageUrl} alt="Imagem"/>
                    <button onClick={onClose} className="close-button">
                        Fechar
                    </button>
                </>}
                {tipoArquivo === 'video' && <>
                    <video controls muted preload="metadata">
                        <source src={imageUrl} type="video/mp4"/>
                        <source src={imageUrl} type="video/ogg"/>
                    </video>
                    <button onClick={onClose} className="close-button">
                        Fechar
                    </button>
                </>}
            </div>
        </div>
    );
};
