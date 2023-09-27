import { useState } from "react";
import "./task-item.css"


//Informando o type de cada uma das props pertencentes a TaskItem
type Props = {
  id: number;
  title: string;
  taskState: string;
  onTaskUpdate: Function;
  onDeleteTask: Function
}

const TaskItem: React.FC<Props> = ({ id, title, taskState, onTaskUpdate, onDeleteTask }) => {
  //Hook useState usado para determinar o estado atual
  const [isEditing, setIsEditing] = useState(false)
  const [edittableTitle, setEdittableTitle] = useState(title)

  //Função para mudança do titulo da task
  const ontitleChange = (event) => {
    const newTitle = event.target.value
    setEdittableTitle(newTitle)
    onTaskUpdate(id, newTitle, taskState)
  }

  //Função para confirmar a edição do titulo com a tecla enter e remoção da task caso for enviado um input vazio
  const onKeyPress = (event) => {
    if (event.key === "Enter") {
      setIsEditing(false)
      if (edittableTitle.length === 0) {
        onDeleteTask(id)
      }
    }
  }

  //Função para mudança de evento da task(pendente, fazendo, completa)
  const onTaskStateChange = (event) => {
    onTaskUpdate(id, title, event.target.value)
  }

  //Condicional para verificar se for clickado na task abri o input de edição
  if (isEditing) {
    return (
      <div className="task-item">
        <input type="text" value={edittableTitle} onChange={ontitleChange} onKeyPress={onKeyPress} />
      </div>
    )
  } else {
    //Senão mostra o nome da task com a lista de opções do estado da task
    return (
      <div className="task-item">
         <div onClick={(e) => setIsEditing(true)}>{edittableTitle}</div>
         <select onChange={onTaskStateChange} value={taskState}>
          <option value="Pendente">Pendente</option>
          <option value="Fazendo">Fazendo</option>
          <option value="Completa">Completa</option>
         </select>
      </div>
    )
  }
}


export default TaskItem
