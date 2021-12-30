import React, { Component } from 'react';
import {BrowserRouter as Router, Link, Route, Switch, useRoutes} from 'react-router-dom'
import AuthenticationService from './AuthenticationService.js';
import HelloWorldService from '../../api/todo/HelloWorldService.js';
import TodoDataService from '../../api/todo/TodoDataService.js';
import ProjectService from '../../api/todo/ProjectService.js';
import { LineChart } from './Chart_IntervalRate.js';
import { LineChartAgeTimeInterval } from './Chart_AgeTimeInterval.js';
import { LineChartRaceOffenseType } from './Chart_RaceOffenseType.js';
class RaceOffenseTypeComponent extends Component{

    constructor(props){
        super(props)
        this.state = {
            startYear : 2015,
            endYear : 2019,
            testTitle : 'Arijit',
            todos:[],
            crimeType: 'Bribery',
            asian : [],
            black : [],
            white : [],
            unknown : [],
            americanIndian: [],
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
        ProjectService.executeRaceOffenseType(this.state.crimeType, this.state.startYear, this.state.endYear)
        .then(
            response => {
                console.log("Response received @@@@")

                console.log(response.data.Teens)
                this.setState({
                    //todos: response.data
                    asian : response.data.asian,
                    black : response.data.black,
                    white : response.data.white,
                    unknown : response.data.unknown,
                    americanIndian : response.data.americanIndian
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
                        <label for="crimeType">Crime Type</label>
                        <select id="crimeType" class="custom-select" name="crimeType" onChange={this.handleChange}>
                                            <option value="">Please select</option>
                                            {/* <option value="Assault Offenses">Assault Offenses</option>
                                            <option value="Bribery">Bribery</option> */}
                                            <option value="Weapon Law Violations">Weapon Law Violations</option>
                                            <option value="Sex Offenses">Sex Offenses</option>
                                            <option value="Burglary/Breaking %26 Entering">Burglary/Breaking and Entering</option>
                                            <option value="Robbery">Robbery</option>
                                            {/* <option value="Animal Cruelty">Animal Cruelty</option> */}
                                            <option value="Counterfeiting/Forgery">Counterfeiting/Forgery</option>
                                            <option value="Drug/Narcotic Offenses">Drug/Narcotic Offenses</option>
                                            <option value="Arson">Arson</option>
                                            <option value="Kidnapping/Abduction">Kidnapping/Abduction</option>
                                            <option value="Human Trafficking">Human Trafficking</option>
                                            <option value="Prostitution Offenses">Prostitution Offenses</option>
                                            <option value="Homicide Offenses">Homicide Offenses</option>
                                            {/* <option value="Extortion/Blackmail">Extortion/Blackmail</option> */}
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
                    <LineChartRaceOffenseType chartData={this.state.setChartData}></LineChartRaceOffenseType>
                </div>
                
                {/* <button className="btn btn-success" onClick={this.testTitle}>Test Title</button> */}
                {/* <h1>Race Offense Type</h1> */}
                <div className="container">
                   
                </div>
                <div className="container">
                    
                </div>
                <div className="container">
                    
                </div>
                <div className="container">
                    
                </div>
                {/* above60 */}
                <div className="container">
                    
                </div>
            </div>
        )
    }
}

export default RaceOffenseTypeComponent