import React, { Component } from 'react';
import {BrowserRouter as Router, Link, Route, Switch, useRoutes} from 'react-router-dom'
import AuthenticationService from './AuthenticationService.js';
import HelloWorldService from '../../api/todo/HelloWorldService.js';
import TodoDataService from '../../api/todo/TodoDataService.js';
import ListTodosComponent from './ListTodosComponent.jsx';
import IntervalRateComponent from './IntervalRateComponent.jsx';
import AgeTimeIntervalComponent from './AgeTimeIntervalComponent.jsx';
import RaceOffenseTypeComponent from './RaceOffenseTypeComponent.jsx';
import LocationCrimeComponent from './LocationCrimeComponent.jsx';
import RaceRelationshipCrimeComponent from './RaceRelationshipCrimeComponent.jsx';
import ProjectService from '../../api/todo/ProjectService.js';
import IntervalRateLogo from './Images/IntervalRate.jpg'
import AgeIntervalLogo from './Images/AgeInterval.jpeg'
import LocationCrimeLogo from './Images/LocationCrime.jpeg'
import RaceOffenseypeLogo from './Images/RaceOffenceType.jpg'
import RaceFamilyTypeLogo from './Images/RaceFamilyType.jpeg'


export class TodoApp extends Component{
    render(){
        return (
            <div className="TodoApp">
                    {/* <Router>
                        <RouterApp />
                    </Router> */}
                    <h1>Crime Data Analysis - Texas</h1>
                    <Router>
                        <>
                            <HeaderComponent></HeaderComponent>
                            <Switch>
                            <Route path="/" exact component={HomeComponent}/>
                            <Route path="/home" exact component={HomeComponent}/>
                            <Route path="/login" component={LoginComponent}/>
                            <Route path="/logout" component={LogoutComponent}/>
                            <Route path="/welcome/:name" component={WelComeComponent}/>
                            <Route path="/todos" component={ListTodosComponent}/>
                            <Route path="/intervalrate" component={IntervalRateComponent}/>
                            <Route path="/agetimeinterval" component={AgeTimeIntervalComponent}/>
                            <Route path="/raceoffensetype" component={RaceOffenseTypeComponent}/>
                            <Route path="/locationcrime" component={LocationCrimeComponent}/>
                            <Route path="/racerelation" component={RaceRelationshipCrimeComponent}/>
                            <Route path="/countRows" component={CountRowsComponent}/>
                            <Route component={ErrorComponent}/>
                            {/* <Route path="*" element={ <LoginComponent /> } /> */}
                            </Switch>
                            {/* <FooterComponent></FooterComponent> */}
                        </>
                    </Router>

            </div>
        )
    }
}

