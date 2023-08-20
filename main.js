// Definición de la clase Task para representar una tarea
class Task {
    constructor(id, executionTime) {
      this.id = id;                   // Identificador de la tarea
      this.executionTime = executionTime; // Tiempo de ejecución de la tarea
      this.remainingTime = executionTime; // Tiempo restante de ejecución
      this.startTime = 0;             // Tiempo de inicio de la tarea
      this.endTime = 0;               // Tiempo de finalización de la tarea
      this.weight = 0;                // Peso de la tarea
      this.subtasks = [];             // Subtareas de la tarea
    }
  
    // Método para agregar subtareas
    addSubtask(subtask) {
      this.subtasks.push(subtask);
    }
  
    // Método para ejecutar la tarea en intervalos de tiempo (timeSlice)
    async execute(timeSlice) {
      console.log(`Executing Task ${this.id}...`);
      this.startTime = Date.now(); // Registrar el tiempo de inicio de la tarea
      const executionTime = Math.min(timeSlice, this.remainingTime);
      this.remainingTime -= executionTime; // Actualizar el tiempo restante
      updateProgressBar(this.id, this.executionTime - this.remainingTime);
      await new Promise(resolve => setTimeout(resolve, executionTime));
      this.endTime = Date.now(); // Registrar el tiempo de finalización de la tarea
      console.log(`Task ${this.id} completed (${this.remainingTime} ms remaining).`);
  
      return this.remainingTime > 0; // Devolver verdadero si la tarea aún no está completa
    }
  }
  
  // Clase Scheduler para administrar la planificación de tareas
  class Scheduler {
    constructor(tasks, timeSlice) {
      this.tasks = tasks;       // Lista de tareas
      this.timeSlice = timeSlice; // Intervalo de tiempo para ejecución
    }
  
    // Método para iniciar la planificación de tareas
    async start() {
      console.log("Starting Scheduling...");
  
      for (const task of this.tasks) {
        await this.executeTaskWithSubtasks(task);
      }
  
      console.log("All tasks completed.");
    }
  
    // Método para ejecutar una tarea con sus subtareas
    async executeTaskWithSubtasks(task) {
      if (task.subtasks.length > 0) {
        for (const subtask of task.subtasks) {
          await this.executeTaskWithSubtasks(subtask);
        }
      }
  
      const taskFinished = await task.execute(this.timeSlice);
  
      if (taskFinished) {
        console.log(`Task ${task.id} finished.`);
      } else {
        console.log(`Task ${task.id} not finished, re-queued.`);
      }
  
      // Calculamos y mostramos la eficiencia, el tiempo de ejecución y el peso
      const efficiency = calculateEfficiency(task.startTime, task.endTime, task.executionTime);
      const executionTime = task.executionTime;
      const weight = calculateWeight(efficiency, executionTime);
      updateTaskInfo(task.id, efficiency, executionTime, weight);
    }
  }
  
  // Creación de instancias de subtareas
  const subtask1 = new Task(1, 1000);
  const subtask2 = new Task(2, 1500);
  
  // Asignar subtareas a tareas principales
  const task1 = new Task(1, 4000);
  task1.addSubtask(subtask1);
  
  const task2 = new Task(2, 2000);
  task2.addSubtask(subtask2);
  
  const task3 = new Task(3, 3000);
  
  // Asignar tareas principales al planificador
  const tasks = [
    task1,
    task2,
    task3,
  ];
  
  // Creación de instancia de planificador con las tareas y tiempo de intervalo
  const scheduler = new Scheduler(tasks, 1000);
  
  // ... (El resto del código sigue igual)
  
  
  // Función para actualizar la barra de progreso en el HTML
  function updateProgressBar(taskId, progress) {
    const progressBar = document.getElementById(`progress${taskId}`);
    const percentage = (progress / tasks.find(task => task.id === taskId).executionTime) * 100;
    progressBar.style.width = `${percentage}%`;
    progressBar.setAttribute('aria-valuenow', percentage);
  }
  
  // Función para calcular la eficiencia
  function calculateEfficiency(startTime, endTime, executionTime) {
    const actualExecutionTime = endTime - startTime;
    return ((executionTime - actualExecutionTime) / executionTime) * 100;
  }
  
  // Función para calcular el peso
  function calculateWeight(efficiency, executionTime) {
    return efficiency * executionTime;
  }
  
  // Función para actualizar la información de la tarea en el HTML
  function updateTaskInfo(taskId, efficiency, executionTime, weight) {
    const efficiencySpan = document.getElementById(`efficiency${taskId}`);
    const executionTimeSpan = document.getElementById(`executionTime${taskId}`);
    const weightSpan = document.getElementById(`weight${taskId}`);
    
    efficiencySpan.textContent = ` ${efficiency.toFixed(2)}%`;
    executionTimeSpan.textContent = ` ${executionTime} ms`;
    weightSpan.textContent = ` ${weight.toFixed(2)}`;
  }
  
  
