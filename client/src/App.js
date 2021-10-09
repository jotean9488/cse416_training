import Preloader from "./components/Preloader.js";
import { readTodos, createTodo, updateTodo, deleteTodo } from "./functions"
import {useEffect, useState} from "react";


function App() {

  const [todo, setTodo] = useState({title:'',content:''})
  const [todos, setTodos] = useState(null)

  const [currentID, setCurrentID] = useState(0)
  useEffect(() => {
    let currentTodo = currentID != 0 ? todos.find(todo=>todo._id===currentID) : {title:'', content:''}
    setTodo(currentTodo)
  }, [currentID])
  useEffect(() => {
    const fetchData = async()=>{
      const result = await readTodos();
      setTodos(result)
    }
    fetchData();
  }, [currentID])

  const clear = () => {
    setCurrentID(0)
    setTodo({title:'',content:''})
  }

  useEffect(() => {
    const clearField = (e) => {
      if(e.keyCode === 27) {
        clear()
      }
    }
    window.addEventListener('keydown', clearField)
    return () => window.removeEventListener('keydown', clearField)
  }, [])



  const onSubmitHandler = async(e) => {
    e.preventDefault()
    if(currentID === 0) {
      const result = await createTodo(todo)
      setTodos([...todos, result])
      clear()
    }
    else {
      await updateTodo(currentID, todo)
      clear()
    }
  }

    
  
  const removeTodo = async(id) => {
    await deleteTodo(id)
    const result = await readTodos()
    setTodos(result)
  }

  return (
    <div className="container">
      <div className="row">
        <pre>{JSON.stringify(todo)}</pre>
        <form className="col s12" onSubmit={onSubmitHandler}>
          <div className="row">
            <div className="input-field col s6">
              <i className="material-icons prefix">title</i>
              <input id="icon_prefix" type="text" className="validate" 
              value={todo.title} onChange={e=>setTodo({...todo, title: e.target.value})} />
              <label htmlFor="icon_prefix">Title</label>
            </div>
            <div className="input-field col s6">
              <i className="material-icons prefix">description</i>
              <input id="description" 
              value={todo.content} type="tel" className="validate" onChange={e=>setTodo({...todo, content: e.target.value})}/>
              <label htmlFor="description">Content</label>
            </div>
          </div>
          <div className="row right-align">
            <button className="waves-effect
            waves-light btn">submit</button>
          </div>
        </form>
        {
          !todos ? <Preloader/>: todos.length > 0 ? <ul className="collection">
          {todos.map(todo => (
            <li key={todo._id} 
            onClick = {() => setCurrentID(todo._id)} className="collection-item"><div><h5>{todo.title}</h5></div>
            <p>{todo.content}<a href="#!" onClick={() => removeTodo(todo._id)} className="secondary-content"><i className="material-icons">delete</i></a></p></li>
          ))}
        </ul> : <div><h5>nothing to do</h5></div>
        }
        
      </div>
    </div>
  );
}

export default App;
