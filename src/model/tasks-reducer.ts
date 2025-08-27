import type {TasksState} from '../App'
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer.ts";
import {v1} from "uuid";

const initialState: TasksState = {}

type DeleteTaskActionType = ReturnType<typeof deleteTaskAC>

type CreateTaskActionType = ReturnType<typeof createTaskAC>

type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>

type changeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>

type Actions =
    AddTodolistActionType
    | RemoveTodolistActionType
    | DeleteTaskActionType
    | CreateTaskActionType
    | ChangeTaskStatusActionType | changeTaskTitleActionType

export const tasksReducer = (state: TasksState = initialState, action: Actions): TasksState => {
    switch (action.type) {
        case 'ADD-TODOLIST':
            return {...state, [action.payload.id]: []}
        case 'REMOVE-TODOLIST': {
            const {[action.payload.id]: removed, ...restTasks} = state
            return restTasks
        }
        case 'DELETE-TASK':
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(t => t.id !== action.payload.taskId)
            }
        case 'CREATE-TASK':
            return {
                ...state,
                [action.payload.todolistId]: [{
                    id: v1(),
                    title: action.payload.title,
                    isDone: false
                }, ...state[action.payload.todolistId]]
            }
        case 'CHANGE-TASK_STATUS':
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(t => t.id === action.payload.taskId ? {
                    ...t,
                    isDone: action.payload.isDone
                } : {...t})
            }
        case 'CHANGE-TASK_TITLE':
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(t => t.id === action.payload.taskId ? {
                    ...t,
                    title: action.payload.title
                } : {...t})
            }
        default:
            return state
    }
}

export const deleteTaskAC = (payload: { todolistId: string, taskId: string }) => ({
    type: 'DELETE-TASK',
    payload
} as const)

export const createTaskAC = (payload: { todolistId: string, title: string }) => ({
    type: 'CREATE-TASK',
    payload
} as const)

export const changeTaskStatusAC = (payload: {
    todolistId: string,
    taskId: string,
    isDone: boolean
}) => ({type: 'CHANGE-TASK_STATUS', payload} as const)

export const changeTaskTitleAC = (payload: {
    todolistId: string,
    taskId: string,
    title: string
}) => ({type: 'CHANGE-TASK_TITLE', payload} as const)