import axios from 'axios'
import React, { Component } from 'react' 
import KullaniciRolConsumer from "../contexts/KullaniciRol-Context"
import { Link } from 'react-router-dom'

class KullaniciRolUpdate extends Component {

    state = { 
        kullaniciId : 0, 
        rolId : 0,
        error : false
    } 

    fillRol = () => {         
         
        const {rolId, rols} = this.state;  
        return (
          rols &&
          rols.length > 0 &&
          rols.map((rol) => {
            if(rolId === rol.id){
                return <option selected key= {rol.id} value={rol.id}>{rol.name}</option>;
            }
            else{
                return <option key= {rol.id} value={rol.id}>{rol.name}</option>;
            }
          })
        );
    }

    fillKullanici = () => {         
         
        const {kullaniciId, kullanicis} = this.state;  
        return (
          kullanicis &&
          kullanicis.length > 0 &&
          kullanicis.map((kullanici) => {
            if(kullaniciId === kullanici.id){
                return <option selected key= {kullanici.id} value={kullanici.id}>{kullanici.adi + " " + kullanici.soyadi}</option>;
            }
            else{
                return <option key= {kullanici.id} value={kullanici.id}>{kullanici.adi + " " + kullanici.soyadi}</option>;
            }
          })
        );
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

        const response = await axios.get(`http://localhost:5000/Api/Parametre/KullaniciRolGetir/${id}`, { headers: {"Authorization" : `Bearer ${token}`} });

        const {adi, kullaniciId, rolId} = response.data;
        this.setState({
            adi, kullaniciId, rolId
        });

        await axios.get("http://localhost:5000/Api/Parametre/RolleriGetir",{ headers: {"Authorization" : `Bearer ${token}`} })
        .then(response => { 
           this.setState({ rols: response.data });
        })
        .catch(error => console.log(error.response));

        await axios.get("http://localhost:5000/Api/Kullanici/KullanicilariGetir",{ headers: {"Authorization" : `Bearer ${token}`} })
        .then(response => { 
           this.setState({ kullanicis: response.data });
        })
        .catch(error => console.log(error.response));

    }
    
    validateForm = () => {
        const {kullaniciId, rolId} = this.state;
        if(kullaniciId === 0 || rolId === 0)
        {
            return false;
        }

        return true;
    }

    updateKullaniciRol = async (dispatch, e) => {
        e.preventDefault(); 
        //Update ????erik 
        const {kullaniciId, rolId } = this.state;
        const {id} = this.props.match.params;
        const updatedKullaniciRol = {id, kullaniciId, rolId}

        if(!this.validateForm()) {
            this.setState({
                error : true
            })

            return;
        }
        const token = sessionStorage.getItem('token');
        const response = await axios.put(`http://localhost:5000/Api/Parametre/KullaniciRolGuncelle/${id}`, updatedKullaniciRol,{ headers: {"Authorization" : `Bearer ${token}`} }); 
        dispatch({type:"UPDATE_KULLANICIROL", payload: response.data});

        //Redirect 
        window.open("/kullanicirols","_self");   
    }

    render() {
        const {error} = this.state;

        return <KullaniciRolConsumer>
        {
            value => {
                const {dispatch} = value;
                return (
                    <div className="container"> 
                    <div className = "col-md-12 mb-4"> 

                    <Link to="/kullaniciRols" className="btn btn-info btn-block mb-2 text-white">Geri D??n</Link>
              
                    <div  className= "card">
                        <div className= "card-header">
                            <h4>Kullan??c?? Rol G??ncelleme</h4>
                        </div>
                            <div className="card-body">
                                {
                                    error ?
                                    <div className="alert alert-danger">L??tfen t??m bilgileri doldurunuz.</div>
                                    : null
                                }
                                <form onSubmit= {this.updateKullaniciRol.bind(this, dispatch)}> 
                                    <div className="form-group">
                                        <label htmlFor="rolId">Rol</label>
                                        <select className="form-control" name="rolId" onChange={this.changeInput} id="rolId">
                                           <option key="0">-Se??iniz-</option> 
                                           {this.fillRol()}
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="kullaniciId">Kullan??c??</label>
                                        <select className="form-control" name="kullaniciId" onChange={this.changeInput} id="kullaniciId">
                                           <option key="0">-Se??iniz-</option> 
                                           {this.fillKullanici()}
                                        </select>
                                    </div>
                                    <button className="btn btn-danger btn-block" type="submit" >G??ncelle</button>
                                </form>
                            </div>
                        </div>                    
                    </div>
                    </div>
                )
            }
        }
        </KullaniciRolConsumer> 
    }
}

export default KullaniciRolUpdate;