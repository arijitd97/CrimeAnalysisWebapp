import React, { Component } from 'react';
import {BrowserRouter as Router, Link, Route, Switch, useRoutes} from 'react-router-dom'
import AuthenticationService from './AuthenticationService.js';
import HelloWorldService from '../../api/todo/HelloWorldService.js';
import TodoDataService from '../../api/todo/TodoDataService.js';
import ProjectService from '../../api/todo/ProjectService.js';
import { Bar } from 'react-chartjs-2';
import { LineChart } from './Chart_IntervalRate.js';
import Chart from 'chart.js/auto'
import { LineChartRaceRelation } from './Chart_RaceRelation.js';
class RaceRelationshipCrimeComponent extends Component{

    constructor(props){
        super(props)
        this.state = {
            relation : 'Spouse',
            testTitle : 'Arijit',
            startYear : 2015,
            endYear : 2019,
            todos:[],
            setChartData:{
                labels : '',
                datasets : []
            },
            asian : [],
            black : [],
            white : [],


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

    }

    fetchStats(){
        ProjectService.executeRaceRelation(this.state.relation, this.state.startYear, this.state.endYear)
        .then(
            response => {
                console.log("Response received @@@@")

                console.log(response.data.Teens)
                this.setState({
                    //todos: response.data
                    asian : response.data.asian,
                    black : response.data.black,
                    white : response.data.white,

                })

                this.setState({
                    setChartData : ({
                        labels : response.data.black.map(todo => todo[1] + "/" + todo[2]),
                        // labels : response.data.map(todo => {
                        //     todo[0] + todo[1]
                        // }),
                        datasets: [
                            {
                                label : "asian",
                                data :response.data.asian.map(todo => todo[0]),
                                backgroundColor: [
                                    "#ffbb11",
                                  ]
                            },
                            {
                                label : "black",
                                data :response.data.black.map(todo => todo[0]),
                                backgroundColor: [
                                    "#50AF95",
                                  ]
                            },
                            {
                                label : "white",
                                data :response.data.white.map (todo => todo[0]),
                                backgroundColor: [
                                    "#a150af",
                                  ]
                            },

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
                        <label for="relation">Crimes Against:</label>
                        <select id="relation" class="custom-select" name="relation" onChange={this.handleChange}>
                                            <option value="">Please select</option>
                                            <option value="Spouse">Spouse</option>
                                            {/* <option value="ExSpouse">Ex-Spouse</option> */}
                                            <option value="Child">Child</option>
                                            <option value="Parent">Parents</option>
                                            <option value="Sibling">Sibling</option>
                                            <option value="Stepchildren">Step Children</option>
                                            <option value="Grandparent">Grand Parents</option>
                                            <option value="Grandchild">Grand Child</option>
                                            <option value="Inlaw">In Laws</option>
                                            <option value="Stepparent">Step Parent</option>
                                            <option value="Stepsibling">Step Sibling</option>
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
                        End Year : <select  class="custom-select" name="endYear" onChange={this.handleChange}>\
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
                
                {/* <h1>Family crimes</h1> */}
                {/* <div className="container">
                    <canvas id="speedChart" width="600" height="400"></canvas>
                </div> */}
                <div className="container">
                    <LineChartRaceRelation chartData={this.state.setChartData}></LineChartRaceRelation>
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

export default RaceRelationshipCrimeComponent