import axios from 'axios';
import images from '../data.json';

export async function checkUserExists(hashedCellNumber){
    try {
      const response = await axios.post('https://experiment-webpage-server.vercel.app/api/checkUser', 
      {
        userId: hashedCellNumber,
      });
      console.log(response)
      console.log(response.data.userExists);
      return (response.data.userExists);
     
    } catch (error) {
      console.error('Error checking user:', error);
      return false;
    }
};


export async function getNewImageToRate(userId){
    const randomIndex = Math.floor(Math.random() * images.length);
    const imgSelected = images[randomIndex];
    const userAlreadyRated = await axios.post('https://experiment-webpage-server.vercel.app/api/hasRated', {
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
