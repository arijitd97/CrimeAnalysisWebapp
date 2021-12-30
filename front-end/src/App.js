import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import Counter from './components/counter/Counter';
import FirstComponent, { SecondComponent } from './components/learning-examples/FirstComponent';
import ThirdComponent from './components/learning-examples/ThirdComponent';
import TodoApp from './components/todo/TodoApp';
import './App.css'
import './bootstrap.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        {/*<Counter></Counter>*/}
        <TodoApp></TodoApp>

      </div>
    );
  }
}

class LearningComponents extends Component{
  render() {
    return (
      <div className="LearningComponents">
        My Hello World
        <FirstComponent></FirstComponent>
        <SecondComponent></SecondComponent>
        <ThirdComponent></ThirdComponent>

      </div>
    );
  }
  

}




export default App;