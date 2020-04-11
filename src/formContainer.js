import React, { Component } from 'react'
import * as countries from "./countries"
import * as cityIndia from "./indianCities"
import * as cityCanada from "./canadaCities"
import * as cityUs from "./usCities"
export default class formContainer extends Component {

    constructor() {
        super();
        this.state = { countries: countries.default, cities: cityIndia.default }
    }

    ///change caounty and city
    changeCountry = (e) => {
        console.log(e.target.value);
        var country = e.target.value;
        if ("India" === country) {
          
            this.setState({
                cities: cityIndia.default
            })
        }
        else if ("United States" === country) {
          
            this.setState({
                cities: cityUs.default
            })
        }
        else if ("Canada" === country) {
      

            this.setState({
                cities: cityCanada.default
            })
        }
        else {
            this.setState({
                cities: []
            })


        }

    }

    changeCity =(e)=>{
        var city = e.target.value;
        console.log(city);
        fetch('http://api.openweathermap.org/data/2.5/weather?q='+city+'&APPID=68905d1064bc656c58d9f4ebf45b9e95').then((response) => {
          response.json().then((result) => {
            this.setState({
              temp: result
            })
          })
        })
    }


    render() {
        //console.log(this.state.cityUs)
        return (
            <div className="container" >
                <h1>Weather App</h1>
                <form>

                </form>
                <div className="row  p-5">
                <lable className="bg-danger col-3 p-3 ">Choose Country:</lable>
                <select id="countries" className="col-2 p-3" onChange={this.changeCountry}>
                    {this.state.countries.map((index) =>
                        (
                            <option value={index.name}>{index.name}</option>
                        ))
                    }
                </select>
                </div>
                <div className="row p-5">
                <lable className="bg-danger col-3 p-3 ">Choose City:</lable>
              
             <select className="col-2 p-3" onChange={this.changeCity}>
                    {this.state.cities.map((index) =>
                        (
                            <option value={index.name}>{index.name}</option>
                        ))
                    }
                </select>
                </div>
             <h4>Current tempereture is : {this.state.city}  { this.state.temp ? (this.state.temp.main.temp-273.15) : ' Select the city First'} C </h4>

            </div>
        )
    }
}