class HomeComponent extends Component{
    render(){
        return(
            <div className="container">
                <p  className="intro" align="justify">
To improve the understanding of crimes committed, it is important to visualize the crime data that have been collected over the years. Visualization with the help of graphs and plots aids in understanding the complex trends and nuances hidden in the data which otherwise are not very obvious while observing millions of tuples. The data in the database are too decentralized to retrieve any reasonable inference from it.
The motivation behind this project is to build an User Interface that will help its users to understand crime related data. This project will present crime statistics in an accurate and user-friendly manner while simultaneously deriving inferences from the data.
Texas is not only the second largest state, but also a state with the second largest population which is rather diverse compared to most states in the United States. Thus we decided to design our project using the crime data of Texas. This project can be extended to other states and countries as per availability of data.
We expect people from diverse domains to benefit from our application. Our queries are designed with a thought to help law enforcement officers, government officials, various organisations and most importantly the average person. The database of crime statistics has been retrieved from the National incident-based reporting system (NIBRS). This database consists of crime statistics on a case-by-case basis.

                    
                
                </p>
                <div class="row">
                    <div class="col-4">
                        <div class="card h-100" style={{width: "18rem"}}>
                            <img class="card-img-top" src={IntervalRateLogo} alt={IntervalRateLogo}></img>
                            <div class="card-body">
                                <h5 class="card-title">Analysis by Time Interval</h5>
                                <p class="card-text">Comparison of crimes over different times of a day for a selected time period</p>
                                {/* <a href="/intervalrate" class="btn btn-primary">Go somewhere</a> */}
                                <Link className="btn btn-primary" to="/intervalrate">Interval Rate Query</Link>
                            </div>
                        </div>
                    </div>
                    <div class="col-4">
                        <div class="card h-100" style={{width: "18rem"}}>
                            <img class="card-img-top" src={AgeIntervalLogo} alt={AgeIntervalLogo}></img>
                            <div class="card-body">
                                <h5 class="card-title">Analysis by Age Groups and Different Times of day</h5>
                                <p class="card-text">Vulnerability of different age groups over different times of day for a selected time period</p>
                                {/* <a href="#" class="btn btn-primary">Go somewhere</a> */}
                                <Link className="btn btn-primary" to="/agetimeinterval">Age Time Interval</Link>
                            </div>
                        </div>
                    </div>
                    <div class="col-4">
                        <div class="card h-100" style={{width: "18rem"}}>
                            <img class="card-img-top" src={RaceOffenseypeLogo} alt={RaceOffenseypeLogo}></img>
                            <div class="card-body">
                                <h5 class="card-title">Race comparison of Offenders for different offense types</h5>
                                <p class="card-text">Showing the offences commited by different communities to draw inferences about economic condition of different races.</p>
                                {/* <a href="#" class="btn btn-primary">Go somewhere</a> */}
                                <Link className="btn btn-primary" to="/raceoffensetype">Race Offense Type</Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row justify-content-center">
                    <div class="col-4">
                        <div class="card h-100" style={{width: "18rem"}}>
                            <img class="card-img-top" src={LocationCrimeLogo} alt={LocationCrimeLogo}></img>
                            <div class="card-body">
                                <h5 class="card-title">Crime by Location</h5>
                                <p class="card-text">Checking trend of crime at different locations of public importance</p>
                                {/* <a href="#" class="btn btn-primary">Go somewhere</a> */}
                                <Link className="btn btn-primary" to="/locationcrime">Crime by location</Link>
                            </div>
                        </div>
                    </div>
                    <div class="col-4">
                        <div class="card h-100" style={{width: "18rem"}}>
                            <img class="card-img-top" src={RaceFamilyTypeLogo} alt={RaceFamilyTypeLogo}></img>
                            <div class="card-body">
                                <h5 class="card-title">Family Crime comparison for different races</h5>
                                <p class="card-text">Showing social condition among different races by comparing family crimes</p>
                                {/* <a href="#" class="btn btn-primary">Go somewhere</a> */}
                                <Link className="btn btn-primary" to="/racerelation">Family Crimes</Link>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div style="background-image: url('stats.png');"></div> */}


            </div>
        )
    }
}

class HeaderComponent extends Component{
    render() {
        // const isUserLoggedIn = AuthenticationService.isUserLoggedIn()
        // console.log(isUserLoggedIn);
        return(
            <div>
                <nav class="navbar navbar-expand-md navbar-dark bg-dark">
                    {/* <div><a href="http://www.google.com" className="navbar-brand">Google</a></div> */}
                    <ul className= "navbar-nav">
                        {/* <li><Link className="nav-link" to="/welcome/prasad">Home</Link></li>
                        <li><Link className="nav-link" to="/todos">Todos</Link></li> */}
                        <li><Link className="nav-link" to="/home">Home</Link></li>
                        <li><Link className="nav-link" to="/intervalrate">Interval Rate Query</Link></li>
                        <li><Link className="nav-link" to="/agetimeinterval">Age Time Interval Query</Link></li>
                        <li><Link className="nav-link" to="/raceoffensetype">Race Offense Type</Link></li>
                        <li><Link className="nav-link" to="/locationcrime">Location Crime</Link></li>
                        <li><Link className="nav-link" to="/racerelation">Race Family Crime</Link></li>
                    </ul>
                    <ul className= "navbar-nav navbar-collapse justify-content-end">
                        <li><Link className="nav-link" to="/countrows">Count rows</Link></li>
                        {/* <li><Link className="nav-link" to="/login">Login</Link></li>
                        <li><Link className="nav-link" onClick={AuthenticationService.logout} to="/logout">Logout</Link></li> */}
                    </ul>
                </nav>
            </div>
        )
    }
}

class FooterComponent extends Component{
    render() {
        return(
            <footer className="footer">
                <span className="text-muted">All right reserved @hbkthegreat</span>

            </footer>
        )
    }
}
class CountRowsComponent extends Component{
    constructor(props){
        super(props)
        this.state = {
            count : 0
        }
    }
    componentDidMount(){
        ProjectService.executeCountRows().
        then(
            response => {
                console.log(response)
                this.setState({
                    count: response.data
                })
            }
        )
    }

    render(){
        return(
            <div>
                Total number of rows are {this.state.count}.
            </div>

        )
        
    }

}

class LogoutComponent extends Component{
    render() {
        return(
            <div>
               <h1>You are logged out</h1>
               <div className="container">
                   Thank You for using our application
               </div>
            </div>
        )
    }
}




export class WelComeComponent extends Component{

    constructor(props){
        super(props)
        this.retrieveWelcomeMessage = this.retrieveWelcomeMessage.bind(this)
        this.handleSuccessfulResponse = this.handleSuccessfulResponse.bind(this)
        this.state = {
            welcomeMessage : 'default'
        }

    }

    retrieveWelcomeMessage(){
        HelloWorldService.executeHelloWorldService() // returns a promise back
        .then(response => {
            console.log(response.data[0]);
            this.handleSuccessfulResponse(response);
        })  // what should we do when we get a successful response
        // .catch() // what should we do when we get a unsuccessful response
    }

    handleSuccessfulResponse(response){
        this.setState(
            {
                welcomeMessage: response.data[0].title
            }
        )

    }

    render(){
        return(
            <>
                <div>
                    Welcome {this.props.match.params.name}. You can manage your todos <Link to="/todos">here</Link>
                </div>
                <div>
                    Get Customized welcome message. 
                    <button onClick={this.retrieveWelcomeMessage} className="btn btn-success">Get Welcome Message</button>
                </div>
                <div className="container">
                    {this.state.welcomeMessage}
                </div>
             </>
        )
        
    }
}


export class LoginComponent extends Component{

    constructor(props){
        super(props)
        this.state = {
            username: '',
            password: '',
            showSuccessMessage: false,
            hasLoginFailed: false

        }
        // this.handleUsernameChange = this.handleUsernameChange.bind(this)
        // this.handlePasswordChange = this.handlePasswordChange.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.loginClicked = this.loginClicked.bind(this)
    }

    //this will only work if html names and state names match
    handleChange(event){
        this.setState(
            {
                [event.target.name] : event.target.value
            }
        )
    }
    loginClicked(){
        console.log(this.state);
        if (this.state.username === "prasad" && this.state.password === "dummy"){
            AuthenticationService.registerSuccessfulLogin(this.state.username, this.state.password);
            this.props.history.push(`/welcome/${this.state.username}`);

            this.setState({
                showSuccessMessage: true,
                hasLoginFailed: false
            })
        }
        else{
            console.log('fail')
            this.setState({
                showSuccessMessage: false,
                hasLoginFailed: true
            })

        }
    }



    render() {
        return(
            <div className="container">
                {/*<ShowInvalidCredentials hasLoginFailed={this.state.hasLoginFailed}/>*/}
                {/*<ShowLoginSuccessMessgae showSuccessMessage={this.state.showSuccessMessage}/>*/}
                {this.state.hasLoginFailed && <div className="alert alert-warning">InvalidCredentials</div>}
                {this.state.showSuccessMessage && <div>Login Successful</div>}
                User Name: <input type="text" name="username" value={this.state.username} onChange={this.handleChange}/>
                Password: <input type="password" name="password" value={this.state.password} onChange={this.handleChange}/>
                <button className="btn btn-success" onClick={this.loginClicked}>Login</button>

            </div>
            
        )
    }

}

function ErrorComponent(){
    return(
        <div>
            Error occured. Wrong url
        </div>
        
    );
}

function ShowInvalidCredentials(props){
    if(props.hasLoginFailed){
        return <div>Invalid Credentials</div>
    }
    return null
}

function ShowLoginSuccessMessgae(props){
    if(props.showSuccessMessage){
        return <div>Login successful</div>
    }
    return null
}



export default TodoApp