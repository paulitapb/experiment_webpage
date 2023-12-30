import {useRef, useState } from 'react';
import { originalImagesList,  sd_english_captions} from '../data';
import FiveStarsRating from './StarRating';
import './experiment.css'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export default function ExperimentCompareImages() {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const fiveStarsRatingRef = useRef(null);
  const { userId } = useParams();
  console.log('Experiment Page - User ID:', userId);

  let sd_english_captions_img = sd_english_captions[index]; 
  let originalImage = originalImagesList[sd_english_captions_img.group-1][sd_english_captions_img.img-1];

  const handleNextClick = async () => {
    if(index + 1  === sd_english_captions.length){
      navigate('/thank-you');
    }else{
      setIndex(index+1);
      if (fiveStarsRatingRef) {
      try {
        const response = await axios.post('/api/addRating', {
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
        <h2>
            ¿Cuán parecidas te parecen estas imagenes? <i>(1 es poco parecidas y 5 muy parecidas)</i>
        </h2>
        <h3>  
            ({index + 1} of {originalImagesList.length})
        </h3>
        <div className='image-container'>
            <div>
                <h4>Imagen original</h4> 
                    <img 
                        src={process.env.PUBLIC_URL + originalImage.dir} 
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
        <button onClick={handleNextClick}>
            Next
        </button>
      </div>
    </>
  );
}
