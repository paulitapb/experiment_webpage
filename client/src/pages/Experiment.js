import {useRef, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

import './experiment.css'
import images from '../data.json';

import NextButton from '../components/NextButton.js';
import FiveStarsRating from '../components/StarRating';
import { getNewImageToRate, getSerieNumber } from '../utils/dbInteractionFunctions.js';
import series from '../id_images_series_piloto.json';

const imgAmountToRate = 5;

function ExperimentCompareImages() {

  const navigate = useNavigate();
  const location = useLocation();
  const { userId } = location.state;

  const fiveStarsRatingRef = useRef(null);
  
  const [amountOfImagesRated, setAmountOfImagesRated] = useState(0);
  const [experimentImg, setExperimentImg] = useState(null);
  const [originalImagePath, setOriginalImagePath] = useState(null);
  const [ratingExtraImgs, setRatingExtraImgs] = useState(false);
  
  const [img_index, setImgIndex] = useState(0);

  const [currentSerie, setCurrentSerie] = useState(null);
 
  /* const first_image = images.find(img => img.id === series[currentSerie][img_index]);
  
  console.log('first_image', first_image);
  setExperimentImg(first_image); */
  
  useEffect(() => {
    const fetchCurrentSerie = async () => {
      const serieNumber = await getSerieNumber();
      setCurrentSerie(serieNumber);
    };

    fetchCurrentSerie();
    }, []);


  useEffect(() => {
    if (currentSerie) {
      const image = images.find(img => img.id === series[currentSerie][img_index]);
      setExperimentImg(image);
    }
  } , [currentSerie, img_index]);


  /* useEffect(() => {
    getNewImageToRate(userId).then(index => {
      setExperimentImg(images[index]);
    });
  }, [userId]); */

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
      setAmountOfImagesRated(amountOfImagesRated + 1);
      console.log('Rating added successfully!');
      fiveStarsRatingRef.current.reset();
      
      setExperimentImg(null);
      setOriginalImagePath(null);
      
      /* getNewImageToRate(userId).then(index => {
        setExperimentImg(images[index]);
      }); */
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
    /* if(amountOfImagesRated === imgAmountToRate){
      setRatingExtraImgs(true);
    }  */
  }

  const handleExitClick = async () => {
    if (fiveStarsRatingRef.current.currentRating() === 0) {
      alert('Ingresa una calificación antes de salir del experimento');
      return;
    }
    submitRating();
    navigate('/thank-you');
  }

  return (
    <>
        <div className='SubHeader'>
            ¿Cuán parecidas te parecen estas imagenes? 
        </div>
        <div className='Center'> <i>(1 es poco parecidas y 5 muy parecidas)</i> </div>

        <div className='outer-container'>
            <div className='image-container-exp'>
                <h4>Imagen original</h4> 
                
                  {!originalImagePath ? (
                    <div className="loader" style={{ height: '50px', width: '50px' }}>
                      
                    </div>
                  ):(
                    <img 
                    src={process.env.PUBLIC_URL + originalImagePath} 
                    alt=''/>)
                  }
            </div>
            <div className='image-container-exp'>
                <h4>Imagen generada</h4> 
                {!experimentImg ? (
                  <div className="loader" style={{ height: '50px', width: '50px' }}></div>
                ):(
                  <img 
                  src={process.env.PUBLIC_URL + experimentImg.dir} 
                  alt=''
              />
                )}
                
            </div>
      </div>
      
      <div className='rating-container'>
        <FiveStarsRating ref={fiveStarsRatingRef} />
        <NextButton handleOnClick={handleNextClick}/>
        {ratingExtraImgs && (
          <button onClick={handleExitClick} className='SubmitButton'>Salir del experimento</button>
        )}
      </div>
    </>
  );
}

export default ExperimentCompareImages;