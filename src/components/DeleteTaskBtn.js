import React from 'react'

function DeleteTaskBtn({id, deleteTask}) {
    return (
        <div className="todo-addBtn-wrapper">
			<button onClick={()=>{deleteTask(id)}} className="todo-trashBtn"><i className="fa fa-trash"></i></button>
		</div>
    )
}

export default DeleteTaskBtn
