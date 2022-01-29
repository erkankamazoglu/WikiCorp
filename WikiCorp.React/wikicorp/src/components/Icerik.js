import React, { Component } from 'react'
import PropTypes from 'prop-types'
import IcerikConsumer from "../contexts/Icerik-Context"
import axios from 'axios'
import { Link } from 'react-router-dom'


class Icerik extends Component {  

    state = {
        isVisible : false
    } 

    onClickEvent = (e) => {
          this.setState({isVisible : !this.state.isVisible})
    }
    
    onDeleteIcerik = async (dispatch, e) => {
        const {id} = this.props;
        //Delete Request
        const token = sessionStorage.getItem('token');
        await axios.delete(`http://localhost:5000/Api/Icerik/IcerikSil/${id}`,{ headers: {"Authorization" : `Bearer ${token}`} });

        //Consumer Dispatch
        dispatch({type :"DELETE_ICERIK", payload: id})
    } 

    componentDidMount = async() => { 
        const token = sessionStorage.getItem('token'); 
        const {kategoriId} = this.props; 

        await axios.get(`http://localhost:5000/Api/Parametre/KategoriGetir/${kategoriId}`,{ headers: {"Authorization" : `Bearer ${token}`} })
        .then(response => { 
           this.setState({ kategori: response.data });
        })
        .catch(error => console.log(error.response));
    }

    render() {

        // Destructing
        const {id, baslik, icerigi, dosya} = this.props;
        const {isVisible, kategori} = this.state; 

        return (
            <IcerikConsumer>
            {
                value => {
                    const {dispatch} = value;

                    return (
                        <div className = "col-md-12 mb-4">
                            <div className = "card" style = {isVisible ? { backgroundColor : "#fff5d6"} : null}>
                                <div className = "card-header justify-content-between">
                                    <div className="row ml-2">
                                    <h5>
                                        <span className="badge badge-primary">
                                        <i className="fas fa-bookmark mr-2"></i>
                                        {kategori !== undefined ? kategori.adi : ""}</span>
                                    </h5>
                                    </div>
                                    <div className="row ml-2">
                                    <h4 className = "d-inline" onClick = {this.onClickEvent}>{baslik}</h4>  
                                    </div> 
                                </div>
                                {
                                isVisible ?
                                <div className="card-body">  
                                    <p className = "card-text">{icerigi}</p>  
                                    {
                                        dosya != null 
                                        ? 
                                        <img src={dosya} className="img img-fluid mb-4" alt="foto" />  
                                        : null
                                    }  

                                    <Link to= {`edit/${id}`} className="btn btn-dark btn-block">
                                        <i className="far fa-edit mr-2"></i>
                                        İçerik Güncelle
                                        </Link> 
                                    <Link onClick = {this.onDeleteIcerik.bind(this, dispatch)} className="btn btn-danger btn-block">
                                        <i className="far fa-trash-alt mr-2"></i>
                                        İçerik Sil
                                    </Link>
                                </div>
                                : null
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
Icerik.defaultProps = { 
    baslik : "Bilgi Yok",
    icerigi : "Bilgi Yok",
    kategoriId : 0
}
Icerik.propTypes = {
    baslik : PropTypes.string.isRequired,
    icerigi : PropTypes.string.isRequired,
    kategoriId : PropTypes.number.isRequired, 
    id : PropTypes.number.isRequired
}


export default Icerik;