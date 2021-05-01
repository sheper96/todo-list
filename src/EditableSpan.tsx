import React, {ChangeEvent, useState} from "react";
import {TextField} from "@material-ui/core";

type EditableSpanPropsType = {
    title: string
    changeTitleValue:(id: string,todolistID:string,newTitle:string)=>void
    todolistID: string
    ID:any

}

export function EditableSpan(props: EditableSpanPropsType) {
    const [editMode,setEditMode]=useState(true)

    const activateEditMode = ()=>{
        setEditMode(true)
    };

    const activateViewMode = ()=>{
        setEditMode(false)
    };

    const changeTitleValue=(e:ChangeEvent<HTMLInputElement>)=>{
        console.log(props.title)
        console.log(e.currentTarget.value)
        console.log(props.title)


        props.changeTitleValue(props.ID, props.todolistID ,e.currentTarget.value)

    }


    return  editMode ?
        <span onDoubleClick={activateViewMode}>{props.title}</span> :
        <TextField onBlur={activateEditMode} value={props.title} onChange={changeTitleValue} autoFocus/>

}