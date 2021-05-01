import React, {ChangeEvent} from "react";
import {FilterValuesType, TaskType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";


type TodoListPropsType = {
    id:string
    title: string,
    tasks: Array<TaskType>,
    addTask: (title: string , todoListID:string) => void,
    changeTodoListFilter: (newFilterValue: FilterValuesType , todoListID:string) => void,
    removeTask: (TaskId: string,todoListID:string) => void
    todoListFilter: string
    changeStatus : any
    removeTodoList: (todoListID : string) => void
    changeTitleValue:(id: string,todolistID:string,newTitle:string)=>void
}


function TodoList(props: TodoListPropsType) {
    const  removeTodoList =()=>{
        props.removeTodoList(props.id)
    }
    const tasks = props.tasks.map(t => {
        const onClickHandler  = ()=>{props.removeTask(t.id,props.id)}
        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>)=>{
            let newIsDone = e.currentTarget.checked;
            props.changeStatus(t.id , newIsDone,props.id)
        }
        return (
            <div key={t.id} className={t.isDone ? 'is-done' : ''}>
                <Checkbox   color="primary" checked={t.isDone}  onChange={onChangeHandler}  />
                <EditableSpan title={t.title} changeTitleValue={props.changeTitleValue} todolistID={props.id} ID={t.id}/>
                <IconButton onClick={onClickHandler}>
                    <Delete />
                </IconButton>
            </div>
        )
    })



    const addTask =(title : string)=>{
        props.addTask(title, props.id)
    }


    return (
        <div className="App">

            <div>
                <h3>{props.title}
                <IconButton onClick={removeTodoList}>
                    <Delete />
                </IconButton></h3>
                <AddItemForm addItem={addTask} />
                <div>
                    {tasks}
                </div>
                <div>
                    <Button variant={props.todoListFilter === 'all' ? 'contained' : 'text'} onClick={() => {
                        props.changeTodoListFilter('all',props.id)
                    }}>All
                    </Button>
                    <Button color='primary' variant={props.todoListFilter === 'active' ? 'contained' : 'text'} onClick={() => {
                        props.changeTodoListFilter('active',props.id)
                    }}>Active
                    </Button>
                    <Button color='secondary' variant={props.todoListFilter === 'completed' ? 'contained' : 'text'} onClick={() => {
                        props.changeTodoListFilter('completed',props.id)
                    }}>Completed
                    </Button>
                </div>
            </div>
        </div>
    );

}

export default TodoList;



