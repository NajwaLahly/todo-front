export default function FilterList({ displayAll, displayActive, displayCompleted }){
    
    return (
        <ul className="filters">
            <li onClick={displayAll}>All</li>
            <li onClick={displayActive}>Active</li>
            <li onClick={displayCompleted}>Completed</li>
        </ul>
    )
}

