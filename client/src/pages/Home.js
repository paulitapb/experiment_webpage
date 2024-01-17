import './home.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import React,  { useState } from 'react';
import { SHA256 } from 'crypto-js';
import OriginalImagesGrid from '../components/OriginalImagesGrid.js';
import experimentDiagram from '../assets/expDiagram2.png';

export default function Home() {

  return (
    <div>
      <Header/>
      <SubHeader/>
      <ExperimentExplanation/>
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
      En este experimento te pedimos que nos ayudes a entender cuán buenos son los humanos y la Inteligencia Artificial para generar imágenes a partir de descripciones.  
    </div>

  );
}

function ExperimentExplanation(){
  return (
    <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column',}}>
      <p className='experiment-explanation'>
        En un experimento anterior le mostramos a distintas personas imágenes y les pedimos que las describieran en texto. Luego otras personas generaron imágenes a partir de las descripciones y se evaluó cuán parecidas eran esas imágenes a las originales. Ahora le dimos estas descripciones a distintas Inteligencias Artificiales y queremos ver si generan imágenes parecidas a las originales. 
      </p>
      <div className='image-container'>
        <img src={experimentDiagram} alt="Diagrama del experimento"/>
      </div>
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
      return (response.data.userExists);
     
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
      setIsLoading(false);
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
           userId: hashedCellNumber
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
  
      <div className='Center'> Solo guardaremos este dato modificado como identificador.</div>
    </div>
  );
}







