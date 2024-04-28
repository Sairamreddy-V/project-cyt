import {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import {TailSpin} from 'react-loader-spinner'
import { LoginMainpage,RegistrationStatus,Errorpara,LoginImage,UserInputContainer,LoginHeading,LoginFormContainer,LoginInputContainer,LoginLabelElement,LoginInputElement,LoginButton } from '../Login/styledComponents'
const Register=(props)=>{
    const [username,setusername]=useState('')
    const [password,setPassword]=useState('')
    const [conformPassword,setConformPassword]=useState('')
    const [showError,setError]=useState(false)
    const [registerError,setRegisterError]=useState(false)
    const [registerErrorMsg,setRegisterErrorMsg]=useState('')
    const [usernamechange,setonChangeUsername]=useState(false)
    const [passwordchange,setonChangePassword]=useState(false)
    const [namechange,setNamechange]=useState(false)
    const [conformPasswordchange,setConformPasswordchange]=useState(false)
    const [name,setName]=useState('')
    const [isLoading,setLoading]=useState(false)
    const navigate=useNavigate()

    const onChangeName=(event)=>{
        setName(event.target.value)
        setonChangeUsername(false)
        setonChangePassword(false)
        setConformPasswordchange(false)
        setNamechange(true)
    }

    const onUsernameChange=(event)=>{
        setusername(event.target.value)
        setonChangeUsername(true)
        setonChangePassword(false)
        setConformPasswordchange(false)
        setNamechange(false)
    }

    const onPasswordChange=event=>{
        setPassword(event.target.value)
        setonChangeUsername(false)
        setonChangePassword(true)
        setNamechange(false)
        setConformPasswordchange(false)
    }

    const onChangeConformPassword=event=>{
        setConformPassword(event.target.value)
        setConformPasswordchange(true)
        setonChangeUsername(false)
        setonChangePassword(false)
        setNamechange(false)
    }


    const onRegisterClick=(event)=>{
        event.preventDefault()
        if(isLoading ===false){
            if(password!==conformPassword){
                return setError(true)
            }else{
                setLoading(true)
                postingUserDetails()
            }
        }
    }   

    const postingUserDetails=async ()=>{
        const userDetails={
            username,name,password
        }
        const options={
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(userDetails)
        }

        const response= await fetch('http://localhost:3000/api/register',options)
        const data=await response.json() 
        console.log(response.ok)
        if(response.ok){
            setRegisterError(true)
            setRegisterErrorMsg(data.error)
            setTimeout(()=>{
                navigate('/login')
            },500)
        }else{
            setLoading(false)
            setRegisterError(true)
            setRegisterErrorMsg(data.error)
        }

    }
    const loadingApi=()=>(
        <TailSpin  color="#dae0eb" height="16" width="16" />
    )

    return(
        <LoginMainpage>
            <LoginImage alt="login-image" src="https://tse1.mm.bing.net/th?id=OIP.vlG3sSKcA4qvJIeaO58Y5AAAAA&pid=Api&P=0&h=180"/>
            <UserInputContainer>
                <LoginHeading>User Registration</LoginHeading>
                <LoginFormContainer onSubmit={onRegisterClick}>
                    <LoginInputContainer>
                        <LoginLabelElement>USERNAME</LoginLabelElement>
                        <LoginInputElement onChange={onUsernameChange} isactive={usernamechange} value={username} type="text" placeholder="Enter Username/Email id"/>
                    </LoginInputContainer>
                    <LoginInputContainer>
                        <LoginLabelElement>NAME</LoginLabelElement>
                        <LoginInputElement onChange={onChangeName} isactive={namechange} value={name} type="text" placeholder="Enter Your Name"/>
                    </LoginInputContainer>
                    <LoginInputContainer>
                        <LoginLabelElement>PASSWORD</LoginLabelElement>
                        <LoginInputElement onChange={onPasswordChange} isactive={passwordchange} value={password} type="password" placeholder="Enter Password"/>
                    </LoginInputContainer>
                    <LoginInputContainer>
                        <LoginLabelElement>CONFORM PASSWORD</LoginLabelElement>
                        <LoginInputElement onChange={onChangeConformPassword} isactive={conformPasswordchange} value={conformPassword} type="password" placeholder="Enter Conform Password"/>
                    </LoginInputContainer>
                    {showError && <Errorpara>password did not matched</Errorpara>}
                    <LoginButton loading={isLoading}>{isLoading ? loadingApi():"Register"}</LoginButton>
                    {registerError && <RegistrationStatus>{registerErrorMsg}</RegistrationStatus>}
                </LoginFormContainer>
            </UserInputContainer>
        </LoginMainpage>
    )
}

export default Register