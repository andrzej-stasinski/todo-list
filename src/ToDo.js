import Task from './Task'
import Form from './Form'
import Loader from './Loader'
import Error from './Error'

// const makeApiURL = (key) => `https://coderoad-andrzej-default-rtdb.firebaseio.com/todo/${key}.json`
// const makeApiURL = (key) => `httpsxxx://coderoad-andrzej-default-rtdb.firebaseio.com/todo/${key}.json`
class ToDo {
    constructor(storageKey) {
        console.log(storageKey)
        this.storageKey = storageKey || 'todo'
        this.container = null
        
        this.tasks = []
        this.isLoading = true
        this.isError = false
        this.loadTasks()
        
    }
    makeApiURL(key) {
        return `https://coderoad-andrzej-default-rtdb.firebaseio.com/todo/${key}.json`

    }
    setLoading(newLoading) {
        this.isLoading = newLoading
        this.render()
    }
    setError(error) {
        this.isError = error
        this.render()
    }

    loadTasks() {
        this.setLoading(true)
        return fetch(this.makeApiURL(this.storageKey))
            .then(res => res.json())
            .then(data => { 
                console.log(data)
                this.tasks = data || []
                this.render()
            })
            .catch(err => {
                console.log(err.message)
                this.setError(err.message)
            })
            .finally(() => {
                this.setLoading(false)
            })
    }

    setTasks(newTasks) {
        this.setLoading(true)
        return fetch(this.makeApiURL(this.storageKey), {
            method: 'PUT',
            body: JSON.stringify(newTasks)
        })
        .then(res => res.json())
        .then(newData => {
            console.log(newData)
            this.tasks = newData
            this.render()
        })
        .finally(() => {
            this.setLoading(false)
        })
    } 

    deleteTask(indexToDoDelete) {
        const newTasks = this.tasks.filter((taskData, index) => {
            return index !== indexToDoDelete
        })
        this.setTasks(newTasks)
    }

    addTask(text) {
        console.log('addTask')
        const newTaskData = {
            text: text,
            isComplete: false,
        }
        const newTasks = this.tasks.concat(newTaskData)
        this.setTasks(newTasks)
    }

    toggleComplete(indexToComplete) {
        const newTasks = this.tasks.map((task, index) => {
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
            // debugger
            this.container.style.position = this.isError ? 'relative' : ''
        }
        this.container.innerText = ''

        if(this.isError) {
            const loader = new Error(`Error: ${this.isError}`)
            this.container.appendChild(loader.render())
            return this.container
        }

        if(this.isLoading) {
            const loader = new Loader('Loading (.)(.)(.)')
            this.container.appendChild(loader.render())
            // return this.container
        }

        const form = new Form('', (value) => {
            console.log(value)
            this.addTask(value)
        })

        this.container.appendChild(form.render())
        this.renderTasks()

        this.container.appendChild(document.createElement('hr'))
        
        return this.container
    }
}

export default ToDo
































