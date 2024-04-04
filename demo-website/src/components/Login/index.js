import {useState} from 'react'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import Axios from 'axios'
import './index.css'
import { LoginMainpage,LoginImage,UserInputContainer,LoginHeading,LoginFormContainer,LoginInputContainer,LoginLabelElement,LoginInputElement,LoginButton } from './styledComponents'
const Login=(props)=>{
    const [username,setUsername]=useState("")
    const [password,setPassword]=useState("")
    const [usernamechange,setonChangeUsername]=useState(false)
    const [passwordchange,setonChangePassword]=useState(false)
    const [showError,setShowError]=useState(false)
    const [erorMsg,setErrorMsg]=useState('')
    const onUsernameChange=(event)=>{
        setUsername(event.target.value)
        setonChangeUsername(true)
        setonChangePassword(false)
    }
    const onPasswordChange=(event)=>{
        setPassword(event.target.value)
        setonChangePassword(true)
        setonChangeUsername(false)
    }

    const onLoginClick=(event)=>{
        event.preventDefault()
        getdetails()
        setPassword('')
        setUsername('')
    }

    const getdetails= async ()=>{
        const options={
            method:"GET",
            headers:{
                "Content-Type":"application/json",
            },
        }
        try{
            const response=await window.fetch(options,'http//:localhost:3000/api')
            const data= await response.json()
            console.log(data)
        }catch{
            console.log('fetch failed')
        }
        
    }

    const gettingUserLogin= async ()=>{
        const userDetails={
            username,password
        }
        const options={
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify(userDetails)
        }
        const response=await fetch(options,'http//:localhost:3000/api/login')
        const data= await response.json()
        console.log(data)
        if(response.ok){
            const token=data.jwtToken
            Cookies.set('jwt_token',token,{expires:2})
            const {history}=props
            history.replace('/register')
        }else{
            setShowError(true)
            setErrorMsg(data)
        }
    }

    return(
        <LoginMainpage>
            <LoginImage alt="login-image" src="https://tse1.mm.bing.net/th?id=OIP.vlG3sSKcA4qvJIeaO58Y5AAAAA&pid=Api&P=0&h=180"/>
            <UserInputContainer>
                <LoginHeading>User Details!</LoginHeading>
                <LoginFormContainer onSubmit={onLoginClick}>
                    <LoginInputContainer>
                        <LoginLabelElement>USERNAME</LoginLabelElement>
                        <LoginInputElement onChange={onUsernameChange} isactive={usernamechange} value={username} type="text" placeholder="Enter Your Username"/>
                    </LoginInputContainer>
                    <LoginInputContainer>
                        <LoginLabelElement>PASSWORD</LoginLabelElement>
                        <LoginInputElement onChange={onPasswordChange} isactive={passwordchange} value={password} type="password" placeholder="Enter Password"/>
                    </LoginInputContainer>
                    {showError==="true" && <p>{erorMsg}</p>}
                    <div className='buttons-container'>
                        <LoginButton type="submit" buttonType>Login</LoginButton>
                        <Link className="link-item" to="/register">  
                            <LoginButton>Register</LoginButton>
                        </Link>
                    </div>
                </LoginFormContainer>
            </UserInputContainer>
        </LoginMainpage>
    )
}

export default Login