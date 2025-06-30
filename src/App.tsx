import './App.css';
import {Todolist} from './components/Todolist.tsx';
import {useState} from 'react';
import {v1} from 'uuid';
import {AddItemForm} from './components/AddItemForm.tsx';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistType = {
    id: string,
    title: string,
    filter: FilterValueType
}

export type FilterValueType = 'All' | 'Active' | 'Completed';

function App() {

    const todolistId1 = v1()
    const todolistId2 = v1()

    const [todolists, setTodolists] = useState<TodolistType[]>([
            {id: todolistId1, title: 'What to learn', filter: 'All'},
            {id: todolistId2, title: 'What to buy', filter: 'All'}
        ]
    )

    let [tasks, setTasks] = useState({
        [todolistId1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false}
        ],
        [todolistId2]: [
            {id: v1(), title: 'React API', isDone: false},
            {id: v1(), title: 'GraphQL', isDone: false}
        ]
    })

    const removeTodolist = (todolistId: string) => {
        setTodolists(prevTodolists => prevTodolists.filter(tl => tl.id !== todolistId))
        setTasks(prevTasks => {
            const {[todolistId]: removed, ...restTasks} = prevTasks
            return restTasks
        })
    }

    const removeTasks = (todolistId: string, taskId: string) => {
        setTasks(prevTasks => ({...prevTasks, [todolistId]: prevTasks[todolistId].filter(task => task.id !== taskId)}))
    }

    const changeIsDone = (todolistId: string, taskId: string, isDone: boolean) => {
        setTasks(prevTasks => ({
                ...prevTasks,
                [todolistId]: prevTasks[todolistId].map(el => el.id === taskId ? {...el, isDone} : el)
            })
        )
    }

    const changeFilter = (todolistId: string, filter: FilterValueType) => {
        setTodolists(prevTodolists => (prevTodolists.map(tl => tl.id === todolistId ? {...tl, filter} : tl)))
    }

    const addTask = (todolistId: string, title: string) => {
        setTasks(prevTasks => ({
            ...prevTasks,
            [todolistId]: [{id: v1(), title, isDone: false}, ...prevTasks[todolistId]]
        }))
    }

    const addTodolist = (title: string) => {
        const id = v1()
        let newTodolist: TodolistType = {id, title, filter: 'All'}
        setTodolists(prevTodolists => ([
            newTodolist, ...prevTodolists
        ]))
        setTasks(prevTasks => ({...prevTasks, [id]: []}))
    }

    const updateTaskTitle = (todolistId: string, taskId: string, updateTitle: string) => {
        setTasks(prevTasks => ({
                ...prevTasks,
                [todolistId]: prevTasks[todolistId].map(el => el.id === taskId ? {...el, title: updateTitle} : el)
            })
        )
    }

    const updateTodolistTitle = (todolistId: string, updateTitle: string) => {
        setTodolists(prevTLs => (prevTLs.map(el => el.id === todolistId ? {...el, title: updateTitle} : el)
        ))
    }

    let mappedTodolists = todolists.map(el =>
        <Todolist
            key={el.id}
            todolistId={el.id}
            title={el.title}
            tasks={tasks[el.id]}
            filter={el.filter}
            removeTasks={removeTasks}
            changeFilter={changeFilter}
            addItem={addTask}
            changeIsDone={changeIsDone}
            removeTodolist={removeTodolist}
            updateTaskTitle={updateTaskTitle}
            updateTodolistTitle={updateTodolistTitle}/>
    )

    return (
        <div className="app">
            <AddItemForm addItem={addTodolist}/>
            {mappedTodolists}
        </div>
    )
}

export default App
