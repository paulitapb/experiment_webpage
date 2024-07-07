import axios from 'axios';
import images from '../data.json';

export async function checkUserExists(hashedCellNumber){
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/checkUser', 
      {},{
        params: {
          userId: hashedCellNumber,
        },
      });

      return (response.data.userExists);
     
    } catch (error) {
      console.error('Error checking user:', error);
      return false;
    }
};


export async function getNewImageToRate(userId){
    const randomIndex = Math.floor(Math.random() * images.length);
    const imgSelected = images[randomIndex];
    const userAlreadyRated = await axios.post('http://127.0.0.1:8000/api/hasRated', {
      params: {
        userId: userId,
        imgId: imgSelected.img,
        group: imgSelected.group,
        imgGeneratedBy: imgSelected.imgGeneratedBy,
        promptUsed: imgSelected.promptUsed
      }
    });
    if (userAlreadyRated.data.hasRated){
      return getNewImageToRate(userId);
    }
    return randomIndex;
};

export async function getSerieNumber(userId){
  try {
    const response = await axios.post('http://127.0.0.1:8000/api/getCurrentSerie', 
    {userId: userId});
    return response.data;
  } catch (error) {
    console.error('Error getting serie number:', error);
    return false;
  }
}