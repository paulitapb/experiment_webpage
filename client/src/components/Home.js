import './home.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import React,  { useState } from 'react';
import crypto from 'crypto-browserify';

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
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const cellNumber = event.target.value;

    const cellNumberPattern = /^[0-9]{10}$/;
    const isValidCellNumber = cellNumberPattern.test(cellNumber);
    
    if (isValidCellNumber) {
      const hash = crypto.createHash('sha256');
      hash.update(cellNumber);
      const hashedCellNumber = hash.digest('hex');
      setUserId(hashedCellNumber);
    } else {
      console.error('Invalid cell number');
      alert('Numero de telefono invalido');
    }
  };

  
  const handleCheckUser = async () => {
    try {
      const response = await axios.get(`https://experiment-webpage-server.vercel.app/api/checkUser/${userId}`);
      const { userExists } = response.data;
      console.log(userExists);
      return (userExists !== null);
     
    } catch (error) {
      console.error('Error checking user:', error);
      return false;
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const userExists = await handleCheckUser();
    
    if (userExists) {
      console.log('User already exists');
      alert('Usuario ya registrado!')
    } else {
      console.log('Add new user: User does not exist');
      try {
        const response = await axios.post('https://experiment-webpage-server.vercel.app/api/addUser', {
           userId
         });
         navigate(`/experiment/${userId}`)
       } catch (error) {
         console.error('Error submitting data:', error);
       }
    }
  };

  return (
    <div>
      <div className='SubSubHeader'>Ingresa tu telefono celular</div>
      <div className='Center'> Solo guardaremos este dato modificado como identificador</div>
      <div className='Center'>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={userId}
          onChange={handleInputChange}
          placeholder="Ingresa tu telefono"
          className='Input'
        />
        
        <button type="submit" className='SubmitButton'>Ingresar</button>
      </form>
      </div>
    </div>
  );
}







