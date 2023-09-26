import { useState } from "react"

export default function Todo({todo}) {
    const [isChecked, setIsChecked] = useState(false);


    return (
        <li className={isChecked && "completed"}>
            <div className="view">
				<input className="toggle" type="checkbox" onChange={() => setIsChecked(!isChecked)}></input>
				<label>{todo}</label>
				<button className="destroy"></button>
			</div>
            
        </li>
    )
}