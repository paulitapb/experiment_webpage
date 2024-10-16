
import '../pages/experiment.css';
import React, { useState, useRef, useEffect } from 'react';


const NextButton = ({handleOnClick}) => {
    const [isLoading, setIsLoading] = useState(false);
    const isLoadingRef = useRef(isLoading);
    
    useEffect(() => {
        isLoadingRef.current = isLoading;
    }, [isLoading]);

    const handleClick = async () => {
        isLoadingRef.current = true;
        setIsLoading(true);
        try {
            await handleOnClick();
        } catch (error) {
            console.error(error);
        } finally {
            isLoadingRef.current = false;
            setIsLoading(false);
        }
    };
        return(
                <div className='button-container'>
                {isLoadingRef.current ? (
                            <div className='loader'></div>
                        ) : (
                            <button className='SubmitButton' onClick={handleClick}> Siguiente imagen </button>
                        )}
                </div>        
        )
}; 

export default NextButton;
