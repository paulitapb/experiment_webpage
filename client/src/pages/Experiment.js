import {useRef, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

import './experiment.css'
import images from '../data.json';

import NextButton from '../components/NextButton.js';
import FiveStarsRating from '../components/StarRating';
import {getSerieNumber } from '../utils/dbInteractionFunctions.js';
import series from '../id_images_series_piloto.json';



function ExperimentCompareImages() {

  const navigate = useNavigate();
  const location = useLocation();
  const { userId } = location.state;

  const fiveStarsRatingRef = useRef(null);
  
  const [experimentImg, setExperimentImg] = useState(null);
  const [originalImagePath, setOriginalImagePath] = useState(null);
  
  const [img_index, setImgIndex] = useState(0);
  const [currentSerie, setCurrentSerie] = useState(null);
  
  
  useEffect(() => {
    const fetchCurrentSerie = async () => {
      const serieNumber = await getSerieNumber();
      setCurrentSerie(serieNumber);
    };

    fetchCurrentSerie();
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
    try {
      const response = await axios.post('https://experiment-webpage-server.vercel.app/api/addRating', {
        userId: userId,
        imgId: experimentImg.img, 
        imgGroup: experimentImg.group,
        imgGeneratedBy: experimentImg.imgGeneratedBy, 
        promptUsed: experimentImg.promptUsed, 
        rating: fiveStarsRatingRef.current.currentRating(), 
        submitTime: timestamp
      });
      console.log('Rating added successfully!');
      fiveStarsRatingRef.current.reset();
      
      setExperimentImg(null);
      setOriginalImagePath(null);
      setImgIndex(img_index + 1);

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
          Suponiendo que la imágen de la derecha fue generada con una descripción la imágen original ¿Cuán bien te parece que salió el proceso?
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
    </div>
  );
}

export default ExperimentCompareImages;