import {ChangeEvent, KeyboardEvent, useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

type AddItemFormPropsType = {
    addItem: (title: string) => void
};

export const AddItemForm = ({addItem}: AddItemFormPropsType) => {

    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const addItemHandler = () => {
        if (title.trim()) {
            addItem(title.trim());
            setTitle('')
        } else {
            setError('Title is required')
        }
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addItemHandler()
        }
    }

    const onChangeItemTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setTitle(e.currentTarget.value)
    }

    const buttonStyle = {
        maxWidth: '38px',
        maxHeight: '38px',
        minWidth: '38px',
        minHeight: '38px',
        marginLeft: '5px'
    }

    return (
        <div>
            <TextField error={!!error}
                       helperText={error}
                       id="outlined-basic"
                       size={'small'}
                       label="Type smth..."
                       variant="outlined"
                       value={title}
                       onChange={onChangeItemTitleHandler}
                       onKeyDown={onKeyDownHandler}/>

            <Button onClick={addItemHandler}
                    variant={'contained'}
                    sx={buttonStyle}>+</Button>
        </div>
    );
};