import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiPlusCircle } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    if (newTaskTitle === '') {
      return;
    }

    setTasks([...tasks, {
      id: Math.floor((1 + Math.random()) * 0x10000),
      title: newTaskTitle,
      isComplete: false,
    }]);

    setNewTaskTitle('');
  }

  function handleToggleTaskCompletion(idTask: number) {
    const newTasksArray = [...tasks].map(task => {
      if (task.id === idTask) {
        task.isComplete = !task.isComplete
      }
      return task;
    });
    setTasks(newTasksArray);
  }

  function handleRemoveTask(idTask: number) {
    const newTasksArray = [...tasks].filter(task => task.id !== idTask);
    setTasks(newTasksArray);
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas Tarefas</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiPlusCircle size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}