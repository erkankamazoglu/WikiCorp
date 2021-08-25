import axios from 'axios'
import React, { Component } from 'react'
import posed from "react-pose"
import IcerikConsumer from "../contexts/Icerik-Context" 
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


class IcerikAdd extends Component {

    state = {
        visible : true,
        baslik : "",
        icerigi : "",
        kategoriId : 0,
        error : false
    }
 
    fillKategori = () => {         
         
        const {kategoris} = this.state; 

        return (
          kategoris &&
          kategoris.length > 0 &&
          kategoris.map((kategori) => {
            return <option key= {kategori.id} value={kategori.id}>{kategori.adi}</option>;
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

    changeFileInput = (e) => { 
        this.setState({ 
            [e.target.name] : e.target.files[0]
        })
    } 

    validateForm = () => {
        const {baslik,icerigi,kategoriId} = this.state;
        if(baslik === "" || icerigi === "" || kategoriId === 0)
        {
            return false;
        }

        return true;
    }

    addIcerik = async (dispatch, e) => {
        e.preventDefault();
        const {baslik,icerigi,kategoriId} = this.state;
        const newIcerik = { baslik, icerigi, kategoriId};
        
        if(!this.validateForm()) {
            this.setState({
                error : true
            })

            return;
        }
        const token = sessionStorage.getItem('token');
        const response = await axios.post("http://localhost:5000/Api/Icerik/IcerikKaydet", newIcerik, { headers: {"Authorization" : `Bearer ${token}`} });


        dispatch({type : "ADD_ICERIK", payload : response.data});

        //Redirect 
        window.open("/","_self");  
        
    }

    componentDidMount = async() => { 
        const token = sessionStorage.getItem('token');

        if(token === undefined || token === null) {
            //Redirect 
            window.open("/login","_self");  
        }  
        
        await axios.get("http://localhost:5000/Api/Parametre/KategorileriGetir",{ headers: {"Authorization" : `Bearer ${token}`} })
        .then(response => { 
           this.setState({ kategoris: response.data });
        })
        .catch(error => console.log(error.response));
    }

    render() {
        const {visible,baslik,icerigi, error} = this.state; 

        return <IcerikConsumer>
        {
            value => {
                const {dispatch} = value;
                return (
                    <div className="container">   
                    <div className = "col-md-12 mb-4">
                     
                    <Link to="/" className="btn btn-info btn-block text-white mb-2">Geri Dön</Link>
                     
                    <button onClick= {this.changeVisibility} className = "btn btn-dark btn-block mb-2">{visible ? "Gizle" : "Göster"}</button>
                    <Animation pose = {visible ? "visible" : "hidden"}>
                    <div  className= "card">
                        <div className= "card-header">
                            <h4>İçerik Ekleme</h4>
                        </div> 
                            <div className="card-body">
                                {
                                    error ?
                                    <div className="alert alert-danger">Lütfen tüm bilgileri doldurunuz.</div>
                                    : null
                                }
                                <form onSubmit= {this.addIcerik.bind(this, dispatch)}>
                                    <div className="form-group">
                                        <label htmlFor="baslik">Başlık</label>
                                        <input type="text" name="baslik" id="baslik" className = "form-control" value= {baslik} onChange={this.changeInput}></input>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="icerigi">İçeriği</label>
                                        <textarea  type="text" name="icerigi" id="icerigi" rows="10" className = "form-control" value= {icerigi} onChange={this.changeInput}></textarea>
                                    </div> 
                                    <div className="form-group">
                                        <label htmlFor="kategoriId">Kategori</label>
                                        <select className="form-control" name="kategoriId" onChange={this.changeInput} id="kategoriId">
                                           <option key="0">-Seçiniz-</option> 
                                           {this.fillKategori()}
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
        </IcerikConsumer> 
    }
}

export default IcerikAdd;