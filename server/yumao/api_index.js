import express from 'express'
let route = express.Router()


route.post('/init', (req, res) => {
    res.send({ data: 'ok' })
})

export default route