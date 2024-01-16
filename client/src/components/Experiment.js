import {useRef, useState, useEffect } from 'react';
import FiveStarsRating from './StarRating';
import './experiment.css'
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import images from '../data.json';

const imgAmountToRate = 5;

const generateRandomIndices = async (userId) => {
  //TODO: add check that theres no a rating with this id in the DB
  const randomIndices = new Set();
  while (randomIndices.size < imgAmountToRate) {
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
    if (!userAlreadyRated.data.hasRated){
      randomIndices.add(randomIndex);
    }
    
  }
  return Array.from(randomIndices);
}


function ExperimentCompareImages() {
  const navigate = useNavigate();
  const location = useLocation();
  const [index, setIndex] = useState(0);
  const fiveStarsRatingRef = useRef(null);
  const { userId } = location.state;
  
  const [indicesImagesToRate, setIndicesImagesToRate] = useState([]);
  const [experimentImg, setExperimentImg] = useState(null);
  const [originalImagePath, setOriginalImagePath] = useState(null);

  
  useEffect(() => {
    generateRandomIndices(userId).then(indices => {
      setIndicesImagesToRate(indices);
      setExperimentImg(images[indices[index]]);
    });
  }, [userId, index]);

  useEffect(() => {
    if (indicesImagesToRate.length > 0) {
      setExperimentImg(images[indicesImagesToRate[index]]);
      if (experimentImg) {
        setExperimentImg(experimentImg);
      }
    }
  }, [index, indicesImagesToRate]);

  useEffect(() => {
    if (experimentImg) {
      setOriginalImagePath("../images/img_original/img" + experimentImg.group.toString() + experimentImg.img.toString() + ".png");
    }
  }, [experimentImg]);

  
  const handleNextClick = async () => {
    if(index + 1  === imgAmountToRate){
      navigate('/thank-you');
    }else{
      setIndex(index+1);
      if (fiveStarsRatingRef) {
      try {
        console.log("user " + userId)
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

        <div className='outer-container'>
            <div className='image-container-exp'>
                <h4>Imagen original</h4> 
                {console.log("original path" +originalImagePath)}
                  {!originalImagePath ? (
                    <div className="loader2" style={{ height: '50px', width: '50px' }}>
                      
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
                  <div className="loader2" style={{ height: '50px', width: '50px' }}></div>
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
        <button onClick={handleNextClick} className='SubmitButton'>
            Next
        </button>
      </div>
    </>
  );
}

export default ExperimentCompareImages;