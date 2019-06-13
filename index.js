
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 4000
const state = require('./state')
app.use(bodyParser.json())

app.get('/', (req,res) => res.send('hello world'))
app.get('/users', (req,res) => res.json(state.users))
app.get('/users/:userId', (req,res) =>{
  state.users.filter(item => item._id === req.params.userId)
  res.json(state.users[req.params.userId - 1])
})
app.put('/users/:userId', (req,res)=>{
  state.users[req.params.userId - 1].name = 'snob'
  res.json(state.users[req.params.userId - 1])
})
app.delete('/users/:userId', (req,res)=>{
  state.users[req.params.userId - 1].isActive = false
  res.json('deleted')
})
app.post('/users', (req,res) =>{
  console.log(req.body)
  state.users.push(req.body)
  res.json(state.users[state.users.length-1])
} )
app.put('/users/1', (req,res)=>{
  state.users[0].name = 'bob'
  res.json(state.users[0])
})
app.delete('/users/1', (req,res)=>{
  state.users.shift()
  res.json('deleted')
})

app.listen(port, () => 
  console.log(`Example app listening on port ${port}!`))

