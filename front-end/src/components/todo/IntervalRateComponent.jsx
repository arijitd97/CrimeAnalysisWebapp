import React, { Component } from 'react';
import {BrowserRouter as Router, Link, Route, Switch, useRoutes} from 'react-router-dom'
import AuthenticationService from './AuthenticationService.js';
import HelloWorldService from '../../api/todo/HelloWorldService.js';
import TodoDataService from '../../api/todo/TodoDataService.js';
import ProjectService from '../../api/todo/ProjectService.js';
import { Bar } from 'react-chartjs-2';
import { LineChart } from './Chart_IntervalRate.js';
import Chart from 'chart.js/auto'
class IntervalRateComponent extends Component{

    constructor(props){
        super(props)
        this.state = {
            timeInterval : '0-4',
            testTitle : 'Arijit',
            startYear : 2015,
            endYear : 2019,
            todos:[],
            setChartData:{
                labels : '',
                datasets : []
            },
            midnight: [],
            earlyMorning: [],
            morning: [],
            afternoon: [],
            evening: [],
            night: []
            


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
        // ProjectService.executeIntervalRate(this.state.timeInterval, this.state.startYear, this.state.endYear)
        // .then(
        //     response => {
        //         console.log("Incoming response @@@@ " + response.data);
        //         this.setState({
        //             todos: response.data
        //         })
        //         this.setState({
        //             setChartData : ({
        //                 labels : response.data.map(todo => todo[1] + "/" + todo[2]),
        //                 // labels : response.data.map(todo => {
        //                 //     todo[0] + todo[1]
        //                 // }),
        //                 datasets: [
        //                     {
        //                         label : "dummy label",
        //                         data :response.data.map (todo => todo[0]),
        //                         backgroundColor: [
        //                             "#ffbb11",
        //                             "#ecf0f1",
        //                             "#50AF95",
        //                             "#f3ba2f",
        //                             "#2a71d0"
        //                           ]
        //                     },
        //                     // {
        //                     //     label : "dummy label",
        //                     //     data :response.data.map (todo => todo[0] + 100),
        //                     //     backgroundColor: [
        //                     //         "#ffbb11",
        //                     //         "#ecf0f1",
        //                     //         "#50AF95",
        //                     //         "#f3ba2f",
        //                     //         "#2a71d0"
        //                     //       ]
        //                     // }
        //                  ]
        //             })
        //         })
                
        //         console.log("@@@@@@@@@" + this.state.setChartData.labels)
        //         console.log("@@@@@@@@@" + this.state.setChartData.datasets[0].data)
        //     }
            
        // )
    }

    fetchStats(){
        ProjectService.executeIntervalRate(this.state.timeInterval, this.state.startYear, this.state.endYear)
        .then(
            response => {
                console.log("Response received @@@@")

                console.log(response.data.Teens)
                this.setState({
                    //todos: response.data
                    midnight : response.data.midnight,
                    earlymorning : response.data.earlyMorning,
                    morning : response.data.morning,
                    afternoon : response.data.afternoon,
                    evening : response.data.evening,
                    night: response.data.night,
                })

                this.setState({
                    setChartData : ({
                        labels : response.data.midnight.map(todo => todo[1] + "/" + todo[2]),
                        // labels : response.data.map(todo => {
                        //     todo[0] + todo[1]
                        // }),
                        datasets: [
                            {
                                label : "midnight",
                                data :response.data.midnight.map (todo => todo[0]),
                                backgroundColor: [
                                    "#ffbb11",
                                  ]
                            },
                            {
                                label : "early morning",
                                data :response.data.earlyMorning.map (todo => todo[0]),
                                backgroundColor: [
                                    "#50AF95",
                                  ]
                            },
                            {
                                label : "morning",
                                data :response.data.morning.map (todo => todo[0]),
                                backgroundColor: [
                                    "#a150af",
                                  ]
                            },
                            {
                                label : "afternoon",
                                data :response.data.afternoon.map (todo => todo[0]),
                                backgroundColor: [
                                    "#af5d50",
                                  ]
                            },
                            {
                                label : "evening",
                                data :response.data.evening.map (todo => todo[0]),
                                backgroundColor: [
                                    "#5533FF",
                                  ]
                            },
                            {
                                label : "night",
                                data :response.data.night.map (todo => todo[0]),
                                backgroundColor: [
                                    "#FF33F9",
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
            }

            // response => {
            //     console.log("Incoming response @@@@ " + response.data);
            //     this.setState({
            //         todos: response.data
            //     })
            //     this.setState({
            //         setChartData : ({
            //             labels : response.data.map(todo => todo[1] + "/" + todo[2]),
            //             // labels : response.data.map(todo => {
            //             //     todo[0] + todo[1]
            //             // }),
            //             datasets: [
            //                 {
            //                     label : "number of crimes",
            //                     data :response.data.map (todo => todo[0]),
            //                     backgroundColor: [
            //                         "#ffbb11",
            //                         // "#ecf0f1",
            //                         // "#50AF95",
            //                         // "#f3ba2f",
            //                         // "#2a71d0"
            //                       ]
            //                 },
            //                 // {
            //                 //     label : "dummy label",
            //                 //     data :response.data.map (todo => todo[0] + 100),
            //                 //     backgroundColor: [
            //                 //         "#ffbb11",
            //                 //         "#ecf0f1",
            //                 //         "#50AF95",
            //                 //         "#f3ba2f",
            //                 //         "#2a71d0"
            //                 //       ]
            //                 // }
            //              ]
            //         })
            //     })
                
            //     console.log("@@@@@@@@@" + this.state.setChartData.labels)
            //     console.log("@@@@@@@@@" + this.state.setChartData.datasets[0].data)
            // }
            
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
                    {/* <div className="container col-sm-2">
                        <label for="timeInterval">Time Interval</label>
                        <select id="timeInterval" class="custom-select" name="timeInterval" onChange={this.handleChange}>
                                            <option value="">Please select</option>
                                            <option value="0-4">0-4</option>
                                            <option value="4-8">4-8</option>
                                            <option value="8-12">8-12</option>
                                            <option value="12-16">12-16</option>
                                            <option value="16-20">16-20</option>
                                            <option value="20-24">20-24</option>
                        </select>
                        
                        
                    </div> */}
                    <div className="container col-sm-4">
                        Start Year : <select  class="custom-select" name="startYear" onChange={this.handleChange}>
                                            <option value="">Please select</option>
                                            <option value="2015">2015</option>
                                            <option value="2016">2016</option>
                                            <option value="2017">2017</option>
                                            <option value="2018">2018</option>
                                            <option value="2019">2019</option>
                                        </select>
                    </div>
                    <div className="container col-sm-4">
                        End Year : <select  class="custom-select" name="endYear" onChange={this.handleChange}>
                                            <option value="">Please select</option>
                                            <option value="2015">2015</option>
                                            <option value="2016">2016</option>
                                            <option value="2017">2017</option>
                                            <option value="2018">2018</option>
                                            <option value="2019">2019</option>
                                        </select>
                    </div>
                    {/* <div className="container col-sm-2 row-sm-2">
                        <button id="fetchbutton" className="btn btn-success" onClick={this.fetchStats}>Fetch Stats</button>
                    </div> */}

                    
                    {/* <input type="text" value={this.state.timeInterval}/> */}
                    {/* Start Year: <input type="text" name="startYear" value={this.state.startYear} onChange={this.handleChange}/>
                    End Year: <input type="text" name="endYear" value={this.state.endYear} onChange={this.handleChange}/> */}
                </div>
                {/* Start Hour: <input type="text" name="intervalStartHour" value={this.state.intervalStartHour} onChange={this.handleChange}/>
                End Hour: <input type="text" name="intervalEndHour" value={this.state.intervalEndHour} onChange={this.handleChange}/> */}
                <div className="container">
                    <button className="btn btn-success" onClick={this.fetchStats}>Fetch Stats</button>
                </div>
                
                {/* <h1>Interval Rate</h1> */}
                {/* <div className="container">
                    <canvas id="speedChart" width="600" height="400"></canvas>
                </div> */}
                <div className="container">
                    <LineChart chartData={this.state.setChartData}></LineChart>
                </div>
                
                {/* <div className="container">
                    <Bar data={this.state.setChartData}></Bar>
                </div> */}

            
            </div>
        )
    }
}

export default IntervalRateComponent