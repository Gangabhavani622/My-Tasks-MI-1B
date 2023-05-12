import {Component} from 'react'
import {v4 as uuidV4} from 'uuid'
import TabsList from './Components/TabsList'
import Task from './Components/Task'

import './App.css'

// These are the lists used in the application. You can move them to any component needed.

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

// Replace your code here
class App extends Component {
  state = {
    userInput: '',
    optionSelected: tagsList[0].optionId,
    tasksList: [],
    activeTab: '',
  }

  onChangeUserInput = event => {
    this.setState({userInput: event.target.value})
  }

  onChangeOption = event => {
    this.setState({optionSelected: event.target.value})
  }

  getUpdatedTasksList = () => {
    const {activeTab, tasksList} = this.state
    if (activeTab !== '') {
      const updatedList = tasksList.filter(item => item.category === activeTab)
      return updatedList
    }
    return tasksList
  }

  onSubmitForm = () => {
    const {userInput, optionSelected} = this.state
    if (userInput !== '') {
      const taskDetails = {
        taskName: userInput,
        category: optionSelected,
        id: uuidV4(),
      }
      this.setState(prevState => ({
        tasksList: [...prevState.tasksList, taskDetails],
        optionSelected: tagsList[0].optionId,
        userInput: '',
      }))
    }
  }

  updateActiveBtn = (value, active) => {
    if (active === true) {
      this.setState({activeTab: ''})
    } else {
      this.setState({activeTab: value})
    }
  }

  render() {
    const {userInput, optionSelected, activeTab} = this.state
    const updatedTasksList = this.getUpdatedTasksList()
    console.log(optionSelected)
    return (
      <div className="app-container">
        <div className="form-container">
          <h1 className="heading">Create a Task</h1>
          <form onSubmit={this.onSubmitForm} className="form-container">
            <label htmlFor="task" className="label">
              Task
            </label>
            <input
              type="text"
              value={userInput}
              id="task"
              placeholder="Enter the task here"
              className="input-ele"
              onChange={this.onChangeUserInput}
            />
            <label htmlFor="taskCategory" className="label">
              Tags
            </label>
            <select
              className="input-ele"
              id="taskCategory"
              value={optionSelected}
              onChange={this.onChangeOption}
            >
              {tagsList.map(item => (
                <option value={item.optionId} key={item.optionId}>
                  {item.displayText}
                </option>
              ))}
            </select>
            <button type="submit" className="add-btn">
              Add Task
            </button>
          </form>
        </div>
        <div className="tasks-container">
          <h1 className="task-heading">Tags</h1>
          <ul className="tab-container">
            {tagsList.map(item => (
              <TabsList
                key={item.optionId}
                isActive={item.optionId === activeTab}
                tab={item}
                activeTabBtn={this.updateActiveBtn}
              />
            ))}
          </ul>
          <h1 className="task-heading">Tasks</h1>
          {updatedTasksList.length === 0 ? (
            <p className="empty-list-view">No Tasks Added Yet</p>
          ) : (
            <ul className="task-list">
              {updatedTasksList.map(eachTask => (
                <Task key={eachTask.id} taskDetails={eachTask} />
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default App
