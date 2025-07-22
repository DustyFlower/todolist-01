import {FilterValueType, TaskType} from '../App.tsx';
import {AddItemForm} from './AddItemForm.tsx';
import {EditableSpan} from './EditableSpan.tsx';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import {filterButtonsContainerSx, getListItemSx} from './Todolist.styles.ts';

type TitlePropsType = {
    todolistId: string
    title: string
    tasks: TaskType[]
    filter: FilterValueType
    removeTasks: (todolistId: string, taskId: string) => void
    changeFilter: (todolistId: string, filterValue: FilterValueType) => void
    addItem: (todolistId: string, title: string) => void
    changeIsDone: (todolistId: string, taskId: string, isDone: boolean) => void
    removeTodolist: (todolistId: string) => void
    updateTaskTitle: (todolistId: string, taskId: string, updateTitle: string) => void
    updateTodolistTitle: (todolistId: string, updateTitle: string) => void
}

export const Todolist = ({
                             todolistId,
                             title,
                             tasks,
                             filter,
                             removeTasks,
                             changeFilter,
                             addItem,
                             changeIsDone,
                             removeTodolist,
                             updateTaskTitle,
                             updateTodolistTitle
                         }: TitlePropsType) => {

    const changeFilterHandler = (value: FilterValueType) => {
        changeFilter(todolistId, value)
    }

    const onChangeCheckboxHandler = (todolistId: string, taskId: string, isDone: boolean) => {
        changeIsDone(todolistId, taskId, isDone)
    }

    const removeTaskHandler = (todolistId: string, taskId: string) => removeTasks(todolistId, taskId)

    const removeTodolistHandler = () => {
        removeTodolist(todolistId)
    }

    const tasksForTodoList = () => {

        switch (filter) {
            case 'Completed': {
                return tasks.filter((task: TaskType) => task.isDone)
            }
            case 'Active': {
                return tasks.filter((task: TaskType) => !task.isDone)
            }
            default:
                return tasks
        }
    }

    const addTaskHandler = (title: string) => {
        addItem(todolistId, title)
    }

    const updateTodolistTitleHandler = (updateTitle: string) => {
        updateTodolistTitle(todolistId, updateTitle)
    }

    const updateTaskTitleHandler = (taskId: string, updateTitle: string) => {
        updateTaskTitle(todolistId, taskId, updateTitle)
    }

    const mappedTasks = tasksForTodoList().map((task: TaskType) => {

        return <ListItem
            disablePadding
            key={task.id}
            sx={getListItemSx(task.isDone)}>
            <div>
                <Checkbox
                    onChange={(event) => onChangeCheckboxHandler(todolistId, task.id, event.currentTarget.checked)}
                    checked={task.isDone}/>
                <EditableSpan oldTitle={task.title}
                              onClick={(updateTitle) => updateTaskTitleHandler(task.id, updateTitle)}/>
            </div>
            <IconButton aria-label="delete" onClick={() => removeTaskHandler(todolistId, task.id)} size={'small'}>
                <DeleteIcon fontSize="inherit"/>
            </IconButton>
        </ListItem>
    })

    return (
        <div>
            <h3 style={{marginTop: '5px'}}>
                <EditableSpan oldTitle={title} onClick={updateTodolistTitleHandler}/>

                <IconButton aria-label="delete" onClick={removeTodolistHandler}>
                    <DeleteIcon/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTaskHandler}/>
            {
                tasks.length === 0
                    ? <p>No tasks</p>
                    : <List>
                        {mappedTasks}
                    </List>
            }
            <Stack direction="row" spacing={1} sx={filterButtonsContainerSx}>
                <Button variant={filter === 'All' ? 'outlined' : 'contained'} color="inherit"
                        onClick={() => changeFilterHandler('All')}>All</Button>
                <Button variant={filter === 'Active' ? 'outlined' : 'contained'} color="primary"
                        onClick={() => changeFilterHandler('Active')}>
                    Active
                </Button>
                <Button variant={filter === 'Completed' ? 'outlined' : 'contained'} color="secondary"
                        onClick={() => changeFilterHandler('Completed')}>
                    Completed
                </Button>
            </Stack>
        </div>
    );
};