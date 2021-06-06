import React, { Component } from 'react'
import PropTypes from 'prop-types'
import RolConsumer from "../contexts/Rol-Context"
import axios from 'axios'
import { Link } from 'react-router-dom'


class Rol extends Component {   
    
    onDeleteRol = async (dispatch, e) => {
        const {id} = this.props;
        //Delete Request
        const token = sessionStorage.getItem('token');
        await axios.delete(`http://localhost:5000/Api/Parametre/RolSil/${id}`,{ headers: {"Authorization" : `Bearer ${token}`} });

        //Consumer Dispatch
        dispatch({type :"DELETE_ROL", payload: id})
    }  

    render() {

        // Destructing
        const {id, name } = this.props; 

        return (
            <RolConsumer>
            {
                value => {
                    const {dispatch} = value;

                    return (
                        <div className = "col-md-3 mb-4">
                            <div className = "card">
                                <div className = "card-header justify-content-between"> 
                                    <div className="row ml-2">
                                        <h4 className = "d-inline" >{name}</h4> 
                                    </div>
                                </div> 

                                <div className="card-body">   
                                    <Link to= {`roledit/${id}`} className="btn btn-dark btn-block">
                                        <i className="far fa-edit mr-2"></i>
                                        Rol Güncelle
                                        </Link> 
                                    <Link onClick = {this.onDeleteRol.bind(this, dispatch)} className="btn btn-danger btn-block">
                                        <i className="far fa-trash-alt mr-2"></i>
                                        Rol Sil
                                    </Link>
                                </div> 
                            </div>   
                        </div>
                    )
                }
            }
            </RolConsumer>
        )        
    }
}
Rol.defaultProps = { 
    name : "Bilgi Yok"
}
Rol.propTypes = {
    name : PropTypes.string.isRequired
}


export default Rol;