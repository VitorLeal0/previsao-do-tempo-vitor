import Weather from './Components/Weather/Weather';
import Footer from './Components/Footer/footer';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Previsão do tempo</h1>
      <Weather/>
      <Footer/>

    </div>
  );
}

export default App;
