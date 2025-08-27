import {
    addTodolistAC,
    changeFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from './todolists-reducer.ts';
import {v1} from 'uuid'
import {TodolistType} from '../App.tsx';
import {expect} from 'vitest';

let todolistId1: string
let todolistId2: string
let startState: TodolistType[]

beforeEach(() => {
    todolistId1 = v1()
    todolistId2 = v1()

    startState = [
        {id: todolistId1, title: 'What to learn', filter: 'All'},
        {id: todolistId2, title: 'What to buy', filter: 'All'},
    ]
})

test('correct todolist should be removed', () => {
    const endState = todolistsReducer(startState, removeTodolistAC(todolistId1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})

test('correct todolist should be added', () => {

    const endState = todolistsReducer(startState, addTodolistAC('New Todolist'))

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe('New Todolist')
})

test('correct todolist should change its name', () => {
    const endState = todolistsReducer(startState, changeTodolistTitleAC(todolistId2, 'Changed Title of Todolist'))

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe('Changed Title of Todolist')
})

test('correct filter of todolist should be changed', () => {

    const endState = todolistsReducer(startState, changeFilterAC(todolistId2, 'Completed'))

    expect(endState[0].filter).toBe('All')
    expect(endState[1].filter).toBe('Completed')
})