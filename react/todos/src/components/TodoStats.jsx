export default function TodoStats(props){
  const {total, active, completed ,onClearCompleted} = props
  return(
    <div>
      <p>Total: {total} | Active: {active} | Completed: {completed}</p>
      {
        completed > 0 && (
          <button 
          onClick={onClearCompleted}
          className="clear-btn"
          >Clear Completed</button>
        ) 
      }
    </div>
  )
}