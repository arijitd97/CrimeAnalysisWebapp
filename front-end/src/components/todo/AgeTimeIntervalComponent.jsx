import React, { Component } from 'react';
import {BrowserRouter as Router, Link, Route, Switch, useRoutes} from 'react-router-dom'
import AuthenticationService from './AuthenticationService.js';
import HelloWorldService from '../../api/todo/HelloWorldService.js';
import TodoDataService from '../../api/todo/TodoDataService.js';
import ProjectService from '../../api/todo/ProjectService.js';
import { LineChart } from './Chart_IntervalRate.js';
import { LineChartAgeTimeInterval } from './Chart_AgeTimeInterval.js';
class AgeTimeIntervalComponent extends Component{

    constructor(props){
        super(props)
        this.state = {
            startYear : 2015,
            endYear : 2019,
            testTitle : 'Arijit',
            todos:[],
            timeInterval: '0-4',
            kids : [],
            teens : [],
            adults : [],
            middleage : [],
            above60 : [],
            setChartData:{
                labels : '',
                datasets : []
            },


        }
        this.handleChange = this.handleChange.bind(this);
        this.fetchStats = this.fetchStats.bind(this);
        this.testTitle = this.testTitle.bind(this);
    }

 

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
    }

    fetchStats(){
        ProjectService.executeAgeTimeInterval(this.state.timeInterval, this.state.startYear, this.state.endYear)
        .then(
            response => {
                console.log("Response received @@@@")

                console.log(response.data.Teens)
                this.setState({
                    //todos: response.data
                    kids : response.data.Kids,
                    teens : response.data.Teens,
                    adults : response.data.Adults,
                    middleage : response.data.MiddleAge,
                    above60 : response.data.Above60
                })

                this.setState({
                    setChartData : ({
                        labels : response.data.Kids.map(todo => todo[1] + "/" + todo[2]),
                        // labels : response.data.map(todo => {
                        //     todo[0] + todo[1]
                        // }),
                        datasets: [
                            {
                                label : "0-15",
                                data :response.data.Kids.map (todo => todo[0]),
                                backgroundColor: [
                                    "#ffbb11",
                                  ]
                            },
                            {
                                label : "16-25",
                                data :response.data.Teens.map (todo => todo[0]),
                                backgroundColor: [
                                    "#50AF95",
                                  ]
                            },
                            {
                                label : "26-40",
                                data :response.data.Adults.map (todo => todo[0]),
                                backgroundColor: [
                                    "#a150af",
                                  ]
                            },
                            {
                                label : "41-60",
                                data :response.data.MiddleAge.map (todo => todo[0]),
                                backgroundColor: [
                                    "#2a71d0",
                                  ]
                            },
                            {
                                label : "Above 60",
                                data :response.data.Above60.map (todo => todo[0]),
                                backgroundColor: [
                                    "#af5d50",
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
                <button className="btn btn-success" onClick={this.fetchStats}>Fetch Stats</button>

                <div className="container">
                    <LineChartAgeTimeInterval chartData={this.state.setChartData}></LineChartAgeTimeInterval>
                </div>
                
                {/* <button className="btn btn-success" onClick={this.testTitle}>Test Title</button> */}
                <div className="container">
                    
                </div>
                <div className="container">
                    
                </div>
                <div className="container">
                    
                </div>
                <div className="container">
                    
                </div>
                <div className="container">
                    
                </div>
            </div>
        )
    }
}

export default AgeTimeIntervalComponent