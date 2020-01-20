import React, { useState, useEffect } from 'react'

const ESC_KEY = 27

function Todo({ clear, toggle, isHidden, update, model }) {
    const [editMode, setEditMode] = useState(false)
    const [{completed, title}, setState] = useState({
        ...model.attributes,
    })
    const [editTitle, setEditTitle] = useState(title)


    useEffect(() => {
        model.on('change', () => {
            setState({
                completed,
                title,
                ...model.changedAttributes(),
            })
        });
    }, [])

    const save = () => {
        var trimmedValue = editTitle.trim();
		if (!editMode) {
			return;
		}
		if (trimmedValue) {
            update(trimmedValue);
		    setEditMode(false)
            
		} else {
            clear()
		}
    }

    const revert = () => {
        setEditMode(false);
        setEditTitle(title)
    }

    const onKeyPress = e => {
        if (e.key === 'Enter') {
            save()
        }

    }

    const onKeyDown = e => {
        if (e.keyCode === ESC_KEY) {
            revert()
        }
    }
    return (
        <div className={`${editMode ? 'editing' : ''}`}>
            <div className={`view ${(isHidden()) ? 'hidden' : ''} ${completed ? 'completed' : ''}`}>
                <input className="toggle" onChange={toggle} type="checkbox" checked={completed} />
                <label onDoubleClick={() => setEditMode(true)}>{title}</label>
                <button className="destroy" onClick={clear}></button>
            </div>
            <input
                className="edit" 
                ref={input => (editMode && input) && input.focus() } 
                onKeyDown={onKeyDown} 
                onKeyPress={onKeyPress} 
                onBlur={() => save(editTitle)} 
                onChange={e => setEditTitle(e.target.value)} 
                value={editTitle}
            />
        </div>
    )
}

export default Todo;