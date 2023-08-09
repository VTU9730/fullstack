import { useEffect, useState } from "react";
import axios from 'axios';
import style from './style.css'
function Todo(){
    const [todos,setTodos]=useState([])
    const[todo,setTodo]=useState("")
    const[id,setId]=useState("")
    function handleChange(e){
        setTodo(e.target.value)
        e.preventDefault()
    }
    function addTodo(todo){
        axios.post("http://localhost:4000/",{todo:todo})
            .then(res=>console.log(res.data))
            .catch(err=>console.log(err))
        setTodo('')
        axios.get("http://localhost:4000/")
            .then(res=>setTodos(res.data))
            .catch(err=>console.log(err))
    }
    function handleRemove(id){
        axios.post("http://localhost:4000/delete",{"id":id})
            .then(res=>console.log(res.data))
            .catch(err=>console.log(err))
        console.log('todo removed',id);
    }
    useEffect(()=>{
        axios.get("http://localhost:4000")
            .then(res=>setTodos(res.data))
            .catch(err=>console.log(err))
    },[])
    return(
        <div id='todo-list'>
            <input type="text" onChange={(e)=>handleChange(e)} value={todo}></input>
            <button onClick={()=>addTodo(todo)}>Add</button>
            {todos?todos.map(item=>
             {
                if(!item){
                    return null
                }
                else{
                    return (
                        <div id="list-item" key={item._id}>
                            <input type="checkbox" onClick={()=>handleRemove(item._id)}></input>
                            <li>{item.todo}</li>
                        </div>
                        
                    )
                }}):null
             }
            
        </div>
    )
}
export default Todo;