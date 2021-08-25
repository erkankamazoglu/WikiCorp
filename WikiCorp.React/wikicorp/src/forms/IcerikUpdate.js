import axios from 'axios'
import React, { Component } from 'react' 
import IcerikConsumer from "../contexts/Icerik-Context"
import { Link } from 'react-router-dom'

class IcerikUpdate extends Component {

    state = { 
        baslik : "",
        icerigi : "",  
        kategoriId : 0,
        error : false
    } 

    fillKategori = () => {         
         
        const {kategoriId, kategoris} = this.state;  
        return (
          kategoris &&
          kategoris.length > 0 &&
          kategoris.map((kategori) => {
            if(kategoriId === kategori.id){
                return <option selected key= {kategori.id} value={kategori.id}>{kategori.adi}</option>;
            }
            else{
                return <option key= {kategori.id} value={kategori.id}>{kategori.adi}</option>;
            }
          })
        );
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

    componentDidMount = async() => {
        const {id} = this.props.match.params;
        const token = sessionStorage.getItem('token');

        if(token === undefined || token === null) {
            //Redirect 
            window.open("/login","_self");   
        } 

        const response = await axios.get(`http://localhost:5000/Api/Icerik/IcerikGetir/${id}`, { headers: {"Authorization" : `Bearer ${token}`} });

        const {baslik, icerigi, kategoriId} = response.data;
        this.setState({
            baslik, icerigi, kategoriId
        });

        await axios.get("http://localhost:5000/Api/Parametre/KategorileriGetir",{ headers: {"Authorization" : `Bearer ${token}`} })
        .then(response => { 
           this.setState({ kategoris: response.data });
        })
        .catch(error => console.log(error.response));

    }
    
    validateForm = () => {
        const {baslik,icerigi,kategoriId} = this.state;
        if(baslik === "" || icerigi ==="" || kategoriId === 0)
        {
            return false;
        }

        return true;
    } 

    updateIcerik = async (dispatch, e) => {
        e.preventDefault(); 
        //Update İçerik 
        const {baslik, icerigi, kategoriId, dosya } = this.state;
        const {id} = this.props.match.params;
         
        const updatedIcerik = {id, baslik, icerigi, kategoriId}
       
        if(!this.validateForm()) {
            this.setState({
                error : true
            })

            return;
        } 
        const token = sessionStorage.getItem('token');          
        const response = await axios.put(`http://localhost:5000/Api/Icerik/IcerikGuncelle/${id}`, updatedIcerik,{ headers: {"Authorization" : `Bearer ${token}`} });  
        dispatch({type:"UPDATE_ICERIK", payload: response.data}); 

        //Redirect 
        window.open("/","_self");  
    }

    render() {
        const {baslik,icerigi,error} = this.state;

        return <IcerikConsumer>
        {
            value => {
                const {dispatch} = value;
                return (
                    <div className="container"> 
                    <div className = "col-md-12 mb-4"> 

                    <Link to="/" className="btn btn-info btn-block mb-2 text-white">Geri Dön</Link>
              
                    <div  className= "card">
                        <div className= "card-header">
                            <h4>İçerik Güncelleme</h4>
                        </div>
                            <div className="card-body">
                                {
                                    error ?
                                    <div className="alert alert-danger">Lütfen tüm bilgileri doldurunuz.</div>
                                    : null
                                }
                                <form onSubmit= {this.updateIcerik.bind(this, dispatch)}>
                                    <div className="form-group">
                                        <label htmlFor="baslik">Başlık</label>
                                        <input type="text" name="baslik" id="baslik" className = "form-control" value= {baslik} onChange={this.changeInput}></input>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="icerigi">İçeriği</label>
                                        <textarea type="text" name="icerigi" id="icerigi" rows="10" className = "form-control" value= {icerigi} onChange={this.changeInput}></textarea>
                                    </div> 
                                    <div className="form-group">
                                        <label htmlFor="icerigi">Dosya</label>
                                        <input type="file" name="dosya" id="dosya" rows="10" className = "form-control" onChange={this.changeFileInput}></input>
                                    </div> 
                                    <div className="form-group">
                                        <label htmlFor="kategoriId">Kategori</label>
                                        <select className="form-control" name="kategoriId" onChange={this.changeInput} id="kategoriId">
                                           <option key="0">-Seçiniz-</option> 
                                           {this.fillKategori()}
                                        </select>
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
        </IcerikConsumer> 
    }
}

export default IcerikUpdate;