import React from 'react'

function Item({completed, title}) {
    return (
        <>
            <div className="view">
				<input className="toggle" type="checkbox" defaultChecked={completed} />
                <label>{title}</label>
				<button className="destroy"></button>
			</div>
			<input className="edit" defaultValue={title}></input>
        </>
    ) 
}

export default Item;