import axios from 'axios';
import React, { Component } from 'react' 

const KategoriContext = React.createContext();
//Provider, Consumer
const reducer = (state, action) => {
    switch(action.type) {
        case "DELETE_KATEGORI" : 
            return {
                ...state,
                kategoris: state.kategoris.filter(kategori => action.payload !== kategori.id)
            }
        case "ADD_KATEGORI" :
            return {
                ...state,
                kategoris : [...state.kategoris, action.payload]
            }
        case "UPDATE_KATEGORI" :
            return {
                ...state,
                kategoris : state.kategoris.map(kategori => kategori.id === action.payload.id ? action.payload : kategori)
            }
        default :
            return state
    }
}


export class KategoriProvider extends Component {

    state = {
        kategoris: [],
        dispatch : action =>  {
            this.setState(state => reducer(state, action))
        }
    }

    componentDidMount = async() => {  
        const token = sessionStorage.getItem('token'); 
        const response = await axios.get("http://localhost:5000/Api/Parametre/KategorileriGetir",{ headers: {"Authorization" : `Bearer ${token}`} });
        this.setState({
            kategoris: response.data
        });
    }
    

    render() {
        return (
             <KategoriContext.Provider value = {this.state}>
                {this.props.children}
             </KategoriContext.Provider>
        )
    }
} 
const KategoriConsumer = KategoriContext.Consumer;

export default KategoriConsumer;