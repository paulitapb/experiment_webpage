import '../pages/experiment.css';

const NextButton = (handleOnClick) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = async () => {
        setIsLoading(true);
        await handleOnClick();
        setIsLoading(false);
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
}