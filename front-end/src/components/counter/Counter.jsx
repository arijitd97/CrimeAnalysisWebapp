import React from 'react';
import { Component } from 'react';
import './Counter.css'
import PropTypes from 'prop-types'

// Function Components
export class Counter extends Component{

    constructor(){
        super();
        this.state = {
            counter : 0
        }
        this.increment = this.increment.bind(this);
        this.reset = this.reset.bind(this);
    }

    

    render() {
        return (
          <div className="Counter">
            <CounterButton by ={1} incrementMethod={this.increment}></CounterButton>
            <CounterButton by={5} incrementMethod={this.increment}></CounterButton>
            <CounterButton by={10} incrementMethod={this.increment}></CounterButton>
            <span className="count">{this.state.counter}</span>
            <button className='reset' onClick={this.reset}>Reset</button>

    
          </div>
        );
      }

      reset(){
          this.setState(
              {counter : 0}
          )
      }

    increment(by){ //update state - counter++
        // console.log('increment');
        console.log(`increment in parent from child - ${by}`)
        this.setState(
            (prevState) => {
            return {counter: prevState.counter + by}
            }
        )
 
     }
}


export class CounterButton extends Component{

    //Define initial state in a constructor
    //state => counter 0
    constructor(){
        super();
   
        this.increment = this.increment.bind(this);
    }

    render(){
        return (
            <div className = "CounterButton">
              <button onClick={this.increment}>+{this.props.by}</button>
        
            </div>
          )

    }

    increment(){ //update state - counter++
  
       this.props.incrementMethod(this.props.by)

    }
    
  }

CounterButton.defaultProps = {
    by : 1
}

CounterButton.propTypes = {
    by : PropTypes.number
}


export default Counter;


