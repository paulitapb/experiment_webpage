import { faL } from '@fortawesome/free-solid-svg-icons';
import '../pages/experiment.css';
import { useState } from 'react';


const NextButton = ({handleOnClick}) => {
    const isLoading = useState(false);

    const handleClick = async () => {
        setIsLoading(true);
        try {
            await handleOnClick();
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
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
