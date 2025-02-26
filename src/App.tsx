import './App.css';
import {Todolist} from './components/Todolist.tsx';
import {useState} from 'react';

const title1 = 'What to learn-1'

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export type filterValueType = 'All' | 'Active' | 'Completed';

function App() {

    let [tasks, setTasks] = useState<TaskType[]>([
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'ReactJS', isDone: false},
        {id: 4, title: 'ReactJS-2', isDone: false},
        {id: 5, title: 'Typescript', isDone: false},
        {id: 6, title: 'RTK query', isDone: false}
    ])

    const removeTasks = (taskId: number) => {
        setTasks(tasks.filter(task => task.id !== taskId))
    }

    const [filterValue, setFilterValue] = useState('All')

    const changeFilter = (filterButton: filterValueType) => {
        setFilterValue(filterButton)
    }

    const durshlagFoo = () => {

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

    let durshlagVal = durshlagFoo()

    return (
        <div className="app">
            <Todolist title={title1}
                      tasks={durshlagVal}
                      removeTasks={removeTasks}
                      changeFilter={changeFilter}/>
        </div>
    )
}

export default App
