import {FilterValueType, TaskType} from '../App.tsx';
import {useState, KeyboardEvent, ChangeEvent} from 'react';
import {Button} from './Button.tsx';

type TitlePropsType = {
    title: string
    tasks: TaskType[]
    removeTasks: (taskId: string) => void
    changeFilter: (filterValue: FilterValueType) => void
    addTask: (newTitle: string) => void
}

export const Todolist = ({
                             title,
                             tasks,
                             removeTasks,
                             changeFilter,
                             addTask,
                         }: TitlePropsType) => {

    const [newTitle, setNewTitle] = useState('')

    const changeFilterHandler = (value: FilterValueType) => changeFilter(value)

    const addTaskHandler = () => {
        addTask(newTitle);
        setNewTitle('')
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTaskHandler()
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setNewTitle(e.currentTarget.value)

    const mappedTasks = tasks.map((task: TaskType) => {
        const removeTaskHandler = () => removeTasks(task.id)
        return <li key={task.id}>
            <Button title={'X'} onClick={removeTaskHandler}/>
            <input type="checkbox" checked={task.isDone}/>
            <span>{task.title}</span>
        </li>
    })

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input value={newTitle}
                       onChange={onChangeHandler}
                       onKeyDown={onKeyDownHandler}/>
                <Button title={'+'} onClick={addTaskHandler}/>
            </div>
            {
                tasks.length === 0
                    ? <p>No tasks</p>
                    : <ul>
                        {mappedTasks}
                    </ul>
            }
            <div>
                <Button title={'All'} onClick={() => changeFilterHandler('All')}/>
                <Button title={'Active'} onClick={() => changeFilterHandler('Active')}/>
                <Button title={'Completed'} onClick={() => changeFilterHandler('Completed')}/>
            </div>
        </div>
    );
};

//-----------------------------------------------------------------------------------------------

/*
import {filterValueType, TaskType} from '../App.tsx';
import {useRef} from 'react';

type TitlePropsType = {
    title: string
    tasks: TaskType[]
    removeTasks: (taskId: string) => void
    changeFilter: (filterValue: filterValueType) => void
    addTask: (newTitle: string) => void
}

export const Todolist = ({
                             title,
                             tasks,
                             removeTasks,
                             changeFilter,
                             addTask,
                         }: TitlePropsType) => {

    const inputRef = useRef<HTMLInputElement>(null);
    console.log(inputRef)

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input ref={inputRef}/>
                <button onClick={() => {
                    if (inputRef.current) {
                        addTask(inputRef.current.value)
                        inputRef.current.value = ''
                    }
                }}>+
                </button>
                {/!*<Button title={'+'}/>*!/}
            </div>
            {
                tasks.length === 0
                    ? <p>No tasks</p>
                    : <ul>
                        {tasks.map((task: TaskType) => {
                            return <li key={task.id}>
                                <button onClick={() => removeTasks(task.id)}>X
                                </button>
                                <input type="checkbox" checked={task.isDone}/>
                                <span>{task.title}</span>
                            </li>
                        })}
                    </ul>
            }
            <div>
                <button onClick={() => {
                    changeFilter('All')
                }}>All
                </button>
                <button onClick={() => {
                    changeFilter('Active')
                }}>Active
                </button>
                <button onClick={() => {
                    changeFilter('Completed')
                }}>Completed
                </button>
            </div>
        </div>
    );
};*/
