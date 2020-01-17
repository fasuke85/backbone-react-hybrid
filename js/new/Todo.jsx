import React, {useState} from 'react'

const ESC_KEY = 27

function Todo({completed, title, save, revert}) {
    const [title2, setTitle] = useState(title)

    const onKeyPress = e => {
        if(e.key === 'Enter') {
            save(title2)
        }
        
    }
    
    const onKeyDown = e => {
        if(e.keyCode === ESC_KEY) {
            revert()
        }
    }
    return (
        <>
            <div className="view">
				<input className="toggle" type="checkbox" defaultChecked={completed} />
                <label>{title}</label>
				<button className="destroy"></button>
			</div>
			<input className="edit" onKeyDown={onKeyDown} onKeyPress={onKeyPress} onBlur={() => save(title2)} onChange={e => setTitle(e.target.value)} value={title2}></input>
        </>
    ) 
}

export default Todo;