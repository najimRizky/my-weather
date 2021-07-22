// import logo from './logo.svg';
import './App.css';
import Home from './pages/Home'
import Header from './components/Header'
import 'semantic-ui-css/semantic.min.css'
// import pkg from 'semantic-ui-react/package.json'

function App() {
  
  return (
    <div className="App">
      {/* <br/><br/><br/><br/> */}
      <Header/>
      <Home/>
      {/* <br/><br/><br/><br/> */}
    </div>
  );
}

export default App;