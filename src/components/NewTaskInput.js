import React from 'react'

function NewTaskInput({newTask, setNewTask, keyHandler}) {
    

    return (
        <div className="todo-input-wrapper">
			<input value={newTask} onKeyPress={keyHandler} onChange={(e)=>{setNewTask(e.target.value)}} type="text" name="" id="" className="todo-input" placeholder="My next task is to..."/>
		</div>
    )
}

export default NewTaskInput
