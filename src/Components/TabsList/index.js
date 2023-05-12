import './index.css'

const TabsList = props => {
  const {tab, activeTabBtn, isActive} = props
  const {displayText, optionId} = tab
  const btnBg = isActive ? 'btn-bg' : ''
  const updateTab = () => {
    activeTabBtn(optionId, isActive)
  }

  return (
    <li>
      <button type="button" className={`btn ${btnBg}`} onClick={updateTab}>
        {displayText}
      </button>
    </li>
  )
}

export default TabsList
