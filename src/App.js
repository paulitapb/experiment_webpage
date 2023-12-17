import './App.css';
import FiveStarsRating from './StarRating';
import ExperimentImages from './Experiment';
import React,  { useState } from 'react';

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
        <ExperimentImages />
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





