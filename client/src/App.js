import './App.css';
import Landing from './components/Landing/Landing.jsx';
import Home from './components/Home/Home.jsx'
import {BrowserRouter as Router, Route} from "react-router-dom";
function App() {
  return (
    <div className="App">

     
      <Router>
      <Route exact path="/" component={Landing}/>
      <Route exact path="/home" component={Home}/>
      </Router>
    </div>
  );
}

export default App;
