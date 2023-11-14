import { useState } from "react"
import { useSelector, useDispatch } from 'react-redux'
import todoSlice, { addTask,deleteTask,updateTask } from "./features/todoSlice"
import './App.css'
import Modal from './Modal.jsx'
export default function TodoApp() {
  const [isModal, setModal] = useState(false);

const [input, setInput] = useState('')
const dispatch = useDispatch()

const [selectedTask,setSelectedTask] = useState(null)
const [showModal,setShowModal] = useState(false)
function handleSubmit(e){
  e.preventDefault()
  dispatch(addTask({text: input, id: Date.now()}))
setInput('')
}
const list = useSelector((state) => state.todo.list)

function handleDeleteTask(id){
  dispatch(deleteTask(id))
}

function handleEditTask(task) {
  setSelectedTask(task)
  setShowModal(true)
}

function handleSaveEditedTask(){
  dispatch(updateTask({id: selectedTask.id , text: selectedTask.text}))
  setShowModal(false)
  setSelectedTask(null)
}

function handleCloseModal(){
  console.log('ok')
  setShowModal(false)
}
return(
  <>
  <div className="app">
    <div className="app-form">
  <form action="" onSubmit={handleSubmit} >
  <input className="app-form-input" placeholder="Input a task ..." type="text" value={input} onChange={(e)=>{setInput(e.target.value)}} />
  <button className="btn-add" type="submit">ADD</button>

  </form>
  </div>
 <div  className="app-result">
    
    <ol  className="app-list">
      {list.map((task) => (
        <div  key={task.id} className="app-list-item">
        <li  >{task.text}
        
        
        </li>
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