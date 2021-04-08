import React from 'react'
const CarouselPage = ({ title, description}) => {
  return (
 
            <div id="carouselExampleFade" className="carousel slide carousel-fade" data-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img className="d-block w-100" src="https://fr.freepik.com/vecteurs-libre/contexte-sante-symboles-medicaux-dans-cadre-hexagonal_9191758.html#page=1&query=medical&position=0" alt="First slide"/>
                    </div>
                    <div className="carousel-item">
                        <img className="d-block w-100" src="https://fr.freepik.com/psd-gratuit/marque-boite-pilules-medicale-fond-maquette_9259859.html" alt="Second slide"/>
                    </div>
                    <div className="carousel-item">
                    <img className="d-block w-100" src="https://fr.freepik.com/photos-gratuite/vue-face-chimiste-masculin-costume-medical-blanc-assis-solutions-dansant-fond-blanc-virus-laboratoire-covid-maladie-science_13463939.html#page=1&query=medical&position=35" alt="Third slide"/>
                    </div>
                </div>
                <a className="carousel-control-prev" href="#carouselExampleFade" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true">{title}</span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#carouselExampleFade" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true">{description}</span>
                    <span className="sr-only">Next</span>
                </a>
            </div>

  );
}

export default CarouselPage;