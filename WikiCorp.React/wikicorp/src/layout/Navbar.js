import React, { Component } from 'react'  
import { Link } from 'react-router-dom'
import axios from 'axios'

class Navbar extends Component {

    state = { 
    }

    logout = () => {
        window.open("/logout","_self");
    }

    componentDidMount = async() => { 
        const token = sessionStorage.getItem('token'); 
        await axios.get("http://localhost:5000/Api/Kullanici/KullaniciYoneticiMi",{ headers: {"Authorization" : `Bearer ${token}`} })
        .then(response => { 
           this.setState({ yetkiKontrol: response.data });
        })
        .catch(error => console.log(error.response));
    }

    render() {
        const {yetkiKontrol} = this.state;   
        return (
            <nav className="navbar-nav navbar-expand-lg navbar-dark bg-dark mb-3 p-3">
            <a href="/" className="navbar-brand">WikiCorp - Kurumsal Hafıza Yönetimi</a>
            <ul className="navbar-nav ml-auto"> 
                <li className="nav-item active"> 
                    <Link to = "/" className="nav-link">İçerikler</Link>  
                </li> 
               
                {yetkiKontrol !== undefined ?
                <li className="nav-item active"> 
                    <Link to = "/kategoris" className="nav-link">Kategoriler</Link> 
                </li> 
                : null} 
                {yetkiKontrol !== undefined ?
                <li className="nav-item active"> 
                    <Link to = "/rols" className="nav-link">Roller</Link> 
                </li>   
                : null} 
                {yetkiKontrol !== undefined ? 
                <li className="nav-item active"> 
                    <Link to = "/kullanicirols" className="nav-link">Kullanıcı-Roller</Link> 
                </li>    
                : null}  

                <li className="nav-item"> 
                    <Link onClick= {this.logout} className="nav-link">Çıkış</Link> 
                </li>                 
            </ul>
        </nav>
        )
    }
} 

export default Navbar