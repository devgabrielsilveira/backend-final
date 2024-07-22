import express, { json } from 'express'
import { v4 as uuidv4} from 'uuid'
import { validateNewMessage, validateMessageUpdate } from '../middlewares/validation'
import { users } from './users'

const router = express.Router()

const messages = []

router.post('/massage/:email', validateNewMessage, (request, response) => {
    const { title, description } = request.body
    const { email } = request.params

    const user = users.find( user => user.email === email )

    if (!user) {
        return response.status(404).json({ message: 'E-mail não encontrado, verifique ou crie uma conta.' })
    }

    const newMessage = {
        email,
        title,
        description,
        idMessage: uuidv4()
    }

    messages.push(newMessage)

    response.status(201).json({
        message: 'Mensagem criada com sucesso!',
        newMessage
    })
})

router.get('/massage/:email', (request, response) => {
    const { email } = request.params

    const messageIn = messages.filter( emailIn => emailIn.email === email )

    if (!messageIn) {
        return response.status(404).send('Email não encontrado, verifique ou crie uma conta.')
    }

    response.status(200).json({
        message: 'Seja bem-vindo!',
        messagesUser: messageIn
    })
})

router.put('/massage/:id', validateMessageUpdate, (request, response) => {
    const { title, description } = request.body
    const { id } = request.params

    const mesageId = messages.find( idOfMessage => idOfMessage.idMessage === id )

    if (!mesageId) {
        return response.status(404).json({ message: 'Por favor, informe um id válido da mensagem.' })
    }

    mesageId.title = title
    mesageId.description = description
    
    response.status(200).json({
        message: 'Mensagem atualizada com sucesso !',
        mesageId
    })
})

router.delete('/message/:id', (request, response) => {
    const { id } = request.params

    const messageDeleted = messages.findIndex( idOfMessage => idOfMessage.idMessage === id ) 

    if (messageDeleted === -1) {
        return response.status(404).json({ message: 'Mensagem não encontrada, verifique o identificador em nosso banco.'})
    }

    messages.slice(messageDeleted, 1)

    response.status(200).json({ message: 'Mensagem apagada com sucesso.' })
})

export default router