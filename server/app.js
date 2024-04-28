const express = require('express')
const app = express()
app.use(express.json())
const cors = require('cors')
app.use(cors())

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
      response.status(400)
      response.send({"error":`Invalid password`})
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
      response.status(400)
      response.send({"error":`Invalid Username`})
    } else {
      const isPasswordMach = await bcrypt.compare(password, dbUser.password)
      if (isPasswordMach == true) {
        const payLoad = {username: username}
        const jwtToken = jwt.sign(payLoad, 'sai_token')
        response.send({jwtToken})
      } else if (isPasswordMach == false) {
        response.status(400)
        response.send({"error":`Invalid password`})
      }
    }
  })


  app.post('/api/register', async (request, response) => {
    const {username, name, password} = request.body
    const hassedPassword = await bcrypt.hash(password, 10)
    const userQuery = `
      SELECT 
        * 
      FROM 
        user_table
      WHERE 
        username = '${username}'`
    const dbUser = await db.get(userQuery)
    if (dbUser === undefined) {
      if (password.length >= 5) {
        const addUser = `
              INSERT INTO user_table(username,name,password)
              VALUES(
                  '${username}',
                  '${name}',
                  '${hassedPassword}'
                  )`
        await db.run(addUser)
        response.status(200).send({"error":`Successful registration of the registrant`})
      } else {
        response.status(400).send({"error":`Password is too short`})
      }
    } else {
      response.status(400).send({"error":`User already exists`})
    }
  })


  app.post('/api/forgot-password',async(request,response)=>{
    const {username,password}=request.body
    const query=`
      SELECT 
        *
      FROM 
        user_table
      WHERE 
        username='${username}'
    `
    const user_details=await db.get(query)
    if(user_details===undefined){
      response.status(400).send({'error':"Username Not Found"})
    }
    else{
      if(password.length<6){
        response.status(400).send({'error':"Password is Too Short"})
      }else{
        const hassedPassword=await bcrypt.hash(password,10)
        const queryToUpdate=`
        UPDATE user_table
        SET password = '${hassedPassword}'
        WHERE username='${username}'        
        `
        await db.run(queryToUpdate)
        response.status(200).send({"msg":"New password set successfully"})
      }
    }
  })

  // middleware function
  const accesstokenfunction = (request, response, next) => {
    const authorHeader = request.headers['authorization']
    let jwtToken
    if (authorHeader !== undefined) {
      jwtToken = authorHeader.split(' ')[1]
    }
    if (jwtToken === undefined) {
      response.status = 401
      response.send('Invalid JWT Token')
    } else {
      jwt.verify(jwtToken, 'sai_token', async (error, user) => {
        if (error) {
          response.status = 401
          response.send('Invalid JWT Token')
          console.log(this.user)
        } else {
          request.user=user
          next()
        }
      })
    }
  }


// api for profile 
app.post('/api/profile',accesstokenfunction, async(request,response)=>{
  const{user}=request
  const name =user.username
  const userQuery=`
    SELECT 
      name
    FROM 
      user_table
    WHERE 
      username='${name}'
  `   
  const profileName= await db.get(userQuery)
  response.send({"user":`${profileName.name}`})
})


module.exports=app