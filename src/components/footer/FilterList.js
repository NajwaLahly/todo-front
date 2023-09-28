import { Link } from "react-router-dom";

export default function FilterList({ displayAll, displayActive, displayCompleted }){
    
    return (
        <ul className="filters">
            <li><Link to={'/'}>All</Link></li>
            <li><Link to={'/active'}>Active</Link></li>
            <li><Link to={'/completed'}>Completed</Link></li>
        </ul>
    )
}