// Evento que se ejecuta cuando el DOM está completamente cargado
  document.addEventListener("DOMContentLoaded", () => {
    const startButton = document.getElementById("startButton");
    const infoBox = document.getElementById("infoBox");
    const progressBars = document.querySelectorAll(".progress-bar");
    
    
    startButton.addEventListener("click", async () => {
        // Deshabilitar el botón de inicio y limpiar la caja de información
    startButton.disabled = true;
    infoBox.innerHTML = "";
    infoBox.classList.remove("alert-success", "alert-danger");
    let allTasksCompleted = false;

    try {
      // Iniciar la planificación de tareas
      await scheduler.start();

      // Bucle para iterar hasta que todas las tareas se completen
      while (!allTasksCompleted) {
        allTasksCompleted = true;

        // Iterar a través de las tareas y ejecutarlas
        for (const task of tasks) {
          // Ejecutar la tarea en intervalos de tiempo definidos
          const taskFinished = await task.execute(scheduler.timeSlice);

          // Actualizar la barra de progreso y calcular eficiencia, tiempo y peso
          updateProgressBar(task.id, task.executionTime - task.remainingTime);
          const efficiency = calculateEfficiency(task.startTime, task.endTime, task.executionTime);
          const executionTime = task.executionTime;
          const weight = calculateWeight(efficiency, executionTime);
          updateTaskInfo(task.id, efficiency, executionTime, weight);

          // Comprobar si la tarea se completó o necesita reencolarse
          if (taskFinished) {
            console.log(`Task ${task.id} finished.`);
          } else {
            console.log(`Task ${task.id} not finished, re-queued.`);
            allTasksCompleted = false;
          }

          // Calcular estadísticas totales después de actualizar la tarea
           calculateTotalStatistics(tasks);
        }

        // Verificar si todas las barras de progreso están llenas
        const allProgressBarsFilled = Array.from(progressBars).every(progressBar => {
          const percentage = parseInt(progressBar.getAttribute('aria-valuenow'));
          return percentage >= 100;
        });

        // Si todas las tareas están completas, salir del bucle
        if (allProgressBarsFilled) {
          allTasksCompleted = true;
        }
      }
    
          infoBox.textContent = "All tasks completed.";
          infoBox.classList.add("alert-success");
        } catch (error) {
          infoBox.textContent = "An error occurred during simulation.";
          infoBox.classList.add("alert-danger");
        }
        //Habilitar Boton
        startButton.disabled = false;
      });
    

// Función para calcular estadisticas
    function calculateTotalStatistics(tasks) {
        let totalExecutionTime = 0;
        let totalWeight = 0;
        let completedTasks = 0;
    
        for (const task of tasks) {
        totalExecutionTime += task.executionTime;
        totalWeight += task.weight;
        if (task.remainingTime === 0) {
            completedTasks++;
        }
        }
        
        updateStatistics(totalExecutionTime,
            totalWeight,
            completedTasks)
    }
  
  
  
    function updateStatistics(totalExecutionTime,
        totalWeight,
        completedTasks) {
        
      
        document.getElementById("totalExecutionTime").textContent = ` ${totalExecutionTime} ms`;
        document.getElementById("completedTasks").textContent = ` ${completedTasks}`;
        
      }
  });
