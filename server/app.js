const express = require('express')
const app = express()
app.use(express.json())

const {open} = require('sqlite')
const sqlite3 = require('sqlite3')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const path = require('path')
const exp = require('constants')
const filePath = path.join(__dirname, '/database/demodatabase.db')

let db

const initializeDbAndServer = async () => {
  try {
    db = await open({
      filename: filePath,
      driver: sqlite3.Database,
    })
    app.listen(3000, () => {
      console.log(`server Running....`)
    })
  } catch (error) {
    console.log(`db.error:${error.message}`)
  }
}

initializeDbAndServer()


//login api
app.post('/api/login', async (request, response) => {
    const {username, password} = request.body
    if(username===undefined || password===undefined ){
      response.send('Invalid ones')
    }
    const userQuery = `
    SELECT 
      *
    FROM 
      user_table
    WHERE 
      username='${username}';`
    const dbUser = await db.get(userQuery)
    if (dbUser === undefined) {
      response.status = 400
      response.send(`Invalid user`)
    } else {
      const isPasswordMach = await bcrypt.compare(password, dbUser.password)
      if (isPasswordMach == true) {
        const payLoad = {username: username}
        const jwtToken = jwt.sign(payLoad, 'sai_token')
        response.send({jwtToken})
      } else if (isPasswordMach == false) {
        response.status = 400
        response.send(`Invalid password`)
      }
    }
  })



app.get('/api',async (request,response)=>{
  const query=`
  SELECT 
    * 
  FROM 
    user_table`
  const userDetails= await db.all(query)
  console.log(typeof userDetails)
  response.send(userDetails)
})

module.exports=app