import React, { Component } from 'react';
import {BrowserRouter as Router, Link, Route, Switch, useRoutes} from 'react-router-dom'
import AuthenticationService from './AuthenticationService.js';
import HelloWorldService from '../../api/todo/HelloWorldService.js';
import TodoDataService from '../../api/todo/TodoDataService.js';
class ListTodosComponent extends Component{

    constructor(props){
        super(props)
        this.state = {
            todos:[]
            // todos: 
            // [
            //     {id : 1, description: 'Learn React', done:false, targetDate: new Date()},
            //     {id : 2, description: 'Learn NOSQL', done:false, targetDate: new Date()},
            //     {id : 3, description: 'Learn Tennis', done:false, targetDate: new Date()}
            // ]
        }
    }

    //lifecycle method
    componentDidMount() {
        TodoDataService.retrieveAllTodos()
        .then(
            response => {
                this.setState({
                    todos: response.data
                })
            }

        )
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

    render(){
        return(
            <div>
                <h1>List Todos</h1>
                <div className="container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>title</th>
                                <th>description</th>
                                <th>published</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.todos.map(
                                    todo =>
                                        <tr>
                                        <td>{todo.id}</td>
                                        <td>{todo.title}</td>
                                        <td>{todo.description}</td>
                                        <td>{todo.published.toString()}</td>
                                        </tr>
                                )
                            }
                            
                            
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default ListTodosComponent