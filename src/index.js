import express from 'express'
import cors from 'cors'

import startApp from './routes/startApp'
import users from './routes/users'
import message from './routes/messages'

const port = 3000

const app = express()

app.use(express.json())
app.use(cors())

app.use('/', startApp)
app.use('/', users)
app.use('/', message)

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}!`)
})