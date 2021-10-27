import React from 'react'

function Task({id, title, is_completed, toggleCompleted}) {
    return (
        <div className="todo-input-wrapper" onClick={()=>{toggleCompleted(id)}}>
			{
                is_completed ? <p className="todo-text strikethrough">{title}</p> : <p className="todo-text">{title}</p>
            }
		</div>
    )
}

export default Task
