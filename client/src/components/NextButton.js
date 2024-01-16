import { faL } from '@fortawesome/free-solid-svg-icons';
import '../pages/experiment.css';
import { useState } from 'react';


const NextButton = (handleOnClick) => {
    const isLoading = false;

    const handleClick = async () => {
        isLoading = true;
        await handleOnClick();
        isLoading = false;
    };
        return(
                <div className='button-container'>
                {isLoading ? (
                            <div className="loader"></div>
                        ) : (
                            <button className='SubmitButton' onClick={handleClick}> Siguiente </button>
                        )}
                </div>        
        )
}; 

export default NextButton;
