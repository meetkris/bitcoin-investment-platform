import React from 'react';
import Slider from 'react-slick';
import PropertyCard from './PropertyCard';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './PropertyCarousel.css';

const PropertyCarousel = ({ properties, title }) => {
    const settings = {
        dots: false,
        infinite: properties.length > 3,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                }
            }
        ],
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />
    };

    return (
        <div className="property-carousel">
            {title && <h3>{title}</h3>}
            <Slider {...settings}>
                {properties.map(property => (
                    <div key={property.id} className="carousel-item">
                        <PropertyCard property={property} />
                    </div>
                ))}
            </Slider>
        </div>
    );
};

const NextArrow = ({ onClick }) => (
    <button className="carousel-arrow next" onClick={onClick}>
        ›
    </button>
);

const PrevArrow = ({ onClick }) => (
    <button className="carousel-arrow prev" onClick={onClick}>
        ‹
    </button>
);

export default PropertyCarousel;
