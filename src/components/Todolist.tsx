import {FilterValueType, TaskType} from '../App.tsx';
import {useState, KeyboardEvent, ChangeEvent} from 'react';
import {Button} from './Button.tsx';

type TitlePropsType = {
    title: string
    tasks: TaskType[]
    removeTasks: (taskId: string) => void
    changeFilter: (filterValue: FilterValueType) => void
    addTask: (newTitle: string) => void
    changeIsDone: (taskId: string, isDone: boolean) => void
}

export const Todolist = ({
                             title,
                             tasks,
                             removeTasks,
                             changeFilter,
                             addTask,
                             changeIsDone
                         }: TitlePropsType) => {

    const [newTitle, setNewTitle] = useState('')
    const [error, setError] = useState<string | null>(null)
    const [filter, setFilter] = useState<FilterValueType>('All')

    const changeFilterHandler = (value: FilterValueType) => {
        changeFilter(value)
        setFilter(value)
    }

    const addTaskHandler = () => {
        if (newTitle.trim()) {
            addTask(newTitle.trim());
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

    const onChangeCheckboxHandler = (taskId: string,isDone: boolean) => {
        changeIsDone(taskId, isDone)
    }

    const removeTaskHandler = (taskId: string) => removeTasks(taskId)

    const mappedTasks = tasks.map((task: TaskType) => {
        
        return <li className={task.isDone ? 'isDone' : ''} key={task.id}>
            <Button title={'X'} onClick={()=>removeTaskHandler(task.id)}/>
            <input type="checkbox" onChange={(event)=>onChangeCheckboxHandler(task.id, event.currentTarget.checked)} checked={task.isDone}/>
            <span>{task.title}</span>
        </li>
    })

    return (
        <div>
            <h3>{title}</h3>
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