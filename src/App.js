import './App.css'
import AddNewTaskBtn from './components/AddNewTaskBtn';
import DeleteTaskBtn from './components/DeleteTaskBtn';
import NewTaskInput from './components/NewTaskInput';
import Task from './components/Task';
import {useEffect, useState} from 'react'
import axios from './api/axios'

function App() {
	const [taskList, settaskList] = useState([])
	const [newTask, setNewTask] = useState('')


	useEffect(() => {
		axios.get('task-list/')
		.then((response) => {
			settaskList(response.data)
		})
	}, [])


	const addTask = () => {
		axios.post('task-create/', {
			title:newTask,
			is_completed:false
		}).then((response)=>{
			settaskList([...taskList, response.data])
			setNewTask('')
		})
	}

	const toggleCompleted = (task_id) => {
		settaskList(taskList.filter(selectedTask => {
			if (parseInt(selectedTask.id) === parseInt(task_id)){
				selectedTask.is_completed = !selectedTask.is_completed
				axios.post(`task-update/${selectedTask.id}/`, {...selectedTask}).then((response)=>{
					selectedTask.is_completed = response.data.is_completed
				})
			}
			return selectedTask
		}))
	}

	const deleteTask = (task_id) => {
		axios.delete(`task-delete/${task_id}/`)
		.then((response) => {
			if (response.data === 'SUCCESS'){
				settaskList(taskList.filter(remainingTask=>remainingTask.id !== task_id))
			}
		})	
	}

	const handleEnter = e => {
        if (e.which === 13) {
            addTask()
        }
    }

	return (
		<div className="todo-wrapper">
			<div className="heading-wrapper">
				<h3>My Tasks</h3>
			</div>
			<div className='todo-box'>
				<NewTaskInput newTask={newTask} setNewTask={setNewTask} keyHandler={handleEnter}/>
				<AddNewTaskBtn addTask={addTask}/>
			</div>
			<h6>Pending( {taskList.filter(task => task.is_completed===false).length} )</h6>
			{
				taskList.filter(task => task.is_completed===false).map((task, index)=>{
					return (
						<div className='todo-box todo-textbox' key={index}>
							<Task {...task} toggleCompleted={toggleCompleted} />
							<DeleteTaskBtn {...task} deleteTask={deleteTask}/>
						</div>
					)
				})
			}
			<h6>Completed( {taskList.filter(task => task.is_completed===true).length} )</h6>
			{
				taskList.filter(task => task.is_completed===true).map((task, index)=>{
					return (
						<div className='todo-box todo-textbox' key={index}>
							<Task {...task} toggleCompleted={toggleCompleted} />
							<DeleteTaskBtn {...task} deleteTask = {deleteTask}/>
						</div>
					)
				})
			}
		</div>
	);
}

export default App;
