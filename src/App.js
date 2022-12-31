// Dll
import './App.css';
import 'semantic-ui-css/semantic.min.css'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

// Components
import Nav from './components/Nav'
import Header from './components/Header'

// Pages
import CurrentLocation from './pages/CurrentLocation';
import CustomLocation from './pages/CustomLocation';

function App() {

    return (
        <div className="App">
            <Router>
                <Header />
                <Nav />
                <Switch>
                    <Route path="/" exact component={CurrentLocation}></Route>
                    <Route path="/search" exact component={CustomLocation}></Route>
                    <Redirect path="*" to="/" />
                </Switch>
            </Router>
            <br /><br />
        </div>
    );
}

export default App;