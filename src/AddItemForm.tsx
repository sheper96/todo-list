import React, {ChangeEvent, useState} from "react";
import {Button, IconButton, TextField} from "@material-ui/core";
import {AddBox, ControlPoint} from "@material-ui/icons";

type AddItemFormType = {
    addItem: (title: string) => void,
}

export function AddItemForm(props: AddItemFormType) {
    const [title, setTitle] = useState<string>('')
    let [error, setErrorMessage] = useState<string | null>(null)

    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
    const addItem = () => {
        if (title.trim() !== "") {
            props.addItem(title);
            setTitle(" ");
            setErrorMessage(null)
        } else {
            setErrorMessage('Title is required')
        }
    }
    return (
        <div>
            <div>
                <TextField onChange={changeTitle}
                           variant='outlined'
                           label='Type Value'
                           value={title}
                           error={!!error}
                           helperText={error}
                           onKeyPress={(e) => {
                               if (e.charCode === 13) {
                                   addItem();
                               }

                           }}/>
                <IconButton  color='primary' onClick={addItem}>
                    <AddBox/>
                </IconButton>
            </div>
        </div>
    )
}