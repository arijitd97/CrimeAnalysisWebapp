import React, { Component } from 'react';
import {BrowserRouter as Router, Link, Route, Switch, useRoutes} from 'react-router-dom'
import AuthenticationService from './AuthenticationService.js';
import HelloWorldService from '../../api/todo/HelloWorldService.js';
import TodoDataService from '../../api/todo/TodoDataService.js';
import ProjectService from '../../api/todo/ProjectService.js';
import { Bar } from 'react-chartjs-2';
import { LineChart } from './Chart_IntervalRate.js';
import Chart from 'chart.js/auto'
import { LineChartLocationCrime } from './Chart_LocationCrime.js';

class LocationCrimeComponent extends Component{

    constructor(props){
        super(props)
        this.state = {
            location : 'Home',
            testTitle : 'Arijit',
            startYear : 2015,
            endYear : 2019,
            todos:[],
            setChartData:{
                labels : '',
                datasets : []
            },



        }
        this.handleChange = this.handleChange.bind(this);
        this.fetchStats = this.fetchStats.bind(this);
        this.testTitle = this.testTitle.bind(this);
    }

    //lifecycle method
    // componentDidMount() {
    //     TodoDataService.retrieveAllTodos()
    //     .then(
    //         response => {
    //             this.setState({
    //                 todos: response.data
    //             })
    //         }

    //     )
    // }
    //

    componentWillUnmount(){
        console.log("compoenentWillUnmount")
    }

    shouldComponentUpdate(nextProps, nextState){
        console.log("shouldComponentUpdate")
        console.log(nextProps)
        console.log(nextState)
        return true;  // if this is set to false component wont be updated or rerendered. Normally some logic is put here.
    }

    handleChange(event){
        console.log(event.target.name);
        this.setState(
            {
                [event.target.name] : event.target.value
            }
        )
        console.log("in handle change : location selected is " + this.state.location)

    }

    fetchStats(){
        ProjectService.executeLocationCrime(this.state.location, this.state.startYear, this.state.endYear)
        .then(
            response => {
                console.log("Incoming response @@@@ " + response.data);
                this.setState({
                    todos: response.data
                })
                this.setState({
                    setChartData : ({
                        labels : response.data.map(todo => todo[1] + "/" + todo[2]),
                        // labels : response.data.map(todo => {
                        //     todo[0] + todo[1]
                        // }),
                        datasets: [
                            {
                                label : "number of crimes",
                                data :response.data.map (todo => todo[0]),
                                backgroundColor: [
                                    "#ffbb11",
                                    // "#ecf0f1",
                                    // "#50AF95",
                                    // "#f3ba2f",
                                    // "#2a71d0"
                                  ]
                            },
                            // {
                            //     label : "dummy label",
                            //     data :response.data.map (todo => todo[0] + 100),
                            //     backgroundColor: [
                            //         "#ffbb11",
                            //         "#ecf0f1",
                            //         "#50AF95",
                            //         "#f3ba2f",
                            //         "#2a71d0"
                            //       ]
                            // }
                         ]
                    })
                })
                
                console.log("@@@@@@@@@" + this.state.setChartData.labels)
                console.log("@@@@@@@@@" + this.state.setChartData.datasets[0].data)
            }
            
        )
    }

    testTitle(){
        ProjectService.executeTest(this.state.testTitle)
        .then(
            response => {
                console.log(response)
            }
        )
    }

    render(){
        return(
            <div>
                <div className="row">                
                    <div className="container col-sm-2">
                        <label for="location">Location Types</label>
                        <select id="location" class="custom-select" name="location" onChange={this.handleChange}>
                                            <option value="">Please select</option>
                                            <option value="Home">Home</option>
                                            <option value="Remote">Remote Places</option>
                                            <option value="School-College">School-College</option>
                                            <option value="Medical facility">Medical Facility</option>
                                            <option value="Highway">Highway</option>
                                            {/* <option value="Tourist">Tourist</option>
                                            <option value="Cyber">Cyber</option> */}
                                            <option value="Office">Office</option>
                                            <option value="Parking">Parking</option>
                                            <option value="Banks">Banks</option>
                                            <option value="Hotel-Restauarant">Hotel-Restaurant</option>
                                            <option value="Bars">Bars</option>
                                            <option value="Religious">Religious Places</option>
                                            <option value="Stores">Stores</option>
                                            <option value="Gas-Station">Gas-Station</option>
                                            
                                        </select>
                        
                        
                    </div>
                    <div className="container col-sm-2">
                        Start Year : <select  class="custom-select" name="startYear" onChange={this.handleChange}>
                                            <option value="">Please select</option>
                                            <option value="2015">2015</option>
                                            <option value="2016">2016</option>
                                            <option value="2017">2017</option>
                                            <option value="2018">2018</option>
                                            <option value="2019">2019</option>
                                        </select>
                    </div>
                    <div className="container col-sm-2">
                        End Year : <select  class="custom-select" name="endYear" onChange={this.handleChange}>
                                            <option value="">Please select</option>
                                            <option value="2015">2015</option>
                                            <option value="2016">2016</option>
                                            <option value="2017">2017</option>
                                            <option value="2018">2018</option>
                                            <option value="2019">2019</option>
                                        </select>
                    </div>
                    {/* <input type="text" value={this.state.timeInterval}/> */}
                    {/* Start Year: <input type="text" name="startYear" value={this.state.startYear} onChange={this.handleChange}/>
                    End Year: <input type="text" name="endYear" value={this.state.endYear} onChange={this.handleChange}/> */}
                </div>
                {/* Start Hour: <input type="text" name="intervalStartHour" value={this.state.intervalStartHour} onChange={this.handleChange}/>
                End Hour: <input type="text" name="intervalEndHour" value={this.state.intervalEndHour} onChange={this.handleChange}/> */}
                <div className="container">
                    <button className="btn btn-success" onClick={this.fetchStats}>Fetch Stats</button>
                    {/* <button className="btn btn-success" onClick={this.testTitle}>Test Title</button> */}
                </div>
                
                {/* <h1>Location Crime Stats</h1> */}
                {/* <div className="container">
                    <canvas id="speedChart" width="600" height="400"></canvas>
                </div> */}
                <div className="container">
                    <LineChartLocationCrime chartData={this.state.setChartData}></LineChartLocationCrime>
                </div>
                
                {/* <div className="container">
                    <Bar data={this.state.setChartData}></Bar>
                </div> */}

                <div className="container">
                    
                </div>
            </div>
        )
    }
}

export default LocationCrimeComponent