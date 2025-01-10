const process = require('process')
const EventEmitter = require('events')
const fs = require('fs')

const emitter = new EventEmitter()


if (!fs.existsSync('dataBase.json')) {
    fs.appendFileSync('dataBase.json', '[]', 'utf-8')
}

const allData = fs.readFileSync('dataBase.json', 'utf-8')
let json = JSON.parse(allData)

const command = process.argv[2]
let argvId = process.argv[3]
let text = process.argv[4]

if (!process.argv[4]) {
    text = process.argv[3]
}

if (!isNaN(parseInt(process.argv[4]))) {
    text = process.argv[3]
    argvId = process.argv[4]
}

argvId = parseInt(argvId)

let selectedTask = json.find(item => item.id === argvId)
const selectedIndex = json.findIndex(item => item.id === argvId)

function setId() {
    let freeId = 0
    if (json[0]) {
        freeId = json[json.length - 1].id + 1
    }
    return freeId
}

// function currentDate() {
//     let date = new Date
//     date.toISOString
    
// }


emitter.on('add', (data) => {
    try {
        if (!json) {
            fs.appendFileSync('dataBase.json', "[]", 'utf-8')
        }
        json.push(data)
        fs.writeFileSync('dataBase.json', JSON.stringify(json, null, 2), 'utf-8')
        console.log(`Задание успешно добавлено! (ID = ${data.id})`)
    } catch (error) {
        console.log("Ошибка выполнения команды: ", error)
    }
    
})

emitter.on('update', (data) => {
    try {
        selectedTask.description = data.description
        selectedTask.updatedAt = data.updatedAt
        json.splice(selectedIndex, 1, selectedTask)
        fs.writeFileSync('dataBase.json', JSON.stringify(json, null, 2), 'utf-8')
        console.log(`Задание успешно обновлено! (ID = ${selectedTask.id})`)
    } catch (error) {
        console.log("Ошибка выполнения команды: ", error)
    }
})

emitter.on('delete', () => {
    try {
        json.splice(selectedIndex, 1)
        fs.writeFileSync('dataBase.json', JSON.stringify(json, null, 2), 'utf-8')
        console.log(`Задание успешно удалено! (ID = ${argvId})`)
    } catch (error) {
        console.log("Ошибка выполнения команды: ", error)
    }
    
})

emitter.on('delete-all', () => {
    try {
        fs.writeFileSync('dataBase.json', JSON.stringify([], null, 2), 'utf-8')
        console.log('Все записи успешно удалены!')
    } catch {
        console.log("Ошибка выполнения команды: ", error)
    }
})

emitter.on('list', (data) => {
    try {
        switch (data.description) {
            case 'done':
                selectedTask = json.filter(item => item.status === 'done')
                console.log(selectedTask)
                break
    
            case 'in-progress':
                selectedTask = json.filter(item => item.status === 'in-progress')
                console.log(selectedTask)
                break
    
            case 'todo':
                selectedTask = json.filter(item => item.status === 'todo')
                console.log(selectedTask)
                break
    
            default:
                console.log(json)
                break
        }
    } catch (error) {
        console.log("Ошибка выполнения команды: ", error)
    }
    
})

emitter.on('mark-in-progress', () => {
    try {
        selectedTask.status = "in progress"
        selectedTask.updatedAt = moment().format('DD.MM.YYYY')
        json.splice(selectedIndex, 1, selectedTask)
        fs.writeFileSync('dataBase.json', JSON.stringify(json, null, 2), 'utf-8')
        console.log(`Статус успешно обновлен: ${selectedTask.status}`)
    } catch (error) {
        console.log("Ошибка выполнения команды: ", error)
    }
    

})

emitter.on('mark-done', () => {
    try {
        selectedTask.status = "done"
        selectedTask.updatedAt = moment().format('DD.MM.YYYY')
        json.splice(selectedIndex, 1, selectedTask)
        fs.writeFileSync('dataBase.json', JSON.stringify(json, null, 2), 'utf-8')
        console.log(`Статус успешно обновлен: ${selectedTask.status}`)
    } catch (error) {
        console.log("Ошибка выполнения команды: ", error)
    }
})

emitter.on('mark-todo', () => {
    try {
        selectedTask.status = "todo"
        selectedTask.updatedAt = moment().format('DD.MM.YYYY')
        json.splice(selectedIndex, 1, selectedTask)
        fs.writeFileSync('dataBase.json', JSON.stringify(json, null, 2), 'utf-8')
        console.log(`Статус успешно обновлен: ${selectedTask.status}`)
    } catch (error) {
        console.log("Ошибка выполнения команды: ", error)
    }
})

emitter.on('help', () => {
    const help = fs.readFileSync('README.md', 'utf-8')
    console.log(help)
})

emitter.emit(command, {
    "id": setId(),
    "description": text,
    "status": 'todo',
    "createdAt": new Date,
    "updatedAt": new Date
}, argvId)


