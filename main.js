const process = require('process')
const EventEmitter = require('events')
const moment = require('moment')
const fs = require('fs')
require('dotenv').config()

const emitter = new EventEmitter()

const allData = fs.readFileSync('dataBase.json', 'utf-8')
const json = JSON.parse(allData)


emitter.on('add', (data) => {
    json.push(data)
    fs.writeFileSync('dataBase.json', JSON.stringify(json, null, 2), 'utf-8')
    console.log(`Задание успешно добавлено! (ID = ${data.id})`)
})

emitter.on('update', (data) => {

})

emitter.on('delete', (data) => {
    
})

emitter.on('delete-all', () => {
    try {
        fs.writeFileSync('dataBase.json', JSON.stringify([], null, 2), 'utf-8')
        console.log('Все записи успешно удалены!')
    } catch {
        console.log('Ошибка удаления всех файлов :c')
    }
})

emitter.on('list', (data) => {
    
})

emitter.on('mark', (data) => {
    
})

emitter.emit(process.argv[2], {
    "id": Date.now() - 1733149700000,
    "description": process.argv[3],
    "status": null,
    "createdAt": moment().format('DD.MM.YYYY'),
    "updatedAr": moment().format('DD.MM.YYYY')
})
