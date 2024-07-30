// Paula's imports
import {useRef, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

import './experiment.css'

import NextButton from '../components/NextButton.js';

// My imports
import experiments from '../data.json';
import WordSelector from '../components/WordSelector.js';

function ProgressBar({ value, max }) {
  const percentage = Math.min((value / max) * 100, 99);
  
  return (
    <div className="progress-bar-container">
      <progress value={value} max={max}></progress>
      <span className="progress-bar-text">{`${percentage.toFixed(0)}%`}</span>
    </div>

  );
}


function ExperimentCompareImages() {

  // Paula's states
  const navigate = useNavigate();
  const location = useLocation();
  const { userId } = location.state;
    
  const [progress, setProgress] = useState(parseInt(sessionStorage.getItem('progress')) || 1);
  const maxProgress = experiments.length;

  // My states
  const [exp_index, setExperimentIndex] = useState(0);
  const [exp, setExperiment] = useState(experiments[exp_index]);
  const wordSelectorRef = useRef(null);
  

  // Facu

  // update next image 
  useEffect(() => {
    console.log(exp_index)
    setExperiment(experiments[exp_index]);
  } , [exp_index]);

  const submitRating = async (timestamp) => {
    if (!navigator.onLine) {
      alert('No se pudo enviar la calificación. Por favor, revisa tu conexión a internet.');
      return;
    }
    // try {
    //   const response = await axios.post('http://127.0.0.1:8000/api/addRating', {
    //     userId: userId,
    //     imgGeneratedId: experimentImg.id, 
    //     imgId: experimentImg.img, 
    //     imgGroup: experimentImg.group,
    //     imgGeneratedBy: experimentImg.experiment, 
    //     promptUsed: experimentImg.promptUsed, 
    //     rating: fiveStarsRatingRef.current.currentRating(), 
    //     submitTime: timestamp, 
    //     lastImageIndexSubmitted: img_index,
    //   });
    console.log('Rating added successfully!');
    wordSelectorRef.current.reset();
    setProgress(prevProgress => {
      const updatedProgress = prevProgress + 1;
      return updatedProgress > maxProgress ? maxProgress : updatedProgress;
    });
    sessionStorage.setItem('progress', progress);
    setExperimentIndex(exp_index + 1);
    sessionStorage.setItem('exp_index', exp_index + 1); 
    //setExperiment(null);
    // } catch (error) {
    //   console.error('Error adding rating:', error);
    // }
  };


  const handleNextClick = async () => {
    if (wordSelectorRef) {
      // !Repeated Code
      if(!wordSelectorRef.current.isFull()){
        alert('Ingresa una calificación antes de continuar');
        return;
      }
      const timestamp = new Date().getTime();
      submitRating(timestamp);
    }
  }

  const handleExitClick = async () => {
    if(!wordSelectorRef.current.isFull()){
      alert('Ingresa una calificación antes de continuar');
      return;
    }
    const timestamp = new Date().getTime();
    submitRating(timestamp);
    // !Es temporal
    sessionStorage.setItem('progress', 0); 
    navigate('/thank-you');
  }

  
  return (
    <div>
        <div className='SubHeader'>
          Suponiendo que la imagen de la derecha fue generada con una descripción la imagen de la izquierda
          ¿Cuán bien te parece que salió el proceso?
        </div>
        <div className='Center'> <i>(1 es muy mal y 5 muy bien)</i> </div>

      <div className='rating-container'>
        <div className='inner-star-rating-container'>
          <WordSelector ref={wordSelectorRef}  exp={exp}/>
        </div>
        <div className='inner-button-container'>
          {(progress < maxProgress) ? (
            <NextButton handleOnClick={handleNextClick}/>
          ):(<button onClick={handleExitClick} className='SubmitButton'>Salir del experimento</button>)
          }
        </div>
      </div>
      <div className='progress-bar-container'>
        <ProgressBar value={progress} max={maxProgress} className='progress'/>
      </div>
      </div>
    
  );
}

export default ExperimentCompareImages;