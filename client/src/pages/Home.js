import './home.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import React,  { useState } from 'react';
import { SHA256 } from 'crypto-js';

export default function Home() {

  //TODO:  add Texto experimento
  //TODO: agregar una fase de prueba 
  return (
    <div>
      <Header/>
      <SubHeader/>
      <GetCellPhoneFromUser/>
    </div>
  );
}

function Header(){
  return (
    <div className="Header">
      <h1> Humanos vs. IA Generativa </h1>
    </div>

  );
}

function SubHeader(){
  return (
    <div className="SubHeader">
      Explicacion del exp y condiciones para participar  
      -- Explicar que el tel es un user para volver 
    </div>

  );
}

function GetCellPhoneFromUser() {

  const [userId, setUserId] = useState('');
  const [hashedUserId, sethashedUserId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setUserId(event.target.value);
    
  };
  const handleCheckUser = async (hashedCellNumber) => {
    try {
      const response = await axios.post('https://experiment-webpage-server.vercel.app/api/checkUser', 
      {
        userId: hashedCellNumber,
      });
      return (userExists.data.userExists);
     
    } catch (error) {
      console.error('Error checking user:', error);
      return false;
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const cellNumberPattern = /^[0-9]{10}$/;
    const isValidCellNumber = cellNumberPattern.test(userId);
    const hashedCellNumber = SHA256(userId).toString();
    
    sethashedUserId(hashedCellNumber);
    
    if (!isValidCellNumber) {
      console.error('Invalid cell number');
      alert("El numero de telefono ingresado no es valido")
      setUserId('')
      return;
    }

    const userExists = await handleCheckUser(hashedCellNumber);
    
    if (userExists) {
      console.log('User already exists');
      alert("Bienvenidx nuevamente!")
      navigate('/experiment', {state: {userId: hashedCellNumber}} );
    }else{ 
      console.log('Add new user: User does not exist');
      try {
        const response = await axios.post('https://experiment-webpage-server.vercel.app/api/addUser', {
           userId: hashedUserId
         });
         navigate('/experiment', {state: {userId: hashedCellNumber}})
       } catch (error) {
         console.error('Error submitting data:', error);
       }
    }
    setIsLoading(false);
  };

  return (
    <div>
      <div className='SubSubHeader'>Ingresa tu telefono celular</div>
      <div className='Center'> Solo guardaremos este dato modificado como identificador</div>
      <div className='Center'>
      <form onSubmit={handleSubmit} className='input-button-container'>
        <input
          type="text"
          value={userId}
          onChange={handleInputChange}
          placeholder="Ingresa tu telefono"
          className='Input'
        />
        <div className='button-container'>
        {isLoading ? (
              <div className="loader"></div>
            ) : (
              <button type="submit" className='SubmitButton'>Ingresar</button>
            )}
        </div>        
      </form>
      </div>
    </div>
  );
}







