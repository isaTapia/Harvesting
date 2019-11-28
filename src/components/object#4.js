import React, { Component } from 'react'
import axios from 'axios'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
const dateFormat = require('dateformat');


const token = sessionStorage.getItem("Token")

export default class Product extends Component {
    state = {
        crops: [],
        plots:[],
        products:[],
        name:"",
        date: new Date(),
        plot:"",
        product:""


    }
    async componentDidMount(){
        const Datos = await axios.get("http://harvest-projection.herokuapp.com/crops", { headers: { "Authorization": `Bearer ${token}` } });
        const Datos2 = await axios.get("http://harvest-projection.herokuapp.com/plots", { headers: { "Authorization": `Bearer ${token}` } });
        const Datos3 = await axios.get("http://harvest-projection.herokuapp.com/products", { headers: { "Authorization": `Bearer ${token}` } });
        const plots = Datos.data
        this.setState({
            crops: Datos.data,
            plots: Datos2.data,
            products: Datos3.data
        })
    }
    onChangeDate = date => {
        this.setState({date})
    }

    onSubmit = async e => {
        e.preventDefault();
        await axios.post('http://harvest-projection.herokuapp.com/crops', 
        {
            cultivationDate: dateFormat( this.state.date,"yyyy-mm-dd"),
            plotId: this.state.plot,
            productId: this.state.product
        },
        
        
        { headers: { "Authorization": `Bearer ${token}`}});
    
       this.componentDidMount()

    }
    onInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onPlotChange = (e) => {
        this.setState({
            plot: e.target.value
        })
    }
    onProductChange = (e) => {
        this.setState({
            product: e.target.value
        })
    }

    deleteNote = async (id) => {
        console.log(id)
        await axios.delete('http://harvest-projection.herokuapp.com/crops/' + id, { headers: { "Authorization": `Bearer ${token}` }});
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
                                    <h5>{"Plot in "+crops.plot.name}</h5>
            
                                </div>
                                <div className="card-body">
                                <p>{"Plot data:"}</p>
                                    <p>{"Name of plot:"+" "+crops.plot.name}</p>
                                    <p>{"Latitude:"+" "+crops.plot.latitude}</p>
                                    <p>{"Longitude:"+" "+crops.plot.longitude}</p>
                                    <p>{"Product Data:"}</p>
                                    <p>{"Name of product:"+" "+crops.product.name}</p>
                                    <p>{"Maturity Threshold:"+" "+crops.product.maturityThreshold}</p>
                                    <p>{"Temperature Tolerance:"+" "+"Min: "+crops.product.temperatureTolerance.min+"℃ "+"Max: "+crops.product.temperatureTolerance.max+"℃"}</p>
                                    <p>{"Temperature Optimum:"+" "+"Min: "+crops.product.temperatureOptimum.min+"℃ "+"Max: "+crops.product.temperatureOptimum.max+"℃"}</p>
                                    <p>{"Dates"}</p>
                                    <p>{"Cultivation Date: "+crops.cultivationDate}</p>
                                    <p>{"ProjectedHarvest Date: "+crops.projectedHarvestDate}</p>
                                    <p>{"Updated At: "+crops.updatedAt}</p>




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
                <div className="col">
                 <div className="card card-body">
                        <h3>Create New crops</h3>
                        <form onSubmit={this.onSubmit}>
                        <div class="input-group input-group-sm mb-3">
                            
                        <div class="input-group-prepend">
    <span class="input-group-text" id="inputGroup-sizing-sm">Cultivation Date</span>
  </div>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    value={this.state.date}
                                    onChange={this.onChangeDate}
                                />
                                
                            </div>

                            <div className="form-group">
                        <DatePicker 
                            className="form-control" 
                            selected={this.state.date}
                            dateFormat="yyyy-MM-dd"
                            onChange={this.onChangeDate}
                        />
                    </div>

                                <div className="form-group">
                        <select 
                            className="form-control"
                            name="userSelected"
                            onChange={this.onPlotChange}
                            value={this.state.plot}
                            
                        >
                            {
                             this.state.plots.map(plots => 
                             <option key={plots._id} value={plots._id}>
                                 {plots.name}
                             </option> )   
                            }
                        </select>
                    </div>

                    <div className="form-group">
                        <select 
                            className="form-control"
                            name="userSelected"
                            onChange={this.onProductChange}
                            value={this.state.product}
                            
                        >
                            {
                             this.state.products.map(products => 
                             <option key={products._id} value={products._id}>
                                 {products.name}
                             </option> )   
                            }
                        </select>
                    </div>
                            
                            <button type="submit" className="btn btn-primary">
                                Save
                            </button>
                        </form>
                    </div>
           
                
            </div>
            </div>


            </div>
        )
    }
}
