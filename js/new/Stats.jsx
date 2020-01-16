import React from 'react'

function Stats({completed, remaining}) {
    return (
        <div>
            <span className="todo-count"><strong> {remaining}</strong> {remaining === 1 ? 'item' : 'items'} left</span>
			<ul className="filters">
				<li>
					<a className="selected" href="#/">All</a>
				</li>
				<li>
					<a href="#/active">Active</a>
				</li>
				<li>
					<a href="#/completed">Completed</a>
				</li>
			</ul>
            { completed 
                ? <button className="clear-completed">Clear completed</button>
                : undefined

            }
        </div>
    )
}

export default Stats
