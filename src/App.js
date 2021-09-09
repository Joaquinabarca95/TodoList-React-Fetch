
import React, { useEffect, useState } from 'react';
import './App.css';

function App() {

  useEffect(() => {
    getTodos();
  }, [])

  const getTodos = () => {

    fetch('https://assets.breatheco.de/apis/fake/todos/', {
        method: "GET",    
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(resp => {
          console.log(resp.ok); // Será true (verdad) si la respuesta es exitosa.
          console.log(resp.status); // el código de estado = 200 o código = 400 etc.
          console.log(resp.text()); // Intentará devolver el resultado exacto como cadena (string)
          return resp.json() // (regresa una promesa) will try to parse the result as json as return a promise that you can .then for results
      })
      .then(data => {
          //Aquí es donde debe comenzar tu código después de que finalice la búsqueda     
          setTodo(data)
          console.log(data); //esto imprimirá en la consola el objeto exacto recibido del servidor
      })
      .catch(error => {
          //manejo de errores
          console.log(error);
      });
  }

  // const createTodos = () => {
  //   fetch('https://assets.breatheco.de/apis/fake/todos/user/joaquinabarca', {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json"
  //     },
  //     body: []
  //   })
  //   .then(resp => {
  //     console.log(resp.ok);
  //     console.log(resp.status);
  //     return resp.json()
  //   })
  //   .then(data => {
  //     console.log(data);
  //   })
  //   .catch((error) => console.log(error))
  // }



  const [todo, setTodo] = useState([])

  const todoList = todo.map((todo, index) =>{
    return (
      <li key={index}>
        {todo} 
        <button  onClick={() => removeTodo(index)}>
          <i className="fas fa-trash-alt"></i>
        </button>
      </li>
    )
  })


  const handlePost = e => {
    if (e.keyCode === 13 && e.target.value !== ""){
      let task = todo.concat(e.target.value)
      setTodo(task)
      e.target.value = "";
    }
  }

  const removeTodo = (i) => {
    let newTodo = [...todo]
    newTodo.splice(i, 1)
    setTodo(newTodo)
  }

  const itemsLeft = () => {
    if (todo.length === 0){
      return "No task left to do, add a task!"
    } else if (todo.length === 1){
      return "1 task left to do"
    } else if (todo.length > 1){
      return `${todo.length} tasks to do`
    }
  }

 

  return (
    
      <div className="container">
        <h1 className="title">todos</h1>  
          <ul className="listItemClass">
            <input type="text" onKeyUp={handlePost} placeholder="What needs to be done?"  />
           {todoList}
          </ul>
          <div className="footer">
            <small>{itemsLeft()}</small>
          </div>   
      </div>
    
  );
}

export default App;
