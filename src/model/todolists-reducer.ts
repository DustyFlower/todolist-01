import {v1} from 'uuid';
import {FilterValueType, TodolistType} from '../App.tsx';

export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>

export type AddTodolistActionType = ReturnType<typeof addTodolistAC>

export type ChangeFilterActionType = ReturnType<typeof changeFilterAC>

export type ChangeTodolistTitleType = ReturnType<typeof changeTodolistTitleAC>

export type ActionsType =
    RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeFilterActionType
    | ChangeTodolistTitleType

export const todolistsReducer = (state: TodolistType[], action: ActionsType): TodolistType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.payload.id)
        case 'ADD-TODOLIST':
            return [{id: action.payload.id, title: action.payload.title, filter: 'All'}, ...state]
        case 'CHANGE-FILTER':
            return state.map(tl => tl.id === action.payload.id ? {...tl, filter: action.payload.filter} : tl)
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.payload.id ? {...tl, title: action.payload.title} : tl)
        default:
            return state
    }
}

export const removeTodolistAC = (id: string) => ({type: 'REMOVE-TODOLIST', payload: {id}} as const)

export const addTodolistAC = (title: string) => ({type: 'ADD-TODOLIST', payload: {id: v1(), title}} as const)

export const changeFilterAC = (id: string, filter: FilterValueType) => ({
    type: 'CHANGE-FILTER',
    payload: {id, filter}
} as const)

export const changeTodolistTitleAC = (id: string, title: string) => ({
    type: 'CHANGE-TODOLIST-TITLE',
    payload: {id, title}
} as const)