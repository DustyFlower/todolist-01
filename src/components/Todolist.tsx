import {filterValueType, TaskType} from '../App.tsx';
import {Button} from './Button.tsx';

type TitlePropsType = {
    title: string
    tasks: TaskType[]
    removeTasks: (taskId: number) => void
    changeFilter: (filterValue: filterValueType) => void
}

export const Todolist = ({
                             title,
                             tasks,
                             removeTasks,
                             changeFilter}: TitlePropsType) => {
    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input/>
                <Button title={'+'}/>
            </div>
            {
                tasks.length === 0
                    ? <p>No tasks</p>
                    : <ul>
                        {tasks.map((task: TaskType) => {
                            return <li key={task.id}>
                                <button onClick={()=> removeTasks(task.id)}>X
                                </button>
                                <input type="checkbox" checked={task.isDone}/>
                                <span>{task.title}</span>
                            </li>
                        })}
                    </ul>
            }
            <div>
                <button onClick={()=>{changeFilter('All')}}>All</button>
                <button onClick={()=>{changeFilter('Active')}}>Active</button>
                <button onClick={()=>{changeFilter('Completed')}}>Completed</button>
            </div>
        </div>
    );
};