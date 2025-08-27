import {ChangeEvent, useState} from 'react';

type EditableSpanPropsType = {
    oldTitle: string
    onClick: (updateTitle: string) => void
};
export const EditableSpan = ({oldTitle, onClick}: EditableSpanPropsType) => {

    let [editMode, setEditMode] = useState<boolean>(false)
    const [updateTitle, setUpdateTitle] = useState<string>(oldTitle)

    const EditModeHandler = () => {
        setEditMode(!editMode)
        if (editMode) {
            onClick(updateTitle)
        }
    }

    const updateTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setUpdateTitle(event.currentTarget.value)
    }

    return (
        editMode ?
            <input type="text" value={updateTitle} onBlur={EditModeHandler} autoFocus onChange={updateTitleHandler}/> :
            <span onDoubleClick={EditModeHandler}>{oldTitle}</span>
    );
};