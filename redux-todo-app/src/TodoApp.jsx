import { useState } from "react"
import { useSelector, useDispatch } from 'react-redux'
import todoSlice, { addTask,deleteTask,updateTask } from "./features/todoSlice"
import './App.css'
import './Modal.css'
import './responsive.css'
export default function TodoApp() {

const [input, setInput] = useState('')
const dispatch = useDispatch()
const [validationError, setValidationError] = useState(''); 
const [selectedTask,setSelectedTask] = useState(null)
const [showModal,setShowModal] = useState(false)
const [priority,setPriority] = useState('Medium')


function handleSubmit(e){
  if (input.trim() !== '') {

  e.preventDefault()
  dispatch(addTask({text: input, id: Date.now(), priority:priority}))

  setInput('')
  setPriority('Medium')
setValidationError('');

  }else{
    setValidationError('Fill something please ...');
    e.preventDefault()

  }
}
const list = useSelector((state) => state.todo.list)

function handleDeleteTask(id){
  dispatch(deleteTask(id))
}

function handleEditTask(task){
  setSelectedTask(task)
  setShowModal(true)
}

function handleSaveEditedTask(){
  dispatch(updateTask({id:selectedTask.id , text:selectedTask.text}))

  setSelectedTask(null)
  setShowModal(false)
}

function handleCloseModal(){
  setShowModal(false)
}
return(
  <>
  <div className="app">
    <div className="app-form">
  <form id="form-add" action="" onSubmit={handleSubmit} >
  <div className="form-add-row">
  <input className="app-form-input" placeholder="Input a task ..." type="text" value={input} onChange={(e)=>{setInput(e.target.value)}} />
  
  <label htmlFor="">
    <span className="priority">Priority:</span> 
    <select value={priority} onChange={(e)=>{setPriority(e.target.value)}}>
      <option value="High">High</option>
      <option value="Medium">Medium</option>
      <option value="Low">Low</option>

    </select>
    </label>

  <button className="btn-add" type="submit">ADD</button>

  </div>
  {validationError &&  <div className="errorMsg" style={{ color: 'red' }}>{validationError}
  </div>}
  </form>

  </div>
 <div  className="app-result">
    
    <ol  className="app-list">
      {list.map((task) => (
        <div  key={task.id} className="app-list-item">
        <li  >{task.text}
        
        
        </li>
        <div className="app-list-priority">
          {task.priority}
        </div>
        <div className="btn-group">

        <button className="btn-edit" onClick={()=>{handleEditTask(task)}}>EDIT</button>
        <button className="btn-delete" onClick={()=>{handleDeleteTask(task.id)}}>DELETE</button>
        </div>
        </div>
      ))}
    </ol>
    {showModal && (
          <div className="modal" onClick={handleCloseModal}>
          <div className="modal-dialog" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">EDIT TASK</h3>
              <span className="modal-close" onClick={handleCloseModal}>
                &times;
              </span>
            </div>
            <div className="modal-body">
              <div className="modal-content">
              <input className="modal-input" type="text" value={selectedTask.text} placeholder="Input new task name"
             onChange={(e)=> setSelectedTask({...selectedTask,text: e.target.value})}/>
  
              </div>
            </div>
           <div className="modal-footer">
             <button className="btn-save" onClick={handleSaveEditedTask}>Save</button>
              
              </div>
   
 </div>
  </div>
)
    }
    </div>
    </div>
</>
)
}