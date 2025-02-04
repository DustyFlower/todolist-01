import {TaskPropsType} from '../App.tsx';
import {Task} from './Task.tsx';
import {Button} from './Button.tsx';

type TitlePropsType = {
    title: string
    tasks: TaskPropsType[]
}

export const Todolist = ({title, tasks}: TitlePropsType) => {

    const mappedTasks = tasks.map((task: TaskPropsType) =>
        <Task key={task.id} title={task.title} isDone={task.isDone}/>
    )

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {mappedTasks}
            </ul>
            <div>
                <Button title={'All'}/>
                <Button title={'Active'}/>
                <Button title={'Completed'}/>
            </div>
        </div>
    );
};