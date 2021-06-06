import axios from 'axios'
import React, { Component } from 'react'
import posed from "react-pose"
import RolConsumer from "../contexts/Rol-Context" 
import { Link } from 'react-router-dom'

const Animation  = posed.div({
    visible : {
        opacity :1,
        applyAtStart : { 
            display : "block"
        }
    },
    hidden: {
        opacity : 0,
        applyAtEnd : {
            display : "none"
        }
    }
})


class RolAdd extends Component {

    state = {
        visible : true,
        name : "",
        error : false
    } 

    changeVisibility = (e) => {
        this.setState({visible: !this.state.visible})
    }

    changeInput = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    } 

    validateForm = () => {
        const {name} = this.state;
        if(name === "")
        {
            return false;
        }

        return true;
    }

    addRol = async (dispatch, e) => {
        e.preventDefault();
        const {name} = this.state;
        const newRol = { name };
        
        if(!this.validateForm()) {
            this.setState({
                error : true
            })

            return;
        }
        const token = sessionStorage.getItem('token');
        const response = await axios.post("http://localhost:5000/Api/Parametre/RolKaydet", newRol, { headers: {"Authorization" : `Bearer ${token}`} });


        dispatch({type : "ADD_ROL", payload : response.data});

        //Redirect
        window.open("/rols","_self");
    }

    componentDidMount = async() => { 
        const token = sessionStorage.getItem('token');

        if(token === undefined || token === null) {
            //Redirect 
            window.open("/login","_self");  
        }   
    }

    render() {
        const {visible,name, error} = this.state; 

        return <RolConsumer>
        {
            value => {
                const {dispatch} = value;
                return (
                    <div className="container">   
                    <div className = "col-md-12 mb-4">
                     
                    <Link to="/rols" className="btn btn-info btn-block text-white mb-2">Geri Dön</Link>
                     
                    <button onClick= {this.changeVisibility} className = "btn btn-dark btn-block mb-2">{visible ? "Gizle" : "Göster"}</button>
                    <Animation pose = {visible ? "visible" : "hidden"}>
                    <div  className= "card">
                        <div className= "card-header">
                            <h4>Rol Ekleme</h4>
                        </div> 
                            <div className="card-body">
                                {
                                    error ?
                                    <div className="alert alert-danger">Lütfen tüm bilgileri doldurunuz.</div>
                                    : null
                                }
                                <form onSubmit= {this.addRol.bind(this, dispatch)}>
                                    <div className="form-group">
                                        <label htmlFor="name">Rol</label>
                                        <input type="text" name="name" id="name" className = "form-control" value= {name} onChange={this.changeInput}></input>
                                    </div> 
                                    <button className="btn btn-danger btn-block" type="submit" >Ekle</button>
                                </form>
                            </div>
                        </div>
                    </Animation>
                    </div>
                    </div>
                )
            }
        }
        </RolConsumer> 
    }
}

export default RolAdd;