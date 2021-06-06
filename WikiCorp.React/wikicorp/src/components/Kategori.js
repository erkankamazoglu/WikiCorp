import React, { Component } from 'react'
import PropTypes from 'prop-types'
import KategoriConsumer from "../contexts/Kategori-Context"
import axios from 'axios'
import { Link } from 'react-router-dom'


class Kategori extends Component {  
      
    state = { 
    }

    onDeleteKategori = async (dispatch, e) => {
        const {id} = this.props;
        //Delete Request
        const token = sessionStorage.getItem('token');
        await axios.delete(`http://localhost:5000/Api/Parametre/KategoriSil/${id}`,{ headers: {"Authorization" : `Bearer ${token}`} });

        //Consumer Dispatch
        dispatch({type :"DELETE_KATEGORI", payload: id})
    } 

    componentDidMount = async() => { 
        const token = sessionStorage.getItem('token'); 
        const {rolId} = this.props;  
        await axios.get(`http://localhost:5000/Api/Parametre/RolGetir/${rolId}`,{ headers: {"Authorization" : `Bearer ${token}`} })
        .then(response => { 
           this.setState({ rol: response.data });
        })
        .catch(error => console.log(error.response));
    }

    render() {

        // Destructing
        const {id, adi} = this.props;
        const {rol} = this.state; 

        return (
            <KategoriConsumer>
            {
                value => {
                    const {dispatch} = value;

                    return (
                        <div className = "col-md-4 mb-4">
                            <div className = "card">
                                <div className = "card-header justify-content-between">
                                    <div className="row ml-2">
                                    <h5>
                                        <span className="badge badge-success">
                                        <i className="fas fa-user-tag mr-2"></i>
                                        {rol !== undefined ? rol.name : ""}</span>
                                    </h5>
                                    </div>
                                    <div className="row ml-2">
                                    <h4 className = "d-inline">{adi}</h4> 
                                    </div>
                                    
                                </div> 
                                <div className="card-body">   
                                    <Link to= {`kategoriedit/${id}`} className="btn btn-dark btn-block">
                                        <i className="far fa-edit mr-2"></i>
                                        Kategori Güncelle
                                        </Link> 
                                    <Link onClick = {this.onDeleteKategori.bind(this, dispatch)} className="btn btn-danger btn-block">
                                        <i className="far fa-trash-alt mr-2"></i>
                                        Kategori Sil
                                    </Link>
                                </div> 
                            </div>   
                        </div>
                    )
                }
            }
            </KategoriConsumer>
        )        
    }
}
Kategori.defaultProps = { 
    adi : "Bilgi Yok", 
    rolId : 0
}
Kategori.propTypes = {
    adi : PropTypes.string.isRequired, 
    rolId : PropTypes.number.isRequired, 
    id : PropTypes.number.isRequired
}


export default Kategori;