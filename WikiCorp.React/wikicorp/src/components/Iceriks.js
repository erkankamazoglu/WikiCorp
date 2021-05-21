import React, { Component } from 'react'
import Icerik from "./Icerik"; 
import IcerikConsumer from "../contexts/Context";

class Iceriks extends Component {
    render() {

        return (
            <IcerikConsumer>
                {
                    value => {
                        const {iceriks} = value; 

                        return (
                            <div>
                                {
                                    iceriks.map(icerik => {
                                        return (
                                            <Icerik  
                                            key = {icerik.id}
                                            id = {icerik.id}
                                            baslik = {icerik.baslik}
                                            icerigi = {icerik.icerigi}
                                            kategoriId = {icerik.kategoriId}
                                            />
                                        )
                                    })
                                }
                            </div>
                        )
                    }
                }
            </IcerikConsumer>
        )        
    }
}

export default Iceriks;