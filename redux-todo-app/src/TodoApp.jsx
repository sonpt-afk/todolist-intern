import { useState } from "react"
import { useSelector, useDispatch } from 'react-redux'
import todoSlice, { addTask,deleteTask } from "./features/todoSlice"
export default function TodoApp() {

const [input, setInput] = useState('')
const dispatch = useDispatch()
function handleSubmit(e){
  e.preventDefault()
  dispatch(addTask({text: input, id: Date.now()}))
setInput('')
}
const list = useSelector((state) => state.todo.list)

function handleDeleteTask(id){
  dispatch(deleteTask(id))
}


return(
  <>
  <form action="" onSubmit={handleSubmit}>
  <input type="text" value={input} onChange={(e)=>{setInput(e.target.value)}} />
  <button type="submit">Add</button>

  </form>
 <div>
    
    <ul>
      {list.map((task) => (
        <>
        <li key={task.id} >{task.text}

        <button onClick={()=>{handleDeleteTask(task.id)}}>delete</button>
        </li>
        </>
        
      ))}
    </ul>
   
 </div>
  </>
)
}