const express = require('express')
const app = express()

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

app.use(express.json())

app.use(requestLogger)

// const unknownEndpoint = (request, response) => {
//   response.status(404).send({ error: 'unknown endpoint' })
// }

// app.use(unknownEndpoint)

let persons = [
  {
    id: 1,
    name: 'iii',
    number: '4757',
  },
  {
    id: 2,
    name: 'kenny',
    number: '67895',
  },
  {
    id: 3,
    name: 'pop smoke',
    number: '87572',
  },
]

const generateID = (persons) => {
  const maxID = persons.length > 0 ? Math.max(...persons.map((n) => n.id)) : 0
  return maxID + 1
}

app.get('/', (req, res) => {
  res.send('<h1>Hello World</h1>')
})

app.get('/api/info', (req, res) => {
  let length = persons.length
  res.send(
    `<h1>
    <p>PhoneBook has info for ${length} people</p>
    <p>${Date().toString()}</p>
    </h1>`
  )
})

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.post('/api/persons', (req, res) => {
  const body = req.body
  let isBodyValid = persons.find(p => p.name == body.name)
  
if (!body.name || !body.number) {
    return res.status(404).json({
      error: 'content missing',
    })
  }

  else if (isBodyValid) {
    return res.status(404).json({
      error: 'name must be unique',
    })
}
  

  const person = {
    id: generateID(persons),
    name: body.name,
    number: body.number,
  }

  persons = persons.concat(person)
  res.json(person)
})
app.get('/api/persons/:id', (req, res) => {
  const id = +req.params.id

  const person = persons.find((person) => person.id === id)
  if (person) res.json(person)
  else
    res.status(404).json({
      error: 'content missing',
    })
})

app.delete('/api/persons/:id', (req, res) => {
  const id = +req.params.id

 
  persons = persons.filter((person) => person.id !== id)
 
  res.status(204).end()

})

const PORT = 3001
app.listen(PORT)
console.log(`note is about to be written on localhost:${PORT}`)
