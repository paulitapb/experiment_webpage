import './home.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import React,  { useState } from 'react';

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

function GetCellPhoneFromUser() {

  //TODO: parsear tel para que sea valido
  // si cambia el userId sacar el registeredID 
  // hacer que no puedan llenar la base con users 
  const [userId, setUserId] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setUserId(event.target.value);
  };

  
  /* const [imgId, setImgId] = useState(4);
  const [imgGroup, setImgGroup] = useState(1);
  const [imgGeneratedBy, setImgGeneratedBy] = useState('SD');
  const [promptUsed, setPromptUsed] = useState(100);
  const [rating, setRating] = useState(1); */
  
  const handleCheckUser = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/checkUser/${userId}`);
      const { userExists } = response.data;
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
        const response = await axios.post('http://localhost:5000/api/addUser', {
           userId
         });
         navigate('/experiment')
       } catch (error) {
         console.error('Error submitting data:', error);
       }
    }
  };

  return (
    <div>
      <h1>Ingresa tu telefono antes de comenzar</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={userId}
          onChange={handleInputChange}
          placeholder="Ingresa tu telefono"
        />
        <button type="submit">Ingresar</button>
      </form>
    </div>
  );
}







