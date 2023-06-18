import express from 'express'

const server = express()

server.use(express.json())

const routes = express.Router()

routes.post('/webhooks', async (req, res) => {

    const event = req.headers['x-github-event']

    if(event == 'push'){
        const branchNameComplete = req.body.ref
        const branch = branchNameComplete.split('/')[2]

        console.log('Nome da branch: ', branch)
    }

    if(event == 'pull_request'){
        const currentAction = req.body.action
        const isMerged = req.body.pull_request.merged

    if(currentAction == 'closed' && isMerged == true){
        console.log('Branch mergiado!!!!')
    }
        console.log(currentAction, isMerged)
    }

    console.log('Evento recebido:', event)

    res.send("Evento recebido!")
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
