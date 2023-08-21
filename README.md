# Politicas-de-programacion-de-tareas

##Como usar?

1. Clona este repositorio
2. Ejecuta `npm install`
3. Ejecuta `npm run dev`
4. Happy hacking :)

##Introducción 

En este proyecto, se han aplicado conceptos fundamentales de la teoría de árboles y la política de planificación Round-Robin para administrar eficientemente la ejecución de tareas. Estos enfoques son esenciales para lograr una organización jerárquica de tareas y asegurar una distribución equitativa de recursos de tiempo en la ejecución. 

Teoría de Árboles: En el proyecto, la teoría de árboles se aplica para modelar la jerarquía de tareas y sus subtareas. Cada Task tiene la capacidad de tener subtareas (subtasks). Esto se hace mediante el método addSubtask(subtask) en la clase Task, que permite agregar subtareas a una tarea principal. Esto crea una estructura jerárquica en forma de árbol, donde las tareas principales son nodos padres y las subtareas son nodos hijos. 
 

Task 1 

├── Subtask 1 

Task 2 

├── Subtask 2 

Task 3 


Al ejecutar scheduler.start(), el método executeTaskWithSubtasks(task) se encarga de recorrer recursivamente todas las subtareas de una tarea principal. Esto asegura que todas las subtareas se ejecutan en profundidad antes de pasar a la siguiente tarea principal. 

Política de Planificación Round-Robin: La política de planificación Round-Robin se basa en la demanda equitativa de intervalos de tiempo llamados "quantum" a cada tarea en la cola de planificación. En este proyecto, esta política se ha implementado en el método execute(timeSlice) de la clase Task. Cada tarea se ejecuta durante un intervalo de tiempo definido ( timeSlice). Si la tarea no se completa dentro de este intervalo, se coloca nuevamente en la cola de tareas pendientes para futura ejecución. 

Este proceso de equidad se ejecuta en el bucle while (!allTasksCompleted) del método start() en la clase Scheduler. En este bucle, se registran todas las tareas y se les da la oportunidad de ejecutarse durante el intervalo timeSlice. Si una tarea no se completa en una sola iteración del bucle, se le brinda la posibilidad de continuar su ejecución en rondas sucesivas hasta finalizar. 

En resumen, el proyecto combina la teoría de árboles para estructurar las relaciones jerárquicas entre tareas y subtareas, mientras que la política Round-Robin garantiza una distribución justa y eficiente del tiempo de ejecución entre las tareas. Esta combinación resulta en una ejecución ordenada y planificada de las tareas, representando aspectos esenciales de la gestión de procesos en sistemas informáticos.Principio del formulario 


##Documentación del Código 

Este documento proporciona una descripción detallada del código  que implementa la gestión de tareas y subtareas utilizando la teoría de árboles y la política de planificación Round Robin. 

Clase Task 

 

La clase `Task` representa una tarea en el sistema. Cada tarea tiene las siguientes propiedades: 

 

- `id`: Identificador único de la tarea. 

- `executionTime`: Tiempo total de ejecución de la tarea. 

- `remainingTime`: Tiempo restante de ejecución de la tarea. 

- `startTime`: Tiempo en que comenzó la ejecución de la tarea. 

- `endTime`: Tiempo en que se completó la ejecución de la tarea. 

- `weight`: Peso de la tarea, calculado en función de la eficiencia y el tiempo de ejecución. 

- `subtasks`: Una lista de subtareas asociadas a la tarea principal. 

 

La clase `Task` también tiene los siguientes métodos: 

 

- `addSubtask(subtask)`: Agrega una subtarea a la tarea principal. 

- `execute(timeSlice)`: Ejecuta la tarea durante un intervalo de tiempo definido (timeSlice). Si la tarea no se completa durante este tiempo, se reencola para futuras ejecuciones. Devuelve un valor booleano que indica si la tarea se ha completado. 

 

Clase Scheduler 

 

La clase `Scheduler` administra la planificación de tareas y subtareas. Tiene las siguientes propiedades: 

 

- `tasks`: Una lista de tareas a planificar. 

- `timeSlice`: El intervalo de tiempo para ejecutar las tareas en cada ciclo. 

 

La clase `Scheduler` tiene los siguientes métodos: 

 

- `start()`: Inicia la planificación de tareas. Llama al método `executeTaskWithSubtasks(task)` para recorrer las subtareas de cada tarea principal y ejecutarlas en profundidad. 

- `executeTaskWithSubtasks(task)`: Recorre recursivamente las subtareas de una tarea principal y ejecuta todas las tareas en profundidad. 

 

##Implementación de la Teoría de Árboles 

 

La teoría de árboles se aplica mediante el método `addSubtask(subtask)` en la clase `Task`. Esto permite crear jerarquías de tareas y subtareas, donde las tareas principales actúan como nodos padres y las subtareas como nodos hijos. 

 

##Implementación de la Política Round Robin 

 

La política de planificación Round Robin se implementa en el método `execute(timeSlice)` de la clase `Task`. Cada tarea se ejecuta durante un intervalo de tiempo definido. Si no se completa durante ese tiempo, se coloca nuevamente en la cola para ejecuciones posteriores. 

 

##Interfaz de Usuario y Visualización 

 

El código también incluye una interfaz de usuario que muestra barras de progreso para cada tarea y proporciona estadísticas sobre el tiempo de ejecución total y el peso total de las tareas. 

 

##Funcionamiento 

 
1. Crear instancias de tareas y subtareas. 

2. Asignar subtareas a tareas principales. 

3. Crear una instancia de `Scheduler` con las tareas y un intervalo de tiempo. 

4. Hacer clic en el botón de inicio para ejecutar la planificación. 

5. Observar el progreso de las tareas en las barras de progreso y las estadísticas. 

 

##Beneficios 

 
- Permite gestionar tareas jerárquicas y subtareas de manera eficiente. 

- Utiliza la política de planificación Round Robin para garantizar un tiempo de respuesta rápido para todas las tareas. 

- Proporciona una visualización clara del progreso de las tareas y estadísticas relevantes. 

- Aplica conceptos de teoría de árboles y políticas de planificación en un contexto práctico de programación. 

 

Para concluir podemos decir que este código de ejemplo demuestra cómo combinar la teoría de árboles y la política Round Robin para gestionar eficazmente tareas y subtareas. La estructura jerárquica permite una organización eficiente, mientras que la política de planificación garantiza una ejecución justa y equitativa de todas las tareas. 
