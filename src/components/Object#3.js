import React, { Component } from 'react'
import axios from 'axios'

const token = sessionStorage.getItem("Token")

export default class Product extends Component {
    state = {
        products: [],
        plots:"",
        name: "",
        maturityThreshold: "",
        temperatureTolerancemin:"",
        temperatureOptimumMin:"",
        temperatureOptimumMax:"",
        temperatureTolerancemax:"",
        temperatureTolerance: "",
        temperatureOptimum: ""

    }
    async componentDidMount(){
        const Datos = await axios.get("http://harvest-projection.herokuapp.com/products", { headers: { "Authorization": `Bearer ${token}` } });
        const plots = Datos.data
        this.setState({
            products: Datos.data
        })
    }

    onSubmit = async e => {
        e.preventDefault();
        await axios.post('http://harvest-projection.herokuapp.com/products', 
        {
            name: this.state.name,
            maturityThreshold: this.state.maturityThreshold,
            temperatureTolerance: {min: Number(this.state.temperatureTolerancemin),max: Number (this.state.temperatureTolerancemax)}, 
            temperatureOptimum: {min:Number (this.state.temperatureOptimumMin), max: Number(this.state.temperatureOptimumMax)} 
        },
        
        
        { headers: { "Authorization": `Bearer ${token}`}});
        this.setState({name: ''});
        this.setState({maturityThreshold: ''});
        this.setState({temperatureTolerancemin: ''});
        this.setState({temperatureTolerancemax: ''});
        this.setState({temperatureOptimumMin: ''});
        this.setState({temperatureOptimumMax: ''});
       this.componentDidMount()
     
    }
    onChangeName = (e) => {
        this.setState({
            name: e.target.value
        })
    }
    onChangeMT = (e) => {
        this.setState({
            maturityThreshold: e.target.value
        })
    }
    onChangeTTmin = (e) => {
        this.setState({
            temperatureTolerancemin: e.target.value
        })
    }

    onChangeTOmax = (e) => {
        this.setState({
            temperatureOptimumMax: e.target.value
        })
    }

    onChangeTOmin = (e) => {
        this.setState({
            temperatureOptimumMin: e.target.value
        })
    }

    onChangeTTmax = (e) => {
        this.setState({
            temperatureTolerancemax: e.target.value
        })
    }

    onChangeLatitude = (e) => {
        this.setState({
            latitude: e.target.value
        })
    }

    deleteNote = async (id) => {
        console.log(id)
        await axios.delete('http://harvest-projection.herokuapp.com/products/' + id, { headers: { "Authorization": `Bearer ${token}` }});
       this.componentDidMount();
    }


    render() {
        return (
            <div>
            
            <div className="row">
                {
                    this.state.products.map(products => (
                        <div className="col-md-4 p-2" key={products._id}>
                            <div className="card">
                            <div className="card-header d-flex justify-content-between"> 
                                    <h5>{products.name}</h5>
            
                                </div>
                                <div className="card-body">
                                    <p>{"Maturity Threshold:"+" "+products.maturityThreshold}</p>
                                    <p>{"Temperature Tolerance:"+" "+" Min: "+products.temperatureTolerance.min + "℃"+" "+"Max: "+products.temperatureTolerance.max+ "℃"}</p>
                                    <p>{"Temperature Optimum:"+" "+" Min: "+products.temperatureOptimum.min + "℃"+" "+"Max: "+products.temperatureOptimum.max+ "℃"}</p>
                                </div>
                            </div>
                            <div className="card-footer">
                                    <button 
                                        className="btn btn-danger" 
                                        onClick={() => this.deleteNote(products._id)}
                            
                                    >
                                        Delete
                                    </button>
                                    
                                </div>
                                
                        </div>  
                                                  
                    ))
                }
                
            </div>

            <div className="card card-body">
                        <h3>Create New Product</h3>
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
    <span class="input-group-text" id="inputGroup-sizing-sm">Maturity Threshold</span>
  </div>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    value={this.state.maturityThreshold}
                                    onChange={this.onChangeMT}
                                />
                                
                            </div>

                            

                            

                            <label for="customRange3">Temperature Tolerance Min</label>
<input type="range" class="custom-range" min="0" max="80" step="1" id="customRange3" onChange={this.onChangeTTmin} />

                                
                                <div class="input-group input-group-sm mb-3">
                            
                            <div class="input-group-prepend">
        <span class="input-group-text" id="inputGroup-sizing-sm">Min</span>
      </div>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        value={this.state.temperatureTolerancemin}
                                        onChange={this.onChangeTTmin}
                                    />
                                    
                                </div>


                                <label for="customRange3">Temperature Tolerance Max</label>
<input type="range" class="custom-range" min="0" max="80" step="1" id="customRange3" onChange={this.onChangeTTmax} />

                                
                                <div class="input-group input-group-sm mb-3">
                            
                            <div class="input-group-prepend">
        <span class="input-group-text" id="inputGroup-sizing-sm">Max</span>
      </div>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        value={this.state.temperatureTolerancemax}
                                        onChange={this.onChangeTTmax}
                                    />
                                    
                                </div>
                                
                                <label for="customRange3">Temperature Optimum Min</label>
<input type="range" class="custom-range" min="0" max="80" step="1" id="customRange3" onChange={this.onChangeTOmin} />

                                
                                <div class="input-group input-group-sm mb-3">
                            
                            <div class="input-group-prepend">
        <span class="input-group-text" id="inputGroup-sizing-sm">Min</span>
      </div>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        value={this.state.temperatureOptimumMin}
                                        onChange={this.onChangeTTmin}
                                    />
                                    
                                </div>


                                <label for="customRange3">Temperature Optimum Max</label>
<input type="range" class="custom-range" min="0" max="80" step="1" id="customRange3" onChange={this.onChangeTOmax} />

                                
                                <div class="input-group input-group-sm mb-3">
                            
                            <div class="input-group-prepend">
        <span class="input-group-text" id="inputGroup-sizing-sm">Max</span>
      </div>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        value={this.state.temperatureOptimumMax}
                                        onChange={this.onChangeTTmax}
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
