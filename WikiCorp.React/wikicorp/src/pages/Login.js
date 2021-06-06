import React, { Component } from 'react'  
import axios from 'axios'

class Login extends Component {

    changeInput = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    } 

    login = async (e) => {
        e.preventDefault();
        const {username,password} = this.state;
        const loginInfo = { username, password };

        const response = await axios.post("http://localhost:5000/Api/Kullanici/Giris", loginInfo)
            .catch(function () {
                alert("Lütfen kullanıcı bilgilerinizi kontrol edin.")
            });

        if(response !== undefined) {
            const loginInfoResult = response.data;
            if(response.data['token']) {
                sessionStorage.setItem('token',loginInfoResult.token); 
                //Redirect
                window.open("/","_self"); 
            }
        }
    }

    render() {
        return ( 
            <div className = "col-md-4 mb-4 pb-4 pt-4" style = {{backgroundImage: "linear-gradient(115deg,rgb(164 40 103), rgb(59 121 209)", marginLeft: "35%", marginTop: "10%"}}>
                <form onSubmit= {this.login.bind(this)}>
                    <div className="form-group">
                        <h2 className="pb-2" style={{color:"white", borderBottom: "2px dotted white"}}>WikiCorp</h2> 
                    </div>
                    <div className="form-group">
                        <label htmlFor="username" style={{color:"white"}}>Kullanıcı Adı</label>
                        <input type="text" name="username" id="username" className = "form-control" onChange={this.changeInput}></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password" style={{color:"white"}}>Şifre</label>
                        <input type="password" name="password" id="password" className = "form-control" onChange={this.changeInput}></input>
                    </div>
                    <button className="btn btn-light btn-block mb-4" type="submit" ><i className="fas fa-sign-in-alt mr-2"></i>Giriş Yap</button>
                </form>
            </div> 
        )
    }
}

export default Login;
