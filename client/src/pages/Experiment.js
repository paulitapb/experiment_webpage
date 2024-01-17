import {useRef, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import FiveStarsRating from '../components/StarRating';
import './experiment.css'
import images from '../data.json';
import NextButton from '../components/NextButton.js';

const imgAmountToRate = 5;

const getNewImageToRate = async (userId) => {
  const randomIndex = Math.floor(Math.random() * images.length);
  const imgSelected = images[randomIndex];
  const userAlreadyRated = await axios.post('https://experiment-webpage-server.vercel.app/api/hasRated', {
    params: {
      userId: userId,
      imgId: imgSelected.img,
      group: imgSelected.group,
      imgGeneratedBy: imgSelected.imgGeneratedBy,
      promptUsed: imgSelected.promptUsed
    }
  });
  if (userAlreadyRated.data.hasRated){
    return getNewImageToRate(userId);
  }
  return randomIndex;
}


function ExperimentCompareImages() {
  const navigate = useNavigate();
  const location = useLocation();
  const fiveStarsRatingRef = useRef(null);
  const { userId } = location.state;
  const [amountOfImagesRated, setAmountOfImagesRated] = useState(0);
  const [experimentImg, setExperimentImg] = useState(null);
  const [originalImagePath, setOriginalImagePath] = useState(null);
  const [ratingExtraImgs, setRatingExtraImgs] = useState(false);

  useEffect(() => {
    getNewImageToRate(userId).then(index => {
      setExperimentImg(images[index]);
    });
  }, [userId]);

  useEffect(() => {
    if (experimentImg) {
      setOriginalImagePath("../images/img_original/img" + experimentImg.group.toString() + experimentImg.img.toString() + ".png");
    }
  }, [experimentImg]);

  const submitRating = async () => {
    try {
      const response = await axios.post('https://experiment-webpage-server.vercel.app/api/addRating', {
        userId: userId,
        imgId: experimentImg.img, 
        imgGroup: experimentImg.group,
        imgGeneratedBy: experimentImg.imgGeneratedBy, 
        promptUsed: experimentImg.promptUsed, 
        rating: fiveStarsRatingRef.current.currentRating()
      });
      setAmountOfImagesRated(amountOfImagesRated + 1);
      console.log('Rating added successfully:', response.data);
      fiveStarsRatingRef.current.reset();
      setExperimentImg(null);
      setOriginalImagePath(null);
      getNewImageToRate(userId).then(index => {
        setExperimentImg(images[index]);
      });

    } catch (error) {
      console.error('Error adding rating:', error);
    }
  };


  const handleNextClick = async () => {
    if (fiveStarsRatingRef) {
      if(fiveStarsRatingRef.current.currentRating() == 0){
        alert('Ingresa una calificación antes de continuar');
        return;
      }
      submitRating();
    }
    if(amountOfImagesRated == imgAmountToRate){
      setRatingExtraImgs(true);
    } 
  }
  const handleExitClick = async () => {
    if (fiveStarsRatingRef.current.currentRating() == 0) {
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