
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import React,  { useState } from 'react';
import { SHA256 } from 'crypto-js';

import '../pages/home.css'; 
import { checkUserExists } from '../utils/dbInteractionFunctions.js';

function CellPhoneLogin() {
    const navigate = useNavigate();

    const [cellPhoneInput, setUserId] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    const handleInputChange = (event) => {
      setUserId(event.target.value);
    };
    
    const handleSubmit = async (e) => {
      e.preventDefault();
      setIsLoading(true);
      
      const timestamp = new Date().getTime(); 

      const cellNumberPattern = /^[0-9]{10}$/;
      const isValidCellNumber = cellNumberPattern.test(cellPhoneInput);
      const hashedCellNumber = SHA256(cellPhoneInput).toString();
      
      if (!isValidCellNumber) {
        console.error('Invalid cell number');
        alert("El numero de telefono ingresado no es valido. El número ingresado debe tener 10 dígitos. Por favor, intenta de nuevo.")
        setUserId('')
        setIsLoading(false);
        return;
      }
      
      const userExists = await checkUserExists(hashedCellNumber);
      
      if (userExists) {
        console.log('User already exists');
        alert("Bienvenidx nuevamente!")
        navigate('/experiment', {state: {userId: hashedCellNumber}} );
        alert('Ya completaste el experimento! Gracias por tu participación!')

      }else{ 
        console.log('Add new user: User does not exist');
        navigate('/tutorial', {state: {userId: hashedCellNumber}});

        try {
          
          await axios.post('http://127.0.0.1:8000/api/addUser', {
            userId: hashedCellNumber, 
            loginTime: timestamp
          });
          navigate('/tutorial', {state: {userId: hashedCellNumber}})
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
            value={cellPhoneInput}
            onChange={handleInputChange}
            placeholder="Ingresa tu telefono"
            className='Input'
          />
          <div className='button-container' style={{ marginTop: '8px' }}>
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

export default CellPhoneLogin;


