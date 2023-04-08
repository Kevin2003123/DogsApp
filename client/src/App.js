import "./App.css";
import Landing from "./components/Landing/Landing.jsx";
import Home from "./components/Home/Home.jsx";
import detail from "./components/CardDetail/CardDetail.jsx";
import DogForm from "./components/DogForm/DogsForm.jsx";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Route exact path="/" component={Landing} />
        <Route exact path="/home" component={Home} />
        <Route path="/dog/detail/:id/:origin" component={detail} />
        <Route path="/dogForm" component={DogForm} />
      </Router>
    </>
  );
}

export default App;
