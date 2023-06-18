import express from 'express'
import { execSync  } from 'child_process'

const server = express()

server.use(express.json())

const routes = express.Router()

routes.post('/webhooks', async (req, res) => {

    const event = req.headers['x-github-event']

    if(event == 'pull_request'){
        const currentAction = req.body.action
        const isMerged = req.body.pull_request.merged

        if(currentAction == 'closed' && isMerged == true){
            try {
                // Executar o comando 'git pull'
                const output = execSync('git pull origin main');
                console.log(`'git pull' executado com sucesso. Saída: ${output.toString()}`);
            } catch (error) {
                console.error(`Erro ao executar 'git pull': ${error}`);
            }
            console.log('Branch mergiada demais')
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
