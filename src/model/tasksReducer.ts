import {TaskType} from '../App.tsx';
import {v1} from 'uuid';

type RemoveTaskACType = {
    type: 'REMOVE-TASK',
    payload: {
        taskId: string
    }
}

type AddTaskACType = {
    type: 'ADD-TASK',
    payload: {
        title: string
    }
}

type TasksReducerActionsType = RemoveTaskACType | AddTaskACType

export const tasksReducer = (state: TaskType[], action: TasksReducerActionsType): TaskType[] => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return state.filter((task) => {
                return task.id !== action.payload.taskId
            })
        case 'ADD-TASK':
            return [{
                id: v1(),
                title: action.payload.title,
                isDone: false
            }, ...state]
        default:
            return state
    }
}

export const removeTaskAC = (taskId: string): RemoveTaskACType => ({type: 'REMOVE-TASK', payload: {taskId}} as const)

export const addTaskAC = (title: string): AddTaskACType => ({type: 'ADD-TASK', payload: {title}} as const)