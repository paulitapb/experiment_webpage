import { useState } from 'react';
import { originalImagesList } from '../data';
import FiveStarsRating from './StarRating';
import './experiment.css'

export default function ExperimentCompareImages() {
  const [index, setIndex] = useState(0);
  const [nextImage, setNextImage] = useState(false); // TODO: check image list lenght

  function handleNextClick() {
    setIndex(index + 1);
  }


  let originalImage = originalImagesList[index];
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
                    src={process.env.PUBLIC_URL + originalImage.dir} 
                    alt=''
                />
            </div>
      </div>
      <div className='rating-container'>
        <FiveStarsRating />
        <button onClick={handleNextClick}>
            Next
        </button>
      </div>
    </>
  );
}
