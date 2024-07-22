import express from 'express'
import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'
import { validateNewUser, validateLogin } from '../middlewares/validation'

const router = express.Router()

export const users = []

router.post('/signup', validateNewUser, async (request, response) => {
    try {
        const { name, email, password } = request.body
        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = {
            idUser: uuidv4(),
            name,
            email,
            password: hashedPassword
        }

        users.push(newUser)
        
        response.status(201).json({ message: `Seja bem vindo ${name}! Pessoa usuária registrada com sucesso!` })
    } catch {
        response.status(500).json({ message: 'Erro ao entrar na página.' });
    }
})

router.post('/login', validateLogin, async (request, response) => {
    try {
        const { email, password } = request.body
        const user = users.find(user => user.email === email)

        if (!user) {
            return response.status(404).json({ message: 'E-mail ou senha inválidos.' })
        }

        const validatePassword = await bcrypt.compare(password, user.password)

        if (!validatePassword) {
            return response.status(404).json({ message: 'E-mail ou senha inválidos.' })
        }

        response.status(200).json({ message: `Seja bem vindo ${user.name}! Pessoa usuária logada com sucesso!` })
    } catch {
        response.status(500).json({ message: 'Erro ao fazer login na página.' });
    }
})

export default router