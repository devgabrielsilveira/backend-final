import express, { response } from 'express'
import { users } from '../routes/users'

export function validateNewUser(request, response, next) {
    const { name, email, password } = request.body
    const user = users.find( user => user.email === email )

    if (!name) {
        return response.status(400).json({ message: 'Por favor, verifique se passou o nome.' })
    }
    if (!email) {
        return response.status(400).json({ message: 'Por favor, verifique se passou o email.' })
    }
    if (user) {
        return response.status(400).json({ message: 'Email já cadastrado, insira outro.' })
    }
    if (!password) {
        return response.status(400).json({ message: 'Por favor, verifique se passou a senha.' })
    }

    next()
}

export function validateLogin(request, response, next) {
    const { email, password } = request.body

    if (!email) {
        response.status(400).json({ message: 'Insira um e-mail válido.' })
    }
    if (!password) {
        response.status(400).json({ message: 'Insira uma senha válida.' })
    }

    next();
}

export function validateNewMessage(request, response, next) {
    const { title, description } = request.body

    if (!title) {
        response.status(400).json({ message: 'Você precisa passar um título.' })
    }
    if (!description) {
        response.status(400).json({ message: 'Você precisa passar uma descrição.' })
    }

    next();
}

export function validateMessageUpdate(request, response, next) {
    const { title, description } = request.body

    if (!title) {
        response.status(400).json({ message: 'Por favor, verifique se passou o titulo.'})
    }
    if (!description) {
        response.status(400).send({ message: 'Por favor, verifique se passou uma descrição.' })
    }

    next();
}