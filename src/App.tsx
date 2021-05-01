import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean,
}

export type FilterValuesType = "all" | "active" | "completed"

export type ToDoListType = {
    id: string,
    title: string,
    filter: FilterValuesType

}

export type TaskStateType = {
    [key: string]: Array<TaskType>
}


function App() {
    const todoListID_1 = v1()
    const todoListID_2 = v1()

    const [todoList, setTodoList] = useState<Array<ToDoListType>>([
        {id: todoListID_1, title: 'What to learn', filter: "all"},
        {id: todoListID_2, title: 'What to buy', filter: "all"},
    ])


    let [tasks, setTasks] = useState<TaskStateType>({
        [todoListID_1]: [
            {id: v1(), title: "Html", isDone: true},
            {id: v1(), title: "Css", isDone: true},
            {id: v1(), title: "React", isDone: false},
        ],
        [todoListID_2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Beer", isDone: true},
            {id: v1(), title: "Water", isDone: false},
        ],

    })

    function removeTask(id: string, todoListID: string) {
        tasks[todoListID] = tasks[todoListID].filter(t => t.id !== id);
        setTasks({...tasks});
    }

    function addTask(title: string, todoListID: string) {
        const newTask = {
            id: v1(),
            title: title,
            isDone: false
        }
        setTasks({...tasks, [todoListID]: [newTask, ...tasks[todoListID]]})
    }

    function changeTodoListFilter(newFilterValue: FilterValuesType, todoListID: string) {
        setTodoList(todoList.map(tl => tl.id === todoListID ? {...tl, filter: newFilterValue} : tl))
    }


    function changeStatus(id: string, newIsDoneValue: boolean, todolistID: string) {
        const updatedTasks = tasks[todolistID].map(t => t.id === id ? {...t, isDone: newIsDoneValue} : t)
        setTasks({...tasks, [todolistID]: updatedTasks})
    }

    function removeTodoList(todoListId: string) {
        const updatedTodoList = todoList.filter(tl => tl.id !== todoListId)
        setTodoList(updatedTodoList)
        delete tasks[todoListId]
    }

    function changeTitleValue(id: string, todolistID: string, newTitle: string) {
        const updatedTitleValue = tasks[todolistID].map(t => t.id === id ? {...t, title: newTitle} : t)
        setTasks({...tasks, [todolistID]: updatedTitleValue})
    }

    function getTasksForTodoList(todoList: ToDoListType) {
        switch (todoList.filter) {
            case "active":
                return tasks[todoList.id].filter(t => t.isDone === false)
            case "completed":
                return tasks[todoList.id].filter(t => t.isDone === true)
            default :
                return tasks[todoList.id]

        }
    }

    function addTodoList(title: string) {
        let todoLists: ToDoListType = {
            id: v1(),
            title: title,
            filter: 'all'
        };
        setTodoList([todoLists, ...todoList])
        setTasks({...tasks, [todoLists.id]: []})
    }

    return (

        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding : '20px 0'}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={5}>
                    {todoList.map(tl => {
                        return (<Grid item>
                                <Paper style={{padding : '10px'}} elevation={7}>
                                <TodoList
                                    key={tl.id}
                                    id={tl.id}
                                    title={tl.title}
                                    tasks={getTasksForTodoList(tl)}
                                    changeTodoListFilter={changeTodoListFilter}
                                    removeTask={removeTask}
                                    removeTodoList={removeTodoList}
                                    addTask={addTask}
                                    todoListFilter={tl.filter}
                                    changeStatus={changeStatus}
                                    changeTitleValue={changeTitleValue}
                                />
                                </Paper>
                            </Grid>

                        )
                    })}
                </Grid>
            </Container>
        </div>


    );
}

export default App;
