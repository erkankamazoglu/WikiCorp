import React, { Component } from 'react'
import Rol from "../components/Rol"; 
import RolConsumer from "../contexts/Rol-Context";
import { Link } from 'react-router-dom'

class Rols extends Component {

    componentDidMount = async() => { 
        const token = sessionStorage.getItem('token');  
        if(token === undefined || token === null) {
            //Redirect
            window.open("/login","_self");   
        } 
    }

    render() {
        return (
            <RolConsumer>
                {
                    value => {
                        const {rols} = value;  
                        return (
                            <div className="container"> 
                            <div className = "row"> 
                                <div className="page-header ml-3" >
                                    <h4 style={{borderLeft: "5px solid #343a40", paddingLeft: "5px"}}>Roller</h4>      
                                </div>
                            </div>
                            <div className = "row">
                                <div className = "col-md-12 mb-4">
                                    <Link to="/roladd" className="btn btn-warning btn-block text-white">Yeni Ekle</Link>
                                </div>
                            </div>
                                <div className = "row">
                                {
                                    rols.map(rol => {
                                        return (
                                            <Rol  
                                            key = {rol.id}
                                            id = {rol.id}
                                            name = {rol.name} 
                                            />
                                        )
                                    })
                                }
                                </div>
                            </div>
                        )
                    }
                }
            </RolConsumer>
        )        
    }
}

export default Rols;