import {FilterValueType, TaskType} from '../App.tsx';
import {Button} from './Button.tsx';
import {AddItemForm} from './AddItemForm.tsx';
import {EditableSpan} from './EditableSpan.tsx';

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

        return <li className={task.isDone ? 'isDone' : ''} key={task.id}>
            <Button title={'X'} onClick={() => removeTaskHandler(todolistId, task.id)}/>
            <input type="checkbox"
                   onChange={(event) => onChangeCheckboxHandler(todolistId, task.id, event.currentTarget.checked)}
                   checked={task.isDone}/>
            <EditableSpan oldTitle={task.title}
                          onClick={(updateTitle) => updateTaskTitleHandler(task.id, updateTitle)}/>
        </li>
    })

    return (
        <div>
            <h3>
                <EditableSpan oldTitle={title} onClick={updateTodolistTitleHandler}/>
            </h3>
            <Button title={'x'} onClick={removeTodolistHandler}></Button>
            <AddItemForm addItem={addTaskHandler}/>
            {
                tasks.length === 0
                    ? <p>No tasks</p>
                    : <ul>
                        {mappedTasks}
                    </ul>
            }
            <div>
                <Button className={filter === 'All' ? 'activeFilter' : ''} title={'All'}
                        onClick={() => changeFilterHandler('All')}/>
                <Button className={filter === 'Active' ? 'activeFilter' : ''} title={'Active'}
                        onClick={() => changeFilterHandler('Active')}/>
                <Button className={filter === 'Completed' ? 'activeFilter' : ''} title={'Completed'}
                        onClick={() => changeFilterHandler('Completed')}/>
            </div>
        </div>
    );
};