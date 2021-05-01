import {FilterValuesType, TaskStateType} from "../App";
import {v1} from "uuid";
import {AddTodolistActionType} from   "./todolists-reducer";

type removeTaskAT = {
    type: "REMOVE_TASK"
    taskId: string
    todolistId: string
}
type addTaskAT = {
    type: "ADD_TASK"
    title: string
    todoListID : string
}
type changeTaskStatusAT = {
    type: "CHANGE-TASK-STATUS"
    taskId: string
    todoListID : string
    isDone : boolean
}

type changeTaskTitleAT = {
    type: "CHANGE-TASK-TITLE"
    taskId: string
    todoListID : string
    title : string
}
type removeTodolistAT = {
    type: "REMOVE-TODOLIST"
    todoListID : string
}


type ActionType = removeTaskAT | addTaskAT | changeTaskStatusAT | changeTaskTitleAT | AddTodolistActionType | removeTodolistAT

export const tasksReducer = (state: TaskStateType, action: ActionType): TaskStateType => {
    switch (action.type) {
        case "REMOVE_TASK": {
            let stateCopy = {...state}
            stateCopy[action.todolistId] = stateCopy[action.todolistId].filter(tasks => tasks.id != action.taskId)

            return stateCopy
        }
        case "ADD_TASK": {
            let stateCopy = {...state}
            const newTask = {
                id: v1(),
                title: action.title,
                isDone: false
            }
            stateCopy[action.todoListID] = [newTask, ...stateCopy[action.todoListID]]
            return stateCopy
        }
        case "CHANGE-TASK-STATUS": {
            let stateCopy = {...state}
            let tasks = stateCopy[action.todoListID]
            let task = tasks.find(t=> t .id === action.taskId)
            if (task){
                task.isDone = action.isDone;
            }
            return stateCopy
        }
        case "CHANGE-TASK-TITLE": {
            let stateCopy = {...state}
            let tasks = stateCopy[action.todoListID]
            let task = tasks.find(t=>t.id ===action.taskId)
            if (task){
                task.title = action.title
            }
            return stateCopy
        }
        case "ADD-TODOLIST": {
            let stateCopy = {...state}
            stateCopy[action.toDoListId] = [];
            return stateCopy
        }
        case "REMOVE-TODOLIST": {
            let stateCopy = {...state}

            delete stateCopy[action.todoListID]



            return stateCopy
        }
        default:
            return state
    }

}
export const removeTaskAC = (taskId: string, todolistId: string): removeTaskAT => {
    return {type: "REMOVE_TASK", taskId: taskId, todolistId: todolistId}
}

export const addTaskAC = (title:string , todoListID:string): addTaskAT => {
    return {type: "ADD_TASK", title : title , todoListID : todoListID }
}
export const changeTaskStatusAC = ( taskId:string,isDone : boolean, todoListID: string  ): changeTaskStatusAT => {
    return {type: "CHANGE-TASK-STATUS", taskId, todoListID, isDone }
}

export const changeTaskTitleAC = ( taskId:string,title : string, todoListID: string ): changeTaskTitleAT => {
    return {type: "CHANGE-TASK-TITLE", taskId, todoListID, title }
}
export const RemoveTodolistAC = (  todoListID: string ): removeTodolistAT => {
    return {type: "REMOVE-TODOLIST", todoListID }
}

