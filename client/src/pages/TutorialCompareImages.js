import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import FiveStarsRating from '../components/StarRating.js';

import './experiment.css';


function TutorialCompareImages() {
    const navigate = useNavigate();
    const location = useLocation();
    const { userId } = location.state;

    const handleGoToExperiment = () => {
        navigate('/experiment', {state: {userId: userId}} );
    }

  return (
    <div>
        <div className='BlueSubHeader'>
            Fase de prueba
        </div>
        <p className='experiment-explanation'>Te vamos a mostrar dos imágenes. La primera es alguna de las imágenes que les mostramos a las personas para que las describan. La segunda imágen fue generada por una Inteligencia Artificial u otro humano a partir de una descripción. Necesitamos que compares las imágenes y nos indiques cuán parecidas son. Para esto usamos un sistema de estrellitas donde 1 estrella es la menor puntuación y 5 estrellas la máxima.Te vamos a mostrar dos imágenes. La primera es alguna de las imágenes que les mostramos a los sujetos para que las describan. La segunda imágen fue generada por una Inteligencia Artificial u otro humano a partir de una descripción. Necesitamos que compares las imágenes y nos indiques cuán parecidas son. Para esto usamos un sistema de estrellitas donde 1 estrella es la menor puntuación y 5 estrellas la máxima. 
        </p>
      <div className='SubHeader'>
            ¿Cuán parecidas te parecen estas imagenes? 
        </div>
        <div className='Center'> <i>(1 es poco parecidas y 5 muy parecidas)</i> </div>

        <div className='outer-container'>
            <div className='image-container-exp'>
                <h4>Imagen original</h4> 
                    <img 
                    src={process.env.PUBLIC_URL + "../images/img_original/img44.jpg"} 
                    alt=''/>
                  
            </div>
            <div className='image-container-exp'>
                <h4>Imagen generada</h4> 
                
                  <img 
                  src={process.env.PUBLIC_URL + "../images/DeMolenRembrandt.jpg"} 
                  alt=''></img>
                
            </div>
      </div>
      
      <div className='rating-container'>
        <FiveStarsRating/>
        <button onClick={handleGoToExperiment} className='SubmitButton'>Comenzar con el experimento</button>
      </div>
    </div>
  );
}

export default TutorialCompareImages;