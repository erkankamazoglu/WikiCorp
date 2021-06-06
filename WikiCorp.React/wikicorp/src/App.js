import Navbar from "./layout/Navbar";
import './App.css';
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import NotFound from "./pages/NotFound"; 
import {BrowserRouter as Router,Route,Switch} from "react-router-dom"

import {IcerikProvider} from "./contexts/Icerik-Context";
import Iceriks from "./pages/Iceriks";  
import IcerikAdd from "./forms/IcerikAdd";
import IcerikUpdate from "./forms/IcerikUpdate";
import {RolProvider} from "./contexts/Rol-Context";
import Rols from "./pages/Rols";
import RolAdd from "./forms/RolAdd";
import RolUpdate from "./forms/RolUpdate";
import { KategoriProvider } from "./contexts/Kategori-Context";
import Kategoris from "./pages/Kategoris";
import KategoriAdd from "./forms/KategoriAdd";
import KategoriUpdate from "./forms/KategoriUpdate";
import { KullaniciRolProvider } from "./contexts/KullaniciRol-Context";
import KullaniciRols from "./pages/KullaniciRols";
import KullaniciRolAdd from "./forms/KullaniciRolAdd";
import KullaniciRolUpdate from "./forms/KullaniciRolUpdate";
 

const isEmptyLayout = () => {     
	if(window.location.href.match("login") || window.location.href.match("logout"))
  {     
    return true;
  }
  return false;
} 

function App() {   
  return ( 
    <Router>
      {isEmptyLayout() === false ? <Navbar/> : null}     

      <Switch>
        <Route exact path = "/login" component = {Login} /> 
        <Route exact path = "/logout" component = {Logout} /> 
        
        <KullaniciRolProvider> 
        <RolProvider> 
        <KategoriProvider> 
        <IcerikProvider>  
        
          <Route exact path = "/" component = {Iceriks} />    
          <Route exact path = "/add" component = {IcerikAdd} />    
          <Route exact path = "/edit/:id" component = {IcerikUpdate} /> 
                     
          <Route exact path = "/rols" component = {Rols} />    
          <Route exact path = "/roladd" component = {RolAdd} />    
          <Route exact path = "/roledit/:id" component = {RolUpdate} />  

          <Route exact path = "/kategoris" component = {Kategoris} />    
          <Route exact path = "/kategoriadd" component = {KategoriAdd} />    
          <Route exact path = "/kategoriedit/:id" component = {KategoriUpdate} /> 

          <Route exact path = "/kullanicirols" component = {KullaniciRols} />    
          <Route exact path = "/kullaniciroladd" component = {KullaniciRolAdd} />    
          <Route exact path = "/kullaniciroledit/:id" component = {KullaniciRolUpdate} />   
        
        </IcerikProvider>
        </KategoriProvider>
        </RolProvider> 
        </KullaniciRolProvider> 

        <Route component = {NotFound} />
      </Switch>
    </Router>    
  );
}

export default App;
