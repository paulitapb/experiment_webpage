
import '../pages/experiment.css';
import React, { useState, useRef, useEffect } from 'react';


const NextButton = ({isLoadingRef, isLoading, handleOnClick}) => {
    

    const handleClick = async () => {
        if (isLoadingRef.current) return;
        try {
            await handleOnClick();
        } catch (error) {
            console.error(error);
        }
    };
        return(
                <div className='button-container'>
                {isLoading ? (
                            <div className='loader'></div>
                        ) : (
                            <button className='SubmitButton' onClick={handleClick}> Siguiente imagen </button>
                        )}
                </div>        
        )
}; 

export default NextButton;
