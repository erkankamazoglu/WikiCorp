import React, { Component } from 'react'   
import { Link } from 'react-router-dom'

class Logout extends Component {
 
    componentDidMount = async() => { 
        sessionStorage.clear();
    }

    render() {
        return ( 
            <div className = "col-md-4 mb-4 pb-4 pt-4" style = {{backgroundImage: "linear-gradient(115deg,rgb(164 40 103), rgb(59 121 209)", marginLeft: "35%", marginTop: "10%"}}>
                <div className="form-group">
                        <h2 className="pb-2" style={{color:"white", borderBottom: "2px dotted white"}}>WikiCorp</h2> 
                </div>
                <div className="form-group">
                    <p style= {{color:"white"}}>Çıkış işleminiz gerçekleştirilmiştir.</p>
                </div> 
                <div className="form-group">
                    <Link to="/login" className="btn btn-success btn-block">
                        <i className="fas fa-person-booth mr-2"></i>
                        Tekrar Giriş Yapmak İçin Tıklayınız
                    </Link>
                </div> 
            </div> 
        )
    }
}

export default Logout; 