import './App.css';
import { ResponsiveAppBar } from './Elements/App-Bar/AppBar';
import { BrowserRouter as Router } from 'react-router-dom';
import { RutasPrincipales } from './routes/RutasPrincipales';
import { AlertasContext } from './Elements/Context/ContextModoDark';
import { useContext, useState } from 'react';
import { LoginBase } from './Login/LoginBase';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const App = () => {

  const [entrar_aplicacion, set_entrar_aplicacion] = useState<boolean>(false);
  const { modo_dark_numero } = useContext(AlertasContext);

  // Establece el fondo en función del valor de modo_dark_numero
  const appStyle = {
    backgroundColor: modo_dark_numero,
    minHeight: '100vh',
  };


 

  return (
    <div className="App" style={appStyle}>
      {entrar_aplicacion === false && (
        <LoginBase set_entrar_aplicacion={set_entrar_aplicacion} />
      )}


      {entrar_aplicacion && (
        <Router>
          <ResponsiveAppBar set_entrar_aplicacion={set_entrar_aplicacion} />

          <RutasPrincipales />
        </Router>
      )}
      <ToastContainer />
    </div>
  );
};
