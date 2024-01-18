import './home.css';
import ExperimentExplanation from '../components/ExperimentExplanation.js';
import CellPhoneLogin from '../components/CellPhoneLogin.js';

export default function Home() {

  return (
    <div>
      <Header/>
      <SubHeader/>
      <ExperimentExplanation/>
      <CellPhoneLogin/>
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










