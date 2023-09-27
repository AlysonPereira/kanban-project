import './style.css';

import TaskList from './components/TaskList/TaskList';
import Navbar from './components/Navbar/Navbar';
import { useState } from 'react';

//função para gerar Id's únicos
let idAcc: number = 0
const generateId = () => {
  idAcc = idAcc + 1
  return idAcc
}

const App: React.FC = () => {
  //Controle de estado do container onde as tasks serão adicionadas
  const [tasks, setTasks] = useState([])

  //função para adicionar tasks
  const addTask = (title: string, state: string) => {
    const newTask = {
      id: generateId(),
      title,
      state
    }
    setTasks((existingTasks) => {
      return [...existingTasks, newTask]
    })
  }

  //Função para editar cada task
  const updateTask = (id:number, title:string, state:string) => {
    setTasks((existingTasks) => {
      return existingTasks.map((task) => {
        if (task.id === id) {
          //{...} metodo desconstrutivo recebe todas as tasks anteriores
          return {...task, title, state}
        } else {
          return task
        }
      })
    })
  }

  //Função para deletar apenas a task com o id da mesma
  const deleteTask = (id:number) => {
    setTasks((existingTasks) => {
      return existingTasks.filter((tasks) => tasks.id !== id)
    })
  }

  //corpo da aplicação
  return (
    <div className='App'>
      <Navbar />
      <div className='container'>
        <TaskList title="Pendente" taskState="Pendente" onAddTask={addTask} tasks={tasks.filter(t => t.state === "Pendente")} onTaskUpdate={updateTask} onDeleteTask={deleteTask}/>
        <TaskList title="Fazendo" taskState="Fazendo" onAddTask={addTask} tasks={tasks.filter(t => t.state === "Fazendo")} onTaskUpdate={updateTask} onDeleteTask={deleteTask}/>
        <TaskList title="Completa" taskState="Completa" onAddTask={addTask} tasks={tasks.filter(t => t.state === "Completa")} onTaskUpdate={updateTask} onDeleteTask={deleteTask}/>
      </div>
    </div>
  );
}

export default App;
