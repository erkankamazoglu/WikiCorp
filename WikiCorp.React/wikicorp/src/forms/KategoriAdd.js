import axios from 'axios'
import React, { Component } from 'react'
import posed from "react-pose"
import KategoriConsumer from "../contexts/Kategori-Context" 
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


class KategoriAdd extends Component {

    state = {
        visible : true,
        adi : "", 
        rolId : 0,
        error : false
    }
 
    fillRol = () => {         
         
        const {rols} = this.state; 

        return (
          rols &&
          rols.length > 0 &&
          rols.map((rol) => {
            return <option key= {rol.id} value={rol.id}>{rol.name}</option>;
          })
        );
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
        const {adi,rolId} = this.state;
        if(adi === "" || rolId === 0)
        {
            return false;
        }

        return true;
    }

    addKategori = async (dispatch, e) => {
        e.preventDefault();
        const {adi,rolId} = this.state;
        const newKategori = { adi, rolId};
        
        if(!this.validateForm()) {
            this.setState({
                error : true
            })

            return;
        }
        const token = sessionStorage.getItem('token');
        const response = await axios.post("http://localhost:5000/Api/Parametre/KategoriKaydet", newKategori, { headers: {"Authorization" : `Bearer ${token}`} });


        dispatch({type : "ADD_KATEGORI", payload : response.data});

        //Redirect 
        window.open("/kategoris","_self");  
    }

    componentDidMount = async() => { 
        const token = sessionStorage.getItem('token');

        if(token === undefined || token === null) {
            //Redirect 
            window.open("/login","_self");  
        }  
        
        await axios.get("http://localhost:5000/Api/Parametre/RolleriGetir",{ headers: {"Authorization" : `Bearer ${token}`} })
        .then(response => { 
           this.setState({ rols: response.data });
        })
        .catch(error => console.log(error.response));
    }

    render() {
        const {visible,adi, error} = this.state; 

        return <KategoriConsumer>
        {
            value => {
                const {dispatch} = value;
                return (
                    <div className="container">   
                    <div className = "col-md-12 mb-4">
                     
                    <Link to="/kategoris" className="btn btn-info btn-block text-white mb-2">Geri Dön</Link>
                     
                    <button onClick= {this.changeVisibility} className = "btn btn-dark btn-block mb-2">{visible ? "Gizle" : "Göster"}</button>
                    <Animation pose = {visible ? "visible" : "hidden"}>
                    <div  className= "card">
                        <div className= "card-header">
                            <h4>Kategori Ekleme</h4>
                        </div> 
                            <div className="card-body">
                                {
                                    error ?
                                    <div className="alert alert-danger">Lütfen tüm bilgileri doldurunuz.</div>
                                    : null
                                }
                                <form onSubmit= {this.addKategori.bind(this, dispatch)}>
                                    <div className="form-group">
                                        <label htmlFor="adi">Kategori</label>
                                        <input type="text" name="adi" id="adi" className = "form-control" value= {adi} onChange={this.changeInput}></input>
                                    </div> 
                                    <div className="form-group">
                                        <label htmlFor="rolId">Rol</label>
                                        <select className="form-control" name="rolId" onChange={this.changeInput} id="rolId">
                                           <option key="0">-Seçiniz-</option> 
                                           {this.fillRol()}
                                        </select>
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
        </KategoriConsumer> 
    }
}

export default KategoriAdd;