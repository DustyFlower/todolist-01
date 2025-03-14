import './App.css';
import {Todolist} from './components/Todolist.tsx';
import {useState} from 'react';
import {v1} from 'uuid';

const title1 = 'What to learn'

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValueType = 'All' | 'Active' | 'Completed';

function App() {

    let [tasks, setTasks] = useState<TaskType[]>([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false},
        {id: v1(), title: 'ReactJS-2', isDone: false},
        {id: v1(), title: 'Typescript', isDone: false},
        {id: v1(), title: 'RTK query', isDone: false}
    ])

    const removeTasks = (taskId: string) => {
        setTasks(tasks.filter(task => task.id !== taskId))
    }

    const [filterValue, setFilterValue] = useState('All')

    const changeFilter = (filterButton: FilterValueType) => {
        setFilterValue(filterButton)
    }

    const addTask = (newTitle: string) => {
        const newTask: TaskType = {id: v1(), title: newTitle, isDone: true}
        setTasks([newTask, ...tasks])
    }

    const tasksForTodoList = () => {

        switch (filterValue) {
            case 'Completed': {
                return tasks.filter(task => task.isDone)
            }
            case 'Active': {
                return tasks.filter(task => !task.isDone)
            }
            default:
                return tasks
        }
    }

    let filteredTasksForTodoList = tasksForTodoList()

    return (
        <div className="app">
            <Todolist title={title1}
                      tasks={filteredTasksForTodoList}
                      removeTasks={removeTasks}
                      changeFilter={changeFilter}
                      addTask={addTask}/>
        </div>
    )
}

export default App
