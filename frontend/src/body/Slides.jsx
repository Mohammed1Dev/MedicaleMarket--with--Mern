import React from 'react'


const slide1 = require('./../icons/slide1.jpg')
const slide2 = require('./../icons/slide2.png')
const slide3 = require('./../icons/slide3.jpg')
const CarouselPage = ({ title, description}) => {
  return (
 
            <div id="carouselExampleFade" className="carousel slide carousel-fade mt-5" data-ride="carousel">
                <ol class="carousel-indicators">
                    <li data-target="#carouselExampleFade" data-slide-to="0" class="active"></li>
                    <li data-target="#carouselExampleFade" data-slide-to="1"></li>
                    <li data-target="#carouselExampleFade" data-slide-to="2"></li>
                </ol>
                <div className="carousel-inner">
                    <div className="carousel-item ">
                        <img style={{width: '100%', height: '500px'}} className="d-block w-40" src={slide1.default} alt="First slide"/>
                    </div>
                    <div className="carousel-item">
                        <img style={{width: '100%', height: '500px'}} className="d-block w-40" src={slide2.default} alt="Second slide"/>
                    </div>
                    <div className="carousel-item active">
                    <img style={{width: '100%', height: '500px'}} className="d-block w-40" src={slide3.default} alt="Third slide"/>
                    </div>
                </div>
                <a className="carousel-control-prev" href="#carouselExampleFade" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#carouselExampleFade" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </a>
            </div>

  );
}

export default CarouselPage;