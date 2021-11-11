
class Task {
    constructor(task, onComplete, onDelete) {
        this.task = task 
        this.onComplete = onComplete
        this.onDelete = onDelete
    }
    render() {
        console.log(this.task)
        const container = document.createElement('div')
        const p = document.createElement('p')
        const deleteButton = new Button('Delete', this.onDelete)

        p.innerText = this.task.text

        container.style.display = 'flex'
        container.style.justifyContent = 'space-between'
        container.style.backgroundColor = 'rgba(0,0,0,0.1)'
        container.style.marginBottom = '4px'
        container.style.padding = '4px'
        container.style.borderRadius = '4px'

        console.log('stop', this.task)

        if(this.task.isComplete) {
            p.style.textDecoration = 'line-through'
        }
        p.style.margin = '4px'
        p.style.width = '100%'
        p.style.fontFamily = 'sans-serif'
        p.addEventListener('click', () => this.onComplete())

        container.appendChild(p)
        container.appendChild(deleteButton.render())
        return container
    }
}































