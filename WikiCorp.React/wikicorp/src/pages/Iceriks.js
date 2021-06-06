import React, { Component } from 'react'
import Icerik from "../components/Icerik"; 
import IcerikConsumer from "../contexts/Icerik-Context";
import { Link } from 'react-router-dom'

class Iceriks extends Component {

    componentDidMount = async() => { 
        const token = sessionStorage.getItem('token');  
        if(token === undefined || token === null) {
            //Redirect
            window.open("/login","_self");   
        } 
    }

    render() {
        return (
            <IcerikConsumer>
                {
                    value => {
                        const {iceriks} = value; 

                        return (
                            <div className="container"> 
                            <div className = "row"> 
                            <div className="page-header ml-3" >
                                <h4 style={{borderLeft: "5px solid #343a40", paddingLeft: "5px"}}>İçerikler</h4>      
                            </div>
                        </div>
                            <div className="row"> 
                                <div className = "col-md-12 mb-4">
                                    <Link to="/add" className="btn btn-warning btn-block text-white">Yeni Ekle</Link>
                                </div>
                            </div>
                                <div className="row"> 
                                {
                                    iceriks.map(icerik => {
                                        return (
                                            <Icerik  
                                            key = {icerik.id}
                                            id = {icerik.id}
                                            baslik = {icerik.baslik}
                                            icerigi = {icerik.icerigi}
                                            kategoriId = {icerik.kategoriId}
                                            />
                                        )
                                    })
                                }
                                </div>
                            </div>
                        )
                    }
                }
            </IcerikConsumer>
        )        
    }
}

export default Iceriks;