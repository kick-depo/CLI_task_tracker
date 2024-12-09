const process = require('process')
const EventEmitter = require('events')
const moment = require('moment')
const fs = require('fs')

const emitter = new EventEmitter()

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


emitter.on('add', (data) => {
    json.push(data)
    fs.writeFileSync('dataBase.json', JSON.stringify(json, null, 2), 'utf-8')
    console.log(`Задание успешно добавлено! (ID = ${data.id})`)
})

emitter.on('update', (data) => {
    selectedTask.description = data.description
    selectedTask.updatedAt = moment().format('DD.MM.YYYY')
    json.splice(selectedIndex, 1, selectedTask)
    fs.writeFileSync('dataBase.json', JSON.stringify(json, null, 2), 'utf-8')
    console.log(`Задание успешно обновлено! (ID = ${data.id})`)
})

emitter.on('delete', () => {
    json.splice(selectedIndex, 1)
    fs.writeFileSync('dataBase.json', JSON.stringify(json, null, 2), 'utf-8')
    console.log(`Задание успешно удалено! (ID = ${argvId})`)
})

emitter.on('delete-all', () => {
    try {
        fs.writeFileSync('dataBase.json', JSON.stringify([], null, 2), 'utf-8')
        console.log('Все записи успешно удалены!')
    } catch {
        console.log('Ошибка удаления всех файлов :c')
    }
})

emitter.on('list', () => {
    console.log(json)
})

emitter.on('mark-in-progress', () => {
    selectedTask.status = "in progress"
    selectedTask.updatedAt = moment().format('DD.MM.YYYY')
    json.splice(selectedIndex, 1, selectedTask)
    fs.writeFileSync('dataBase.json', JSON.stringify(json, null, 2), 'utf-8')
    console.log(`Статус успешно обновлен: ${selectedTask.status}`)

})

emitter.on('mark-done', () => {
    selectedTask.status = "done"
    selectedTask.updatedAt = moment().format('DD.MM.YYYY')
    json.splice(selectedIndex, 1, selectedTask)
    fs.writeFileSync('dataBase.json', JSON.stringify(json, null, 2), 'utf-8')
    console.log(`Статус успешно обновлен: ${selectedTask.status}`)
    
})

emitter.on('mark-todo', () => {
    selectedTask.status = "todo"
    selectedTask.updatedAt = moment().format('DD.MM.YYYY')
    json.splice(selectedIndex, 1, selectedTask)
    fs.writeFileSync('dataBase.json', JSON.stringify(json, null, 2), 'utf-8')
    console.log(`Статус успешно обновлен: ${selectedTask.status}`)
    
})

emitter.emit(command, {
    "id": Date.now() - 1733149700000,
    "description": text,
    "status": 'todo',
    "createdAt": moment().format('DD.MM.YYYY'),
    "updatedAt": moment().format('DD.MM.YYYY')
}, argvId)


