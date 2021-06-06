import axios from 'axios'
import React, { Component } from 'react' 
import KategoriConsumer from "../contexts/Kategori-Context"
import { Link } from 'react-router-dom'

class KategoriUpdate extends Component {

    state = { 
        adi : "", 
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

        const response = await axios.get(`http://localhost:5000/Api/Parametre/KategoriGetir/${id}`, { headers: {"Authorization" : `Bearer ${token}`} });

        const {adi, rolId} = response.data;
        this.setState({
            adi, rolId
        });

        await axios.get("http://localhost:5000/Api/Parametre/RolleriGetir",{ headers: {"Authorization" : `Bearer ${token}`} })
        .then(response => { 
           this.setState({ rols: response.data });
        })
        .catch(error => console.log(error.response));

    }
    
    validateForm = () => {
        const {adi,rolId} = this.state;
        if(adi === "" || rolId === 0)
        {
            return false;
        }

        return true;
    }

    updateKategori = async (dispatch, e) => {
        e.preventDefault(); 
        //Update İçerik 
        const {adi, rolId } = this.state;
        const {id} = this.props.match.params;
        const updatedKategori = {id, adi, rolId}

        if(!this.validateForm()) {
            this.setState({
                error : true
            })

            return;
        }
        const token = sessionStorage.getItem('token');
        const response = await axios.put(`http://localhost:5000/Api/Parametre/KategoriGuncelle/${id}`, updatedKategori,{ headers: {"Authorization" : `Bearer ${token}`} }); 
        dispatch({type:"UPDATE_KATEGORI", payload: response.data});

        //Redirect 
        window.open("/kategoris","_self");   
    }

    render() {
        const {adi,error} = this.state;

        return <KategoriConsumer>
        {
            value => {
                const {dispatch} = value;
                return (
                    <div className="container"> 
                    <div className = "col-md-12 mb-4"> 

                    <Link to="/kategoris" className="btn btn-info btn-block mb-2 text-white">Geri Dön</Link>
              
                    <div  className= "card">
                        <div className= "card-header">
                            <h4>Kategori Güncelleme</h4>
                        </div>
                            <div className="card-body">
                                {
                                    error ?
                                    <div className="alert alert-danger">Lütfen tüm bilgileri doldurunuz.</div>
                                    : null
                                }
                                <form onSubmit= {this.updateKategori.bind(this, dispatch)}>
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
                                    <button className="btn btn-danger btn-block" type="submit" >Güncelle</button>
                                </form>
                            </div>
                        </div>                    
                    </div>
                    </div>
                )
            }
        }
        </KategoriConsumer> 
    }
}

export default KategoriUpdate;