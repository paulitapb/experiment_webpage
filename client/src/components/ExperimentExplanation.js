import '../pages/home.css';

import experimentDiagram from '../assets/expDiagram2.png';

function ExperimentExplanation(){
    return (
      <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column',}}>
        <p className='experiment-explanation'>
          En un experimento anterior le mostramos a distintas personas imágenes y les pedimos que las describieran en texto. Luego otras personas generaron imágenes a partir de las descripciones y se evaluó cuán parecidas eran esas imágenes a las originales. Ahora le dimos estas descripciones a distintas Inteligencias Artificiales y queremos evaluar cuán bien salió ese proceso.
        </p>
        <div className='image-container-home'>
          <img src={experimentDiagram}  alt="Diagrama del experimento" ></img>
        </div>
        <p className='Center'>
          Podes realizar este experimento desde cualquier dispositivo y te llevará 15 minutos completarlo.
        </p>
      </div>
    );
  }; 

export default ExperimentExplanation;