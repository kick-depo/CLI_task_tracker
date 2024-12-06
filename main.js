const process = require('process')
const EventEmitter = require('events')
const moment = require('moment')
const fs = require('fs')

const emitter = new EventEmitter()

const allData = fs.readFileSync('dataBase.json', 'utf-8')
const json = JSON.parse(allData)

const command = process.argv[2]
const argvId = process.argv[3]
const text = process.argv[4] || null

if (!process.argv[4]) {
    text = argvId
}

const selectedTask = json.find(item => item.id === argvId)


emitter.on('add', (data) => {
    json.push(data)
    fs.writeFileSync('dataBase.json', JSON.stringify(json, null, 2), 'utf-8')
    console.log(`Задание успешно добавлено! (ID = ${data.id})`)
})

emitter.on('update', (data, argvId) => {

})

emitter.on('delete', (data, argvId) => {
    // const selectedTask = json.find(item => item.id === argvId)
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

emitter.on('mark-in-progress', (data) => {
    
})

emitter.on('mark-done', (data) => {
    data.status = 'done'
    
})

emitter.emit(command, {
    "id": Date.now() - 1733149700000,
    "description": text,
    "status": 'todo',
    "createdAt": moment().format('DD.MM.YYYY'),
    "updatedAr": moment().format('DD.MM.YYYY')
}, argvId)


