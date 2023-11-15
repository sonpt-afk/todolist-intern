import { useEffect } from 'react';
import './Modal.css'
function Modal({ isVisible = false, title, content, footer, onClose }){
    const keydownHandler = ({ key }) => {
      switch (key) {
        case 'Escape':
          onClose();
          break;
        default:
      }
    };
  
    useEffect(() => {
      document.addEventListener('keydown', keydownHandler);
      return () => document.removeEventListener('keydown', keydownHandler);
    });
  
    return !isVisible ? null : (
      <div className="modal" onClick={onClose}>
        <div className="modal-dialog" onClick={e => e.stopPropagation()}>
          <div className="modal-header">
            <h3 className="modal-title">EDIT TASK</h3>
            <span className="modal-close" onClick={onClose}>
              &times;
            </span>
          </div>
          <div className="modal-body">
            <div className="modal-content">
            <input type="text" value={selectedTask.text}
           onChange={(e)=> setSelectedTask({...selectedTask,text: e.target.value})}/>

            </div>
          </div>
          {footer && <div className="modal-footer">
           <button className="btn-save" onClick={handleSaveEditedTask}>Save</button>
            
            </div>}
        </div>
      </div>
    );
  }

  export default Modal