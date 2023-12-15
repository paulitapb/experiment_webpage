import './App.css';
import React,  { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons'

export default function App() {

  //TODO  add Texto experimento
  return (
    <div>
      <Header/>
      <SubHeader/>
      <GetCellPhoneFromUser />
      <StartExperimentButton />
      
      <div>
        <FiveStarsRating />
      </div>
    </div>

  );
}

function Header(){
  return (
    <div className="Header">
      <h1> Experimento </h1>
    </div>

  );
}

function SubHeader(){
  return (
    <div >
      Explicacion del exp y condiciones para participar  
    </div>

  );
}

function StartExperimentButton() {
  const handleClick = () => {
    alert('Va a arrancar el experimento!!');
  };

  return (
    <div style={{textAlign : 'center'}}>
      <button className= "buttonStyle" onClick={handleClick}>Comenzar</button> {/* Add onClick event with the function to handle button click */}
    </div>
  );
}

function GetCellPhoneFromUser() {

  //TODO: chequear en la base de datos que el telefono no este y parsearlo para que sea valido
  const [inputValue, setInputValue] = useState('');
  const handleInputChange = (event) => {
    setInputValue(event.target.value); 
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    console.log('Submitted data:', inputValue);
  };

  return (
    <div>
      <h1>Ingresa tu telefono antes de comenzar</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Ingresa tu telefono"
        />
        <button type="submit">Ingresar</button>
      </form>
    </div>
  );
}

function RateTwoImg(){
  return(
    <div>
      <section>
        <Image />
        <Image />
      </section>
      
    </div>
  )
}

function Image(){
  return(
    <img className='image-style'
      src="https://i.imgur.com/MK3eW3As.jpg"
      alt="Katherine Johnson"
    />
  )
}


function FiveStarsRating(){

  function handleRatingClick(){

  }
  return(
    <section>
      <Star onClick={() => handleRatingClick(i)} />

    </section>
    )
}


function Star({isYellow, onClick}){
  
  
  const handleRatingClick = () => {
    setIsYellow(!isYellow);
  };

  return(
    <section>
      <FontAwesomeIcon icon={faStar} style={ { color: ${isYellow ? 'yellow' : 'gray'}, height: "40px"}} />
    </section>
  )
}

