import express from 'express'
let route = express.Router()


route.post('/init_data', (req, res) => {
    res.send({ data: 'ok' })
})

export default route