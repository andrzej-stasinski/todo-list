import Task from './Task'
import Form from './Form'
class ToDo {
    constructor(storageKey) {
        this.storageKey = storageKey || 'todo'
        this.container = null
        this.tasks = this.loadTasks() || []
    }

    loadTasks() {
        return JSON.parse(localStorage.getItem(this.storageKey))
    }

    setTasks(newTasks) {
        this.tasks = newTasks
        localStorage.setItem(this.storageKey, JSON.stringify(this.tasks))
        this.render()
    } 

    deleteTask(indexToDoDelete) {
        const newTasks = this.tasks.filter((taskData, index) => {
            return index !== indexToDoDelete
        })
        this.setTasks(newTasks)
    }

    addTask(text) {
        const newTaskData = {
            text: text,
            isComplete: false,
        }
        const newTasks = this.tasks.concat(newTaskData)
        this.setTasks(newTasks)
    }

    toggleComplete(indexToComplete) {
        const newTasks = this.tasks.map((task, index) => {
            console.log(task)
            if(index !== indexToComplete) return task
            return {
                text: task.text,
                isComplete: !task.isComplete 
            }
        })
        this.setTasks(newTasks)
    }

    renderTasks() {
        this.tasks.forEach((taskData, index) => {
            console.log('forEach')
            const task = new Task(
                taskData, 
                () => this.toggleComplete(index), 
                () => this.deleteTask(index)
                )
            this.container.appendChild(task.render())
        })        
    }

    render() {
        if(this.container === null) {
            this.container = document.createElement('div')
        }
        this.container.innerText = ''
        

        const form = new Form('', (value) => {
            console.log(value)
            this.addTask(value)
        })

        this.container.appendChild(form.render())

        this.renderTasks()

        return this.container
    }
}

export default ToDo
































