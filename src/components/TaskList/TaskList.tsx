import './tasklist.css';
import TaskItem from '../TaskItem/TaskItem';
// import PropTypes from "prop-types"

type Props = {
  title: string,
  onAddTask: Function,
  tasks: Array<{title:string; id:number; state:string}>
  onTaskUpdate: Function
  taskState: string
  onDeleteTask: Function
}

//Componente TaskList
const TaskList: React.FC<Props> = ({ title, taskState, onAddTask, tasks, onTaskUpdate, onDeleteTask }) => {

  //Funlçao que adiciona a task passando um nome default e uma lista de opções do evento
  const addTask = () => {
    onAddTask("Nova Tarefa", taskState)
  }
  return (
    <div className="tasklist">
      <div className="title">{title}</div>
      <div className="content">
        {tasks.map((task) => {
          return <TaskItem key={task.id} id={task.id} title={task.title} taskState={task.state} onTaskUpdate={onTaskUpdate} onDeleteTask={onDeleteTask}/>
        })}
        { tasks.length === 0 && <div className="empty-list">Lista Vazia</div> }
        <button onClick={addTask} className="btn">Adicionar Tarefa</button>
      </div>
    </div>
  )
}

export default TaskList
// TaskList.propTypes = {
//   title: PropTypes.string.isRequired
// }
