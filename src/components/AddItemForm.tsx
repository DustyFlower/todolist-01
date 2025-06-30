import {Button} from './Button.tsx';
import {ChangeEvent, KeyboardEvent, useState} from 'react';

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

    return (
        <div>
            <input className={error ? 'error' : ''}
                   value={title}
                   onChange={onChangeItemTitleHandler}
                   onKeyDown={onKeyDownHandler}/>
            <Button title={'+'} onClick={addItemHandler}/>
            {error && <p className={'errorMessage'}>{error}</p>}
        </div>
    );
};