import Navbar from "./layout/Navbar";
import './App.css';
import Iceriks from "./components/Iceriks";  
import NotFound from "./pages/NotFound"; 
import {BrowserRouter as Router,Route,Switch} from "react-router-dom"

function App() {
  return (
    <Router>
      <Navbar  title = "WikiCorp - Kurumsal Hafıza Yönetimi"/>  
      <div className="container"> 
        
        <Switch>
          <Route exact path = "/" component = {Iceriks} />    
          <Route component = {NotFound} />
        </Switch>
      </div>
    </Router>    
  );
}

export default App;
