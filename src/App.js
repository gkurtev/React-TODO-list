import React from 'react';
import ReactDOM from 'react-dom';
import './css/App.css';
import PropTypes from 'prop-types';

//Local Storage accepts only strings JSON.stringify();

// Gencho imash butoncheta i iskam da mi izkarash selektiraniq buton, kurev
class TodoApp extends React.Component {
  constructor(){
    super();
    this.state = {
      personName: 'Genadi-chan',
      list: [],
      valzor: '',
      dirtyWords: ['suck','dick', 'pussy']
    }
  }

  todoLocalStorage = (list) => {
    window.localStorage.setItem('savedList', JSON.stringify(list))
  }

  todoText = (e) => {
    this.setState({
      valzor: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    
    const cloneList = [...this.state.list, {id: 1 + Math.random(), text: this.state.valzor}];
      this.setState({
        list: cloneList,
        valzor: ''
    })
  }

  removeTodo = (e,item) => {
    e.preventDefault();
    const filteredArr = this.state.list.filter(ee => ee.id !== item)

    this.setState({
      list: filteredArr
    })
  }

  handleReset = () => {
    this.setState({
      list: []
    })
  }

  componentDidMount() {
    this.setState({
      list: JSON.parse(window.localStorage.getItem('savedList'))
    })
  }

  componentDidUpdate() {
    this.todoLocalStorage(this.state.list)
  }

  render(){
    const listArr = this.state.list;
    return(
      <div className="wrapper">
        <div className="todo-container">
          <header className="todo__head">
            <h1>Your Todos {this.state.personName}</h1>

          <form onSubmit={this.handleSubmit} action="">
            <input onChange={this.todoText} type="text" value={this.state.valzor}/>

            <button type="submit">Add todo</button>
          </form>
          </header>

          <div className="todo__body">
            {/* list of toros here */}
            <div>
              {listArr.map(item => <TodoItem key={item.id} text={item.text} removeItem={(e) => this.removeTodo(e,item.id)} />)}
            </div>
          </div>
        </div>

        <div className="todo__actions">
          <button onClick={this.handleReset}>
            All Done
          </button>
        </div>
      </div>
    )
  }
} 

const TodoItem = (props) => {
  return(
    <div>
      {props.text} <a onClick={props.removeItem} href="#">X</a>
    </div>
  )
}

export default TodoApp;

//2) Keep your components small
//3) 

//5 Utilize prop types
//6 User React developer tools

