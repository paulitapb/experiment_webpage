import {useRef, useState, useEffect } from 'react';
import {sd_english_captions} from '../data';
import FiveStarsRating from './StarRating';
import './experiment.css'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export default function ExperimentCompareImages() {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const fiveStarsRatingRef = useRef(null);
  const { userId } = useParams();

  const shuffleArray = (array) => {
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
  }, []);

  let sd_english_captions_img = sd_english_captions[index]; 
  let originalImagePath = "../images/img_original/img" + String.toString(sd_english_captions_img.group) + String.toString(sd_english_captions_img.img-1) + ".png";

  const handleNextClick = async () => {
    if(index + 1  === sd_english_captions.length){
      navigate('/thank-you');
    }else{
      setIndex(index+1);
      if (fiveStarsRatingRef) {
      try {
        const response = await axios.post('https://experiment-webpage-server.vercel.app/api/addRating', {
          userId: userId,
          imgId: sd_english_captions_img.img, 
          imgGroup: sd_english_captions_img.group,
          imgGeneratedBy: 'SD-english-captions', 
          promptUsed: 7, 
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
                    src={process.env.PUBLIC_URL + sd_english_captions_img.dir} 
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
