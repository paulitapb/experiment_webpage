import {useRef, useState, useEffect } from 'react';
import FiveStarsRating from './StarRating';
import './experiment.css'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import images from '../data.json';

const imgAmountToRate = 5;

function generateRandomIndices() {
  //TODO: add check that theres no a rating with this id in the DB
  const randomIndices = new Set();
  while (randomIndices.size < imgAmountToRate) {
    const randomIndex = Math.floor(Math.random() * images.length);
    randomIndices.add(randomIndex);
  }
  return Array.from(randomIndices);
}

const indicesImagesToRate = generateRandomIndices();

export default function ExperimentCompareImages() {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const fiveStarsRatingRef = useRef(null);
  const { userId } = useParams();
  
  
  const [experimentImg, setExperimentImg] = useState(images[indicesImagesToRate[index]]);

  let originalImagePath = "../images/img_original/img" + experimentImg.group.toString() + experimentImg.img.toString() + ".png";

  useEffect(() => {
    setExperimentImg(images[indicesImagesToRate[index]]);
  }, [index]);
  
  const handleNextClick = async () => {
    if(index + 1  === imgAmountToRate){
      navigate('/thank-you');
    }else{
      setIndex(index+1);
      if (fiveStarsRatingRef) {
      try {
        
        const response = await axios.post('https://experiment-webpage-server.vercel.app/api/addRating', {
          userId: userId,
          imgId: experimentImg.img, 
          imgGroup: experimentImg.group,
          imgGeneratedBy: experimentImg.imgGeneratedBy, 
          promptUsed: experimentImg.promptUsed, 
          rating: fiveStarsRatingRef.current.currentRating()
        });
  
        console.log('Rating added successfully:', response.data);
        fiveStarsRatingRef.current.reset();
      } catch (error) {
        console.error('Error adding rating:', error);
      }
    }
    }
 
  }

  
  return (
    <>
        <div className='SubHeader'>
            ¿Cuán parecidas te parecen estas imagenes? 
        </div>
        <div className='Center'> <i>(1 es poco parecidas y 5 muy parecidas)</i> </div>

        <div className='image-container'>
            <div>
                <h4>Imagen original</h4> 
                    <img 
                        src={process.env.PUBLIC_URL + originalImagePath} 
                        alt=''
                    />
            </div>
            <div>
                <h4>Imagen generada</h4> 
                <img 
                    src={process.env.PUBLIC_URL + experimentImg.dir} 
                    alt=''
                />
            </div>
      </div>
      <div className='rating-container'>
        <FiveStarsRating ref={fiveStarsRatingRef} />
        <button onClick={handleNextClick} className='SubmitButton'>
            Next
        </button>
      </div>
    </>
  );
}
