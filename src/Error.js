
class Error {
    constructor(message) {
        this.message = message || 'Loading ...'
    }
    render() {
        const div = document.createElement('div')
        div.style.color = 'red'
        div.style.fontSize = '24px'

        div.style.width = '100%'
        div.style.height = '100%'
        div.style.display = 'flex'
        div.style.justifyContent = 'center'
        div.style.alignItems = 'center'
        div.style.position = 'absolute'
        div.style.left = '0'
        div.style.top = '0'
        div.style.zIndex = 1
        div.style.fontFamily = 'san-serif'

        div.style.backgroundColor = 'rgba(255, 255, 255, 0.5)'
        div.textContent = this.message
        return div
    }
}
export default Error































