import express from 'express'

const server = express()

server.use(express.json())

const routes = express.Router()

routes.post('/webhooks', async (req, res) => {
    console.log(JSON.stringify(req.body))

    const event = req.headers.accept

    const branchNameComplete = req.body.ref

    const branch = branchNameComplete.split('/')[2]

    console.log('Nome da branch: ', branch)
    console.log('Evento:', event)

    res.send("Recebido")
})

routes.get('/', async (req, res) => {
    console.log('deu', req)
    res.status(200).send({
        message: "deu bom"
    })
})

server.use(routes)

server.use((err, req, res, next)=>{
    console.log('errinho:', err)
    res.status(500).send('Algo deu errado!')
})

server.listen('8000', async ()=>{
    console.log('Servidor online na porta 8000!')
})