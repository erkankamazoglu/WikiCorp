import React, { Component } from 'react'
import Kategori from "../components/Kategori"; 
import KategoriConsumer from "../contexts/Kategori-Context";
import { Link } from 'react-router-dom'

class Kategoris extends Component {

    componentDidMount = async() => { 
        const token = sessionStorage.getItem('token');  
        if(token === undefined || token === null) {
            //Redirect
            window.open("/login","_self");   
        } 
    }

    render() {
        return (
            <KategoriConsumer>
                {
                    value => {
                        const {kategoris} = value; 

                        return (
                            <div className="container"> 
                            <div className = "row"> 
                            <div className="page-header ml-3" >
                                <h4 style={{borderLeft: "5px solid #343a40", paddingLeft: "5px"}}>Kategoriler</h4>      
                            </div>
                        </div>
                            <div className="row"> 
                                <div className = "col-md-12 mb-4">
                                    <Link to="/kategoriadd" className="btn btn-warning btn-block text-white">Yeni Ekle</Link>
                                </div>
                            </div>
                                <div className="row"> 
                                {
                                    kategoris.map(kategori => {
                                        return (
                                            <Kategori  
                                            key = {kategori.id}
                                            id = {kategori.id}
                                            adi = {kategori.adi} 
                                            rolId = {kategori.rolId}
                                            />
                                        )
                                    })
                                }
                                </div>
                            </div>
                        )
                    }
                }
            </KategoriConsumer>
        )        
    }
}

export default Kategoris;