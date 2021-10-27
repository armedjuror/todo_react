import React from 'react'

function AddNewTaskBtn({addTask}) {
    return (
        <div className="todo-addBtn-wrapper">
			<button onClick={addTask} className="todo-addBtn"><i className="fa fa-plus"></i></button>
		</div>
    )
}

export default AddNewTaskBtn
