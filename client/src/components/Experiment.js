import {useRef, useState, useEffect } from 'react';
import FiveStarsRating from './StarRating';
import './experiment.css'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import images from '../data.json';


export default function ExperimentCompareImages() {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const fiveStarsRatingRef = useRef(null);
  const { userId } = useParams();

  /* const shuffleArray = (array) => {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }
  const [shuffledCaptions, setShuffledCaptions] = useState([]);

  useEffect(() => {
    setShuffledCaptions(shuffleArray([...sd_english_captions]));
  }, []); */

  let experimentImg = images.filter((img) => img.id === index)[0];

  let originalImagePath = "../images/img_original/img" + experimentImg.group.toString() + experimentImg.img.toString() + ".png";

  console.log('original img: ', process.env.PUBLIC_URL + originalImagePath);
  
  const handleNextClick = async () => {
    if(index + 1  === 10){
      navigate('/thank-you');
    }else{
      setIndex(index+1);
      if (fiveStarsRatingRef) {
      try {
        const response = await axios.post('https://experiment-webpage-server.vercel.app/api/addRating', {
          userId: userId,
          imgId: experimentImg.img, 
          imgGroup: experimentImg.group,
          imgGeneratedBy:experimentImg.generatedBy, 
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
