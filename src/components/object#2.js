import React, { Component } from 'react'
import axios from 'axios'

const token = sessionStorage.getItem("Token")

export default class Plots extends Component {
    state = {
        crops: [],
        plots:"",
        name: "",
        logitude: "",
        latitude: ""
    }
    async componentDidMount(){
        const Datos = await axios.get("http://harvest-projection.herokuapp.com/plots", { headers: { "Authorization": `Bearer ${token}` } });
        const crops = Datos.data
        this.setState({
            crops: Datos.data
        })
        console.log(crops)
    }

    onSubmit = async e => {
        e.preventDefault();
        await axios.post('http://harvest-projection.herokuapp.com/plots', 
        {
             name: this.state.name,
            latitude: this.state.latitude,
            longitude:this.state.longitude
        },
        
        
        { headers: { "Authorization": `Bearer ${token}`}});
        this.setState({name: ''});
        this.setState({longitude: ''});
        this.setState({latitude: ''});
       this.componentDidMount()
     
    }
    onChangeName = (e) => {
        this.setState({
            name: e.target.value
        })
    }
    onChangeLongitude = (e) => {
        this.setState({
            longitude: e.target.value
        })
    }

    onChangeLatitude = (e) => {
        this.setState({
            latitude: e.target.value
        })
    }

    deleteNote = async (id) => {
        console.log(id)
        await axios.delete('http://harvest-projection.herokuapp.com/plots/' + id, { headers: { "Authorization": `Bearer ${token}` }});
       this.componentDidMount();
    }


    render() {
        return (
            <div>
            
            <div className="row">
                {
                    this.state.crops.map(crops => (
                        <div className="col-md-4 p-2" key={crops._id}>
                            <div className="card">
                            <div className="card-header d-flex justify-content-between"> 
                                    <h5>{crops.name}</h5>
            
                                </div>
                                <div className="card-body">
                                    <p>{"latitude:"+" "+crops.latitude}</p>
                                    <p>{"longitude:"+" "+crops.longitude}</p>
                                </div>
                            </div>
                            <div className="card-footer">
                                    <button 
                                        className="btn btn-danger" 
                                        onClick={() => this.deleteNote(crops._id)}
                            
                                    >
                                        Delete
                                    </button>
                                    
                                </div>
                                
                        </div>  
                                                  
                    ))
                }
                
            </div>

            <div className="card card-body">
                        <h3>Create New Plot</h3>
                        <form onSubmit={this.onSubmit}>
                        <div class="input-group input-group-sm mb-3">
                            
                        <div class="input-group-prepend">
    <span class="input-group-text" id="inputGroup-sizing-sm">Name</span>
  </div>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    value={this.state.name}
                                    onChange={this.onChangeName}
                                />
                                
                            </div>

                            <div class="input-group input-group-sm mb-3">
                            
                            <div class="input-group-prepend">
        <span class="input-group-text" id="inputGroup-sizing-sm">Longitude</span>
      </div>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        value={this.state.latitude}
                                        onChange={this.onChangeLatitude}
                                    />
                                    
                                </div>

                                
                                <div class="input-group input-group-sm mb-3">
                            
                            <div class="input-group-prepend">
        <span class="input-group-text" id="inputGroup-sizing-sm">Latitude</span>
      </div>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        value={this.state.longitude}
                                        onChange={this.onChangeLongitude}
                                    />
                                    
                                </div>
                            
                            
                            <button type="submit" className="btn btn-primary">
                                Save
                            </button>
                        </form>
                    </div>
            </div>
        )
    }
}
