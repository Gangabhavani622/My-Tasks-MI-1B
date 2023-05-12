import './index.css'

const Task = props => {
  const {taskDetails} = props
  const {taskName, category} = taskDetails

  return (
    <li className="list-item">
      <p className="task-item">{taskName}</p>
      <p type="button" className="category-btn">
        {category}
      </p>
    </li>
  )
}

export default Task
