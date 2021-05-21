import React, { Component } from 'react'
import PropTypes from 'prop-types'
import IcerikConsumer from "../contexts/Context"
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
        await axios.delete(`http://localhost:3004/iceriks/${id}`);

        //Consumer Dispatch
        dispatch({type :"DELETE_ICERIK", payload: id})
    } 

    render() {

        // Destructing
        const {id, baslik, icerigi, kategoriId} = this.props;
        const {isVisible} = this.state;

        return (
            <IcerikConsumer>
            {
                value => {
                    const {dispatch} = value;

                    return (
                        <div className = "col-md-12 mb-4">
                            <div className = "card" style = {isVisible ? { backgroundColor : "#e0acb1"} : null}>
                                <div className = "card-header d-flex justify-content-between">
                                    <h4 className = "d-inline" onClick = {this.onClickEvent}>{baslik}</h4>
                                    <i className="far fa-trash-alt" style = {{cursor:"pointer"}} onClick = {this.onDeleteIcerik.bind(this, dispatch)}></i>
                                </div>
                                {
                                isVisible ?
                                <div className="card-body"> 
                                    <p className = "card-text">İçeriği : {icerigi}</p> 
                                    <p className = "card-text">Kategori : {kategoriId}</p> 
                                    <Link to= {`edit/${id}`} className="btn btn-dark btn-block">İçerik Güncelle</Link>
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