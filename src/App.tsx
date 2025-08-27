import './App.css';
import {Todolist} from './components/Todolist.tsx';
import {useReducer, useState} from 'react';
import {v1} from 'uuid';
import {AddItemForm} from './components/AddItemForm.tsx';
import {ButtonAppBar} from './components/ButtonAppBar.tsx';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {PaperSx} from './components/Todolist.styles.ts';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {
    addTodolistAC,
    changeFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./model/todolists-reducer.ts";
import {
    changeTaskStatusAC,
    changeTaskTitleAC,
    createTaskAC,
    deleteTaskAC,
    tasksReducer
} from "./model/tasks-reducer.ts";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TasksState = {
    [key: string]: TaskType[]
}

export type TodolistType = {
    id: string,
    title: string,
    filter: FilterValueType
}

export type FilterValueType = 'All' | 'Active' | 'Completed';

type ThemeMode = 'dark' | 'light'

function App() {

    const todolistId1 = v1()
    const todolistId2 = v1()

    const [todolists, dispatchTodolists] = useReducer(todolistsReducer, [
            {id: todolistId1, title: 'What to learn', filter: 'All'},
            {id: todolistId2, title: 'What to buy', filter: 'All'}
        ]
    )

    let [tasks, dispatchTasks] = useReducer(tasksReducer, {
        [todolistId1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false}
        ],
        [todolistId2]: [
            {id: v1(), title: 'React API', isDone: false},/**/
            {id: v1(), title: 'GraphQL', isDone: false}
        ]
    })

    const removeTodolist = (todolistId: string) => {
        const action = removeTodolistAC(todolistId)
        dispatchTodolists(action)
        dispatchTasks(action)
    }

    const changeFilter = (todolistId: string, filter: FilterValueType) => dispatchTodolists(changeFilterAC(todolistId, filter))


    const addTodolist = (title: string) => {
        const action = addTodolistAC(title)
        dispatchTodolists(action)
        dispatchTasks(action)
    }

    const updateTodolistTitle = (todolistId: string, updatedTitle: string) => dispatchTodolists(changeTodolistTitleAC(todolistId, updatedTitle))


    const removeTasks = (todolistId: string, taskId: string) => dispatchTasks(deleteTaskAC({todolistId, taskId}))


    const changeIsDone = (todolistId: string, taskId: string, isDone: boolean) => dispatchTasks(changeTaskStatusAC({
        todolistId,
        taskId,
        isDone
    }))


    const addTask = (todolistId: string, title: string) => dispatchTasks(createTaskAC({todolistId, title}))

    const updateTaskTitle = (todolistId: string, taskId: string, title: string) => dispatchTasks(changeTaskTitleAC({
        todolistId,
        taskId,
        title
    }))

    let mappedTodolists = todolists?.map(el =>
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
                <CssBaseline/>
            </ThemeProvider>
        </div>
    )
}

export default App
