import {useRef, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';


import './experiment.css'
import images from '../data.json';

import NextButton from '../components/NextButton.js';
import FiveStarsRating from '../components/StarRating';
import {getSerieNumber } from '../utils/dbInteractionFunctions.js';
import series from '../id_images_series_piloto.json';

function ProgressBar({ value, max }) {
  const percentage = (value / max) * 100;
  return (
    <div className="progress-bar-container">
      <progress value={value} max={max}></progress>
      <span className="progress-bar-text">{`${percentage.toFixed(0)}%`}</span>
    </div>

  );
}


function ExperimentCompareImages() {

  const navigate = useNavigate();
  const location = useLocation();
  const { userId } = location.state;

  const fiveStarsRatingRef = useRef(null);
  
  const [experimentImg, setExperimentImg] = useState(null);
  const [originalImagePath, setOriginalImagePath] = useState(null);
  
  const [img_index, setImgIndex] = useState(parseInt(localStorage.getItem('imgIndex')) || 0);
  const [currentSerie, setCurrentSerie] = useState(localStorage.getItem('currentSerie') || null);
  
  const [progress, setProgress] = useState(0);
  const maxProgress = images.length - 1;
  
  useEffect(() => {
    if (currentSerie === null){
      const fetchCurrentSerie = async () => {
        const serieNumber = await getSerieNumber(userId);
        console.log('Serie number:', serieNumber);
        setCurrentSerie(serieNumber);
        localStorage.setItem('currentSerie', serieNumber);
      }
      fetchCurrentSerie();
    };
    }, []);

  // update next image 
  useEffect(() => {
    if (currentSerie !== undefined && series[currentSerie]) {
      const image = images.find(img => img.id === series[currentSerie][img_index]);
      setExperimentImg(image);
      
    }
  } , [currentSerie, img_index]);

  //update original img to match the experiment image  
  useEffect(() => {
    if (experimentImg) {
      setOriginalImagePath("../images/img_original/img" + experimentImg.group.toString() + experimentImg.img.toString() + ".png");
    }
  }, [experimentImg]);


  const submitRating = async (timestamp) => {
    if (!navigator.onLine) {
      alert('No se pudo enviar la calificación. Por favor, revisa tu conexión a internet.');
      return;
    }
    try {
      const response = await axios.post('https://experiment-webpage-server.vercel.app/api/addRating', {
        userId: userId,
        imgGeneratedId: experimentImg.id, 
        imgId: experimentImg.img, 
        imgGroup: experimentImg.group,
        imgGeneratedBy: experimentImg.imgGeneratedBy, 
        promptUsed: experimentImg.promptUsed, 
        rating: fiveStarsRatingRef.current.currentRating(), 
        submitTime: timestamp, 
        lastImageIndexSubmitted: img_index,
      });
      console.log('Rating added successfully!');
      fiveStarsRatingRef.current.reset();
      setProgress(prevProgress => {
        const updatedProgress = prevProgress + 1;
        return updatedProgress > maxProgress ? maxProgress : updatedProgress;
      });

      setExperimentImg(null);
      setOriginalImagePath(null);
      setImgIndex(img_index + 1);
      localStorage.setItem('imgIndex', img_index + 1);
    } catch (error) {
      console.error('Error adding rating:', error);
    }
  };


  const handleNextClick = async () => {
    if (fiveStarsRatingRef) {
      if(fiveStarsRatingRef.current.currentRating() === 0){
        alert('Ingresa una calificación antes de continuar');
        return;
      }
      const timestamp = new Date().getTime();
      submitRating(timestamp);

    }
  }

  const handleExitClick = async () => {
    if (fiveStarsRatingRef.current.currentRating() === 0) {
      alert('Ingresa una calificación antes de salir del experimento');
      return;
    }
    const timestamp = new Date().getTime();
    submitRating(timestamp);
    navigate('/thank-you');
  }

  
  return (
    <div>
        <div className='SubHeader'>
          Suponiendo que la imagen de la derecha fue generada con una descripción la imagen de la izquierda
          ¿Cuán bien te parece que salió el proceso?
        </div>
        <div className='Center'> <i>(1 es muy mal y 5 muy bien)</i> </div>

        <div className='outer-container'>
            <div className='image-container-exp'>
                <h4>Imagen original</h4> 
                  <div className="image-container">
                  {!originalImagePath ? (
                    <div className="loader" style={{ height: '50px', width: '50px' }}>
                    </div>
                  ):(
                    <img 
                    src={process.env.PUBLIC_URL + originalImagePath} 
                    alt=''/>)
                  }
                  </div>
            </div>
            <div className='image-container-exp'>
                <h4>Imagen generada</h4> 
                <div className="image-container">
                {!experimentImg ? (
                  <div className="loader" style={{ height: '50px', width: '50px' }}></div>
                ):(
                  <img 
                  src={process.env.PUBLIC_URL + experimentImg.dir} 
                  alt=''/> 
                )}
                </div>
            </div>
      </div>
      
      <div className='rating-container'>
        <div className='inner-star-rating-container'>
          <FiveStarsRating ref={fiveStarsRatingRef} />
        </div>
        <div className='inner-button-container'>
          {(img_index < images.length-1) ? (
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