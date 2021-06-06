import React, { Component } from 'react'
import KullaniciRol from "../components/KullaniciRol"; 
import KullaniciRolConsumer from "../contexts/KullaniciRol-Context";
import { Link } from 'react-router-dom'

class KullaniciRols extends Component {

    componentDidMount = async() => { 
        const token = sessionStorage.getItem('token');  
        if(token === undefined || token === null) {
            //Redirect
            window.open("/login","_self");   
        } 
    }

    render() {
        return (
            <KullaniciRolConsumer>
                {
                    value => {
                        const {kullaniciRols} = value; 

                        return (
                            <div className="container"> 
                            <div className = "row"> 
                            <div className="page-header ml-3" >
                                <h4 style={{borderLeft: "5px solid #343a40", paddingLeft: "5px"}}>Kullanıcı-Roller</h4>      
                            </div>
                        </div>
                            <div className="row"> 
                                <div className = "col-md-12 mb-4">
                                    <Link to="/kullaniciroladd" className="btn btn-warning btn-block text-white">Yeni Ekle</Link>
                                </div>
                            </div>
                                <div className="row"> 
                                {
                                    kullaniciRols.map(kullaniciRol => {
                                        return (
                                            <KullaniciRol  
                                            key = {kullaniciRol.id}
                                            id = {kullaniciRol.id}
                                            kullaniciId = {kullaniciRol.kullaniciId} 
                                            rolId = {kullaniciRol.rolId}
                                            />
                                        )
                                    })
                                }
                                </div>
                            </div>
                        )
                    }
                }
            </KullaniciRolConsumer>
        )        
    }
}

export default KullaniciRols;