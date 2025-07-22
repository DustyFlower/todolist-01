import './App.css';
import {Todolist} from './components/Todolist.tsx';
import {useState} from 'react';
import {v1} from 'uuid';
import {AddItemForm} from './components/AddItemForm.tsx';
import {ButtonAppBar} from './components/ButtonAppBar.tsx';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {PaperSx} from './components/Todolist.styles.ts';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

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

type ThemeMode = 'dark' | 'light'

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
        <Grid>
            <Paper sx={PaperSx} elevation={5}>
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
            </Paper>
        </Grid>
    )

    const [themeMode, setThemeMode] = useState<ThemeMode>('light')

    const theme = createTheme({
        palette: {
            mode: themeMode === 'light' ? 'light' : 'dark',
            primary: {
                main: '#088651',
            },
        },
    });

    const changeModeHandler = () => {
        setThemeMode(themeMode == 'light' ? 'dark' : 'light')
    }

    return (
        <div className="app">
            <ThemeProvider theme={theme}>
                <Container fixed>
                    <ButtonAppBar onChange={changeModeHandler}/>
                    <Grid container>
                        <AddItemForm addItem={addTodolist}/>
                    </Grid>
                    <Grid container spacing={3}>
                        {mappedTodolists}
                    </Grid>
                </Container>
                <CssBaseline />
            </ThemeProvider>
        </div>
    )
}

export default App
