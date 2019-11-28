import React, { Component } from 'react'
import axios from 'axios'

const axiosInstance = axios.create({
    headers: {
        Authorization: `Bearer ${sessionStorage.getItem('Token')}`,
        // este lo ocupas si estas enviando un JSON al api:
        'Content-Type': 'application/json'
    }
})

export default class Login extends Component {
    state = {
        email: '',
        password: ""
    }

    

    onSubmit = async e => {
        e.preventDefault();
        const use = await axios.post('http://harvest-projection.herokuapp.com/session', {
            email: this.state.email,
            password: this.state.password
        })
        const {token,_id,name,mail,plotlist} = use.data;
        this.setState({email: ''});
        this.setState({password: ''});
        sessionStorage.setItem('Token', token);
        console.log(axiosInstance)
    }

    onChangeUsername = (e) => {
        this.setState({
            email: e.target.value
        })
    }

    onChangeEmial = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-4">
                    <div className="card card-body">
                        <form onSubmit={this.onSubmit}>
                        <div class="input-group input-group-sm mb-3">
                            
                        <div class="input-group-prepend">
    <span class="input-group-text" id="inputGroup-sizing-sm">Username</span>
  </div>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    value={this.state.email}
                                    onChange={this.onChangeUsername}
                                />
                                
                            </div>

                            <div class="input-group input-group-sm mb-3">
                            
                            <div class="input-group-prepend">
        <span class="input-group-text" id="inputGroup-sizing-sm">Password</span>
      </div>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        value={this.state.password}
                                        onChange={this.onChangeEmial}
                                    />
                                    
                                </div>
                            
                            
                            
                            <button type="submit" className="btn btn-primary">
                                Login
                            </button>
                        </form>
                    </div>
                </div>
           </div>
        )
    }
}
