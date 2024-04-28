import {useState} from 'react'
import Cookies from 'js-cookie'
import {Link,useNavigate} from 'react-router-dom'
import {TailSpin} from 'react-loader-spinner'
import { IoMdCheckmarkCircle } from "react-icons/io";
import './index.css'
import { Mainpage,LoginMainpage,Errorpara,LoginImage,UserInputContainer,LoginHeading,LoginFormContainer,LoginInputContainer,LoginLabelElement,LoginInputElement,LoginButton,SuccessHeading ,ForgotPara} from './styledComponents'
const Login=(props)=>{
    const [username,setUsername]=useState("")
    const [password,setPassword]=useState("")
    const [usernamechange,setonChangeUsername]=useState(false)
    const [passwordchange,setonChangePassword]=useState(false)
    const [showError,setShowError]=useState(false)
    const [erorMsg,setErrorMsg]=useState('')
    const [isLoginSuccess,setLoginSuccess]=useState(false)
    const[isLoading,setLoading]=useState(false)
    const navigate=useNavigate()
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
        if(isLoading===false){
            setLoading(true)
            gettingUserLogin()
            setPassword('')
            setUsername('')
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
            body: JSON.stringify(userDetails),
        }
        const response=await fetch('http://localhost:3000/api/login',options)
        const data= await response.json()
        console.log(response.ok)
        console.log(data)
        if(response.ok){
            const token=data.jwtToken
            Cookies.set('jwt_token',token,{expires:2})
            setLoginSuccess(true)
            setTimeout(()=>{
                navigate('/')
            },1000)
            
        }else{
            setLoading(false)
            setErrorMsg(data.error)
            setShowError(true) 
        }
    }

    const SuccessView=()=>(
        <div className="successIconContainer">
            <IoMdCheckmarkCircle  color="#05a129" size="70"/>
            <SuccessHeading>Login Successful</SuccessHeading>
        </div>
    )
    const loadingApi=()=>(
        <TailSpin  color="#dae0eb" height="16" width="16" />
    )

    return(
        <Mainpage>
            {isLoginSuccess ? SuccessView():
            <LoginMainpage>
            <LoginImage alt="login-image" src="https://tse1.mm.bing.net/th?id=OIP.vlG3sSKcA4qvJIeaO58Y5AAAAA&pid=Api&P=0&h=180"/>
            <UserInputContainer>
                <LoginHeading>User Details!</LoginHeading>
                <LoginFormContainer onSubmit={onLoginClick}>
                    <LoginInputContainer>
                        <LoginLabelElement>USERNAME</LoginLabelElement>
                        <LoginInputElement onChange={onUsernameChange} isactive={usernamechange} value={username} type="text" placeholder="Enter Username/Email id"/>
                    </LoginInputContainer>
                    <LoginInputContainer>
                        <LoginLabelElement>PASSWORD</LoginLabelElement>
                        <LoginInputElement onChange={onPasswordChange} isactive={passwordchange} value={password} type="password" placeholder="Enter Password"/>
                    </LoginInputContainer>
                    {showError && <Errorpara>{erorMsg}</Errorpara>}
                    <div className='buttons-container'>
                        <LoginButton type="submit" buttonType loading={isLoading}>{isLoading ? loadingApi():"Login"}</LoginButton>
                        <Link className="link-item" to="/register">  
                            <LoginButton>Register</LoginButton>
                        </Link>
                    </div>
                    <Link className="link-item" to="/forgot-password">
                        <ForgotPara>Forgot Password?</ForgotPara>
                    </Link>
                </LoginFormContainer>
            </UserInputContainer>
            </LoginMainpage>
            }
        </Mainpage>
    )
}

export default Login