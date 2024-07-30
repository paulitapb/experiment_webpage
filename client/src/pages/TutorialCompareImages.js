import {useRef} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

import WordSelector from '../components/WordSelector.js';

import './experiment.css';


function TutorialCompareImages() {
    const navigate = useNavigate();
    const location = useLocation();
    const { userId } = location.state;
    const wordSelectorRef = useRef(null);
    const exp = {
      "topic": "Tarjeta", 
      "context": "Plata",
      "words": [
        {
          "id":1,
          "word":"Messi"
        },
        {
          "id":2,
          "word":"Scalonetta"
        },
        {
          "id":3,
          "word":"Di Maria"
        },
        {
          "id":4,
          "word":"Mbappe"
        },
        {
          "id":5,
          "word":"Qatar"
        },
        {
          "id":6,
          "word":"Fútbol"
        }
      ]
    }

    const handleGoToExperiment = async () => {
        if(wordSelectorRef != null && wordSelectorRef.current.isFull()){
          const timestamp = new Date().getTime();
        try {
          const response = await axios.post('http://127.0.0.1:8000/api/addTutorialTime', {
            userId: userId,
            tutorialTime: timestamp
          });
        } catch (error) {
          console.error("Error trying to add tutorial time:", error)
        }
        navigate('/experiment', {state: {userId: userId}} );
        }else{
            alert("Por favor, seleccione 3 palabras antes de continuar")
        }
        
    }

    return (
      <div>
          <div className='BlueSubHeader'>
              Fase de prueba
          </div>
          <p className='experiment-explanation'>
          Te vamos a mostrar una palabra que va a estar resaltada en un cierto contexto. 
          </p>
          <p className='experiment-explanation'>
          Necesitamos que selecciones las 3 (tres) que mejor se relacionen con la palabra destacada.
          </p>
          <div className='SubHeader'>
            <p>La <span style={{color: 'red'}}>selección</span> Argentina ganó la final del mundial contra Francia 4-3 por penales.</p>
          </div>

        <div className='rating-container'>
          <div className='inner-star-rating-container'>
            <WordSelector ref={wordSelectorRef}  exp={exp}/>
          </div>
          <div className='inner-button-container'>
            <div className='button-container'>
              <button onClick={handleGoToExperiment} className='SubmitButton'>Comenzar con el experimento</button>
            </div>
          </div>
        </div>
      </div>
    );
}

export default TutorialCompareImages;