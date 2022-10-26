const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()



app.use(express.json())
app.use(cors())

morgan.token('data', function (req){
  return JSON.stringify(req.body)
})

app.use(morgan(':method :url :status - :response-time ms - :data'))

let persons = [
  {
    id: 1, 
    name: "Arto Hellas",
    numer: "040-123456",
  },
  {
    id: 2, 
    name: "Arto Hellas",
    numer: "040-123456",
  },
  {
    id: 3, 
    name: "Arto Hellas",
    numer: "040-123456",
  },
  {
    id: 4, 
    name: "Arto Hellas",
    numer: "040-123456",
  },
] 

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>')
})

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

// get one person
app.get('/api/persons/:id', (req, res) => {
  let id = Number(req.params.id)
  let person = persons.find( person => person.id === id)

  if(person){
    res.json(person)
  } else{
    res.status(404).end()
  }
})

app.get('/info', (req, res) => {
  let date = new Date()

  res.send(`<h1>Phone back has info for ${persons.length} people</h1><br /><p>${date}</p>`)
})

// delete one person
app.delete('/api/persons/:id', (req, res) => {
  let id = Number(req.params.id)
  persons = persons.filter( person => person.id !== id)

  res.status(204).end()
})

function generateId(){
  return Math.floor(Math.random() * 1000)
}

app.post('/api/persons', (req, res) => {
  const body = req.body

  if(!body){
    return res.status(400).json({
      error: "content missing"
    })
  }

  if(!body.name){
    return res.status(400).json({
      error: "falta el nombre"
    })
  }

  if(!body.number){
    return res.status(400).json({
      error: "falta el numero"
    })
  }

  let nameExist = persons.find( person => person.name === body.name)
  if(nameExist){
    return res.status(400).json({
      error: 'el nombre ya existe en la agenda'
    })
  }

  const person = {
    id: generateId(),
    name: body.name, 
    number: body.number,
  }

  persons = persons.concat(person)
  res.json(person)
})



const PORT = process.env.PORT || 4001
app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`)
})