import axios from 'axios';
import React, { Component } from 'react' 

const RolContext = React.createContext();
//Provider, Consumer
const reducer = (state, action) => {
    switch(action.type) {
        case "DELETE_ROL" : 
            return {
                ...state,
                rols: state.rols.filter(rol => action.payload !== rol.id)
            }
        case "ADD_ROL" :
            return {
                ...state,
                rols : [...state.rols, action.payload]
            }
        case "UPDATE_ROL" :
            return {
                ...state,
                rols : state.rols.map(rol => rol.id === action.payload.id ? action.payload : rol)
            }
        default :
            return state
    }
}


export class RolProvider extends Component {

    state = {
        rols: [],
        dispatch : action =>  {
            this.setState(state => reducer(state, action))
        }
    }

    componentDidMount = async() => {  
        const token = sessionStorage.getItem('token'); 
        const response = await axios.get("http://localhost:5000/Api/Parametre/RolleriGetir",{ headers: {"Authorization" : `Bearer ${token}`} });

        this.setState({
            rols: response.data
        });
    }
    

    render() {
        return (
             <RolContext.Provider value = {this.state}>
                {this.props.children}
             </RolContext.Provider>
        )
    }
} 
const RolConsumer = RolContext.Consumer;

export default RolConsumer;