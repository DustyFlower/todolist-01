import {FilterValuesType} from '../App.tsx';

type ChangeFilterActionType = {
    type: 'CHANGE-FILTER',
    payload: {
        filter: FilterValuesType
    }
}

export const filterReducer = (state: FilterValuesType, action: ChangeFilterActionType): FilterValuesType => {
    switch (action.type) {
        case 'CHANGE-FILTER':
            return action.payload.filter
        default:
            return state
    }
}

export const changeFilterAC = (filter: FilterValuesType): ChangeFilterActionType => ({
    type: 'CHANGE-FILTER',
    payload: {filter}
} as const)