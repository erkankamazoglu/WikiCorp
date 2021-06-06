import axios from 'axios';
import React, { Component } from 'react' 

const IcerikContext = React.createContext();
//Provider, Consumer
const reducer = (state, action) => {
    switch(action.type) {
        case "DELETE_ICERIK" : 
            return {
                ...state,
                iceriks: state.iceriks.filter(icerik => action.payload !== icerik.id)
            }
        case "ADD_ICERIK" :
            return {
                ...state,
                iceriks : [...state.iceriks, action.payload]
            }
        case "UPDATE_ICERIK" :
            return {
                ...state,
                iceriks : state.iceriks.map(icerik => icerik.id === action.payload.id ? action.payload : icerik)
            }
        default :
            return state
    }
}


export class IcerikProvider extends Component {

    state = {
        iceriks: [],
        dispatch : action =>  {
            this.setState(state => reducer(state, action))
        }
    }

    componentDidMount = async() => {  
        const token = sessionStorage.getItem('token'); 
        const response = await axios.get("http://localhost:5000/Api/Icerik/IcerikleriGetir",{ headers: {"Authorization" : `Bearer ${token}`} });

        this.setState({
            iceriks: response.data
        });
    }
    

    render() {
        return (
             <IcerikContext.Provider value = {this.state}>
                {this.props.children}
             </IcerikContext.Provider>
        )
    }
} 
const IcerikConsumer = IcerikContext.Consumer;

export default IcerikConsumer;