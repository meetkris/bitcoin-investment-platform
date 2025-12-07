import React, { useState } from 'react';
import './ImageGallery.css';

const ImageGallery = ({ images, title }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFullscreen, setIsFullscreen] = useState(false);

    const nextImage = () => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    const openFullscreen = (index) => {
        setCurrentIndex(index);
        setIsFullscreen(true);
    };

    return (
        <>
            <div className="image-gallery">
                <div className="main-image" onClick={() => openFullscreen(currentIndex)}>
                    <img src={images[currentIndex]} alt={title} />
                    <div className="image-counter">
                        {currentIndex + 1} / {images.length}
                    </div>
                    <button className="gallery-nav prev" onClick={(e) => { e.stopPropagation(); prevImage(); }}>
                        ‹
                    </button>
                    <button className="gallery-nav next" onClick={(e) => { e.stopPropagation(); nextImage(); }}>
                        ›
                    </button>
                </div>
                <div className="thumbnail-strip">
                    {images.map((img, index) => (
                        <div
                            key={index}
                            className={`thumbnail ${index === currentIndex ? 'active' : ''}`}
                            onClick={() => setCurrentIndex(index)}
                        >
                            <img src={img} alt={`${title} ${index + 1}`} />
                        </div>
                    ))}
                </div>
            </div>

            {isFullscreen && (
                <div className="fullscreen-gallery" onClick={() => setIsFullscreen(false)}>
                    <button className="close-fullscreen" onClick={() => setIsFullscreen(false)}>
                        ✕
                    </button>
                    <img src={images[currentIndex]} alt={title} onClick={(e) => e.stopPropagation()} />
                    <button className="gallery-nav prev" onClick={(e) => { e.stopPropagation(); prevImage(); }}>
                        ‹
                    </button>
                    <button className="gallery-nav next" onClick={(e) => { e.stopPropagation(); nextImage(); }}>
                        ›
                    </button>
                    <div className="fullscreen-counter">
                        {currentIndex + 1} / {images.length}
                    </div>
                </div>
            )}
        </>
    );
};

export default ImageGallery;
