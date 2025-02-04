import './App.css';
import {Todolist} from './components/Todolist.tsx';

const title1='What to learn-1'
const title2='What to learn-2'

export type TaskPropsType = {
    id: number
    title: string
    isDone: boolean
}

const tasks1: TaskPropsType[] = [
    {id: 1, title: 'HTML&CSS', isDone: true},
    {id: 2, title: 'JS', isDone: true},
    {id: 3, title: 'ReactJS', isDone: false},
    {id: 4, title: 'ReactJS-2', isDone: false},
]

const tasks2: TaskPropsType[] = [
    {id: 1, title: 'Hello world', isDone: true},
    {id: 2, title: 'I am Happy', isDone: false},
    {id: 3, title: 'Yo', isDone: false},
]

function App() {
    return (
        <div className="app">
            <Todolist title={title1} tasks={tasks1}/>
            <Todolist title={title2} tasks={tasks2}/>
        </div>
    )
}

export default App
