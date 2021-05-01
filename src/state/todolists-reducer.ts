import {FilterValuesType, ToDoListType} from "../App";
import {v1} from "uuid";


type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    title: string
    toDoListId : string
}
export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    title: string
    id: string
}
export type ChangeRemoveTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    filter: FilterValuesType
    id: string
}

type ActionType =
    RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeRemoveTodolistFilterActionType

export const todolistsReducer = (state: Array<ToDoListType>, action: ActionType): Array<ToDoListType> => {

    switch (action.type) {
        case 'REMOVE-TODOLIST' : {
            return state.filter(t => t.id !== action.id)
        }
        case 'ADD-TODOLIST' : {

            return [...state, {id: action.toDoListId, title: action.title, filter: 'all'}]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            const todolist = state.find(t => t.id === action.id);
            if (todolist) {
                todolist.title = action.title
            }
            return [...state]
        }
        case 'CHANGE-TODOLIST-FILTER': {
            const todolist = state.find(t => t.id === action.id);
            if (todolist) {
                todolist.filter = action.filter
            }
            return [...state]
        }
        default:
            throw new Error("I don't understand this type")
    }

}



export const RemoveTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return { type: 'REMOVE-TODOLIST', id: todolistId}
}
export const AddTodolistAC = (title: string): AddTodolistActionType => {
    return { type: 'ADD-TODOLIST', title: title, toDoListId: v1()}
}

export const ChangeTodolistTitleAC = (title: string, id : string): ChangeTodolistTitleActionType => {
    return { type: 'CHANGE-TODOLIST-TITLE', title: title,id:id}
}

export const ChangeTodolistFilterAC = (filter: FilterValuesType, id : string): ChangeRemoveTodolistFilterActionType => {
    return { type: 'CHANGE-TODOLIST-FILTER', filter: filter,id:id}
}

