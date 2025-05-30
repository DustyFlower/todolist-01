import {FilterValueType, TaskType} from '../App.tsx';
import {useState, KeyboardEvent, ChangeEvent} from 'react';
import {Button} from './Button.tsx';

type TitlePropsType = {
    todolistId: string
    title: string
    tasks: TaskType[]
    filter: FilterValueType
    removeTasks: (todolistId: string, taskId: string) => void
    changeFilter: (todolistId: string, filterValue: FilterValueType) => void
    addTask: (todolistId: string, newTitle: string) => void
    changeIsDone: (todolistId: string, taskId: string, isDone: boolean) => void
    removeTodolist: (todolistId: string) => void
}

export const Todolist = ({
                             todolistId,
                             title,
                             tasks,
                             filter,
                             removeTasks,
                             changeFilter,
                             addTask,
                             changeIsDone,
                             removeTodolist
                         }: TitlePropsType) => {

    const [newTitle, setNewTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const changeFilterHandler = (value: FilterValueType) => {
        changeFilter(todolistId, value)
    }

    const addTaskHandler = () => {
        if (newTitle.trim()) {
            addTask(todolistId, newTitle.trim());
            setNewTitle('')
        } else {
            setError('Title is required')
        }
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTaskHandler()
        }
    }

    const onChangeTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setNewTitle(e.currentTarget.value)
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

    const mappedTasks = tasksForTodoList().map((task: TaskType) => {

        return <li className={task.isDone ? 'isDone' : ''} key={task.id}>
            <Button title={'X'} onClick={() => removeTaskHandler(todolistId, task.id)}/>
            <input type="checkbox"
                   onChange={(event) => onChangeCheckboxHandler(todolistId, task.id, event.currentTarget.checked)}
                   checked={task.isDone}/>
            <span>{task.title}</span>
        </li>
    })

    return (
        <div>
            <h3>{title}</h3>
            <Button title={'x'} onClick={removeTodolistHandler}></Button>
            <div>
                <input className={error ? 'error' : ''}
                       value={newTitle}
                       onChange={onChangeTaskTitleHandler}
                       onKeyDown={onKeyDownHandler}/>
                <Button title={'+'} onClick={addTaskHandler}/>
                {error && <p className={'errorMessage'}>{error}</p>}
            </div>
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