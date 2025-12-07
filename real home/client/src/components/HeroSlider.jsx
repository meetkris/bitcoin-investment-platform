import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './HeroSlider.css';

const heroImages = [
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=80',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2000&q=80',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=80',
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=2000&q=80'
];

const HeroSlider = () => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        fade: true,
        arrows: false,
        pauseOnHover: false
    };

    return (
        <div className="hero-slider-container">
            <Slider {...settings}>
                {heroImages.map((img, index) => (
                    <div key={index} className="hero-slide">
                        <div
                            className="hero-slide-image"
                            style={{ backgroundImage: `url(${img})` }}
                        />
                        <div className="hero-overlay"></div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default HeroSlider;
