import './App.css';
import {Todolist} from './components/Todolist.tsx';
import {useState} from 'react';
import {v1} from 'uuid';

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

        /*  const currentTodo = todolists.find(tl => tl.id === todolistId)
        if (currentTodo) {
            currentTodo.filter = filterButton
            setTodolists([...todolists])
        }*/
    }

    const addTask = (todolistId: string, newTitle: string) => {
        setTasks(prevTasks => ({
            ...prevTasks,
            [todolistId]: [{id: v1(), title: newTitle, isDone: false}, ...prevTasks[todolistId]]
        }))
    }

    return (
        <div className="app">
            {todolists.map(el => {

                return (
                    <Todolist
                        key={el.id}
                        todolistId={el.id}
                        title={el.title}
                        tasks={tasks[el.id]}
                        filter={el.filter}
                        removeTasks={removeTasks}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeIsDone={changeIsDone}
                        removeTodolist={removeTodolist}/>
                )
            })}

        </div>
    )
}

export default App
