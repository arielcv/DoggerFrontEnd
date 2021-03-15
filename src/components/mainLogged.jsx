import React from 'react';
import {Carousel} from 'react-bootstrap'
import fig1 from '../imgs/car5.jpg'
import fig2 from '../imgs/car2.jpg'
import fig3 from '../imgs/car3.png'
import fig4 from '../imgs/car4.png'
import fig5 from '../imgs/car5.jpg'
import fig6 from '../imgs/car6.jpg'

function MainLogged(props) {
  return (
    <Carousel fade className='carousel-position' interval={1500}>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={fig1}
          alt="First slide"
          width={400}
          height={400}
        />
        <Carousel.Caption>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={fig2}
          alt="Second slide"
          width={400}
          height={400}
        />
        <Carousel.Caption>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={fig3}
          alt="Third slide"
          width={400}
          height={400}
        />

        <Carousel.Caption>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src={fig4}
          alt="Third slide"
          width={400}
          height={400}
        />

        <Carousel.Caption>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src={fig5}
          alt="Third slide"
          width={400}
          height={400}
        />

        <Carousel.Caption>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src={fig6}
          alt="Third slide"
          width={400}
          height={400}
        />

        <Carousel.Caption>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default MainLogged;
