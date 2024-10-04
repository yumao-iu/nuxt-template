let indexBaseURL  = 'http://127.0.0.1:1000/api/v1/index'
let userBaseURL  = 'http://127.0.0.1:1000/api/v1/user'
let adminBaseURL  = 'http://127.0.0.1:1000/api/v1/admin'

if (process.env.NODE_ENV == 'production') {
    indexBaseURL = 'https://hl.sb:2000/api/v1/index'
    userBaseURL = 'https://hl.sb:2000/api/v1/user'
    adminBaseURL = 'https://hl.sb:2000/api/v1/admin'
}


export default {
    indexBaseURL, userBaseURL, adminBaseURL
}