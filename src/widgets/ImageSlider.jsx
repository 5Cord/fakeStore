import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // импорт стилей
import cl from "../App.module.css"

const ImageSlider = () => {
    return (
        <div className={cl.containerCarousel}>
            <Carousel
                showArrows={true}
                showThumbs={false}
                infiniteLoop={true}
                autoPlay={true}
                interval={3000}
                transitionTime={500}
                emulateTouch={true}
                showStatus={false} /* убираем индикатор статуса, если не нужен */
                stopOnHover={false} /* продолжение автопрокрутки даже при наведении */
            >
                <div>
                    <img src="https://boiling-machine.ru/wp-content/uploads/cs-2-silver-desktop-2560x800-1.webp" alt="Image 1" />
                </div>
                <div>
                    <img src="https://boiling-machine.ru/wp-content/uploads/silver-desktop-banner-1-1.webp" alt="Image 2" />
                </div>
            </Carousel>
        </div>
    );
}

export default ImageSlider;
