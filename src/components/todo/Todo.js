export default function Todo({todo}) {
    return (
        <li>
            <div className="view">
				<input className="toggle" type="checkbox" unchecked></input>
				<label>{todo}</label>
				<button className="destroy"></button>
			</div>
            
        </li>
    )
}