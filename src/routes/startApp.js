import express from 'express'

const router = express.Router()

router.get('/', (request, response) => {

    return response.status(200).json({ message: 'Bem vindo à aplicação.' });
    
})

export default router