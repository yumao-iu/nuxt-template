import express from 'express'
import cors from 'cors'
import index from '../yumao/api_index'
import user from '../yumao/api_user'
import admin from '../yumao/api_admin'

let app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/api/v1/index', index)
app.use('/api/v1/user', user)
app.use('/api/v1/admin', admin)
app.listen(1000)


export default defineEventHandler(async (e) => {

})