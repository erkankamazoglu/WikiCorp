import axios from 'axios';
import React, { Component } from 'react' 

const KullaniciRolContext = React.createContext();
//Provider, Consumer
const reducer = (state, action) => {
    switch(action.type) {
        case "DELETE_KULLANICIROL" : 
            return {
                ...state,
                kullaniciRols: state.kullaniciRols.filter(kullaniciRol => action.payload !== kullaniciRol.id)
            }
        case "ADD_KULLANICIROL" :
            return {
                ...state,
                kullaniciRols : [...state.kullaniciRols, action.payload]
            }
        case "UPDATE_KULLANICIROL" :
            return {
                ...state,
                kullaniciRols : state.kullaniciRols.map(kullaniciRol => kullaniciRol.id === action.payload.id ? action.payload : kullaniciRol)
            }
        default :
            return state
    }
}


export class KullaniciRolProvider extends Component {

    state = {
        kullaniciRols: [],
        dispatch : action =>  {
            this.setState(state => reducer(state, action))
        }
    }

    componentDidMount = async() => {  
        const token = sessionStorage.getItem('token'); 
        const response = await axios.get("http://localhost:5000/Api/Parametre/KullaniciRolleriGetir",{ headers: {"Authorization" : `Bearer ${token}`} });
        this.setState({
            kullaniciRols: response.data
        });
    }
    

    render() {
        return (
             <KullaniciRolContext.Provider value = {this.state}>
                {this.props.children}
             </KullaniciRolContext.Provider>
        )
    }
} 
const KullaniciRolConsumer = KullaniciRolContext.Consumer;

export default KullaniciRolConsumer;