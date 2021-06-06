import axios from 'axios'
import React, { Component } from 'react' 
import RolConsumer from "../contexts/Rol-Context"
import { Link } from 'react-router-dom'

class RolUpdate extends Component {

    state = { 
        name : "", 
        error : false
    }  

    changeInput = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    } 

    componentDidMount = async() => {
        const {id} = this.props.match.params;
        const token = sessionStorage.getItem('token');

        if(token === undefined || token === null) {
            //Redirect 
            window.open("/login","_self");   
        } 

        const response = await axios.get(`http://localhost:5000/Api/Parametre/RolGetir/${id}`, { headers: {"Authorization" : `Bearer ${token}`} });

        const {name} = response.data;
        this.setState({
            name 
        }); 

    }
    
    validateForm = () => {
        const {name} = this.state;
        if(name === "")
        {
            return false;
        }

        return true;
    }

    updateRol = async (dispatch, e) => {
        e.preventDefault(); 
        //Update İçerik 
        const {name} = this.state;
        const {id} = this.props.match.params;
        const updatedRol = {id, name}

        if(!this.validateForm()) {
            this.setState({
                error : true
            })

            return;
        }
        const token = sessionStorage.getItem('token');
        const response = await axios.put(`http://localhost:5000/Api/Parametre/RolGucelle/${id}`, updatedRol,{ headers: {"Authorization" : `Bearer ${token}`} }); 
        dispatch({type:"UPDATE_ROL", payload: response.data});

        //Redirect
        window.open("/rols","_self");
    }

    render() {
        const {name, error} = this.state;

        return <RolConsumer>
        {
            value => {
                const {dispatch} = value;
                return (
                    <div className="container"> 
                    <div className = "col-md-12 mb-4"> 

                    <Link to="/rols" className="btn btn-info btn-block mb-2 text-white">Geri Dön</Link>
              
                    <div  className= "card">
                        <div className= "card-header">
                            <h4>Rol Güncelleme</h4>
                        </div>
                            <div className="card-body">
                                {
                                    error ?
                                    <div className="alert alert-danger">Lütfen tüm bilgileri doldurunuz.</div>
                                    : null
                                }
                                <form onSubmit= {this.updateRol.bind(this, dispatch)}>
                                    <div className="form-group">
                                        <label htmlFor="name">Rol</label>
                                        <input type="text" name="name" id="name" className = "form-control" value= {name} onChange={this.changeInput}></input>
                                    </div> 
                                    <button className="btn btn-danger btn-block" type="submit" >Güncelle</button>
                                </form>
                            </div>
                        </div>                    
                    </div>
                    </div>
                )
            }
        }
        </RolConsumer> 
    }
}

export default RolUpdate;