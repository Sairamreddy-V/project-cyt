import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {TailSpin} from 'react-loader-spinner'
import { ForgotCardPage,ForgotMainPage,ForgotRouteButton,ForgotInput,ForgotRouteHeading,ErrorMsgPara,SuccessHeading
 } from './styledComponents'
 import { RxCross2 } from "react-icons/rx";
 import { IoMdCheckmarkCircle } from "react-icons/io";
import './index.css'

const ForgotPassword=()=>{
    const [username,setUsername]=useState('')
    const [password,setPassword]=useState('')
    const[conformPassword,setConformPassword]=useState("")
    const[isErrorOccured,setErrorUpdate]=useState(false)
    const [errorMsg,setErrorMsg]=useState("")
    const[isApiSuccess,setApiUpdate]=useState(false)
    const [isLoading,setLoading]=useState(false)
    const navigate=useNavigate()
    const onUsernameChange=event=>{
        setUsername(event.target.value)
    }
    const onpasswordChange=event=>{
        setPassword(event.target.value)
    }
    const onConformPassword=event=>{
        setConformPassword(event.target.value)
    }
    const onSubmitClick=(event)=>{
        event.preventDefault()
        if(password===conformPassword){
            setLoading(true)
            verifyThroughApi()
        }else{
            setErrorUpdate(true)
            setErrorMsg("Password did not Match")
        }
    }
    const verifyThroughApi= async ()=>{
        const userDetails={username,password}
        const options={
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(userDetails)
        }
        const response=await fetch("http://localhost:3000/api/forgot-password",options)
        if(response.ok){
            setApiUpdate(true)
            setTimeout(()=>{
                navigate('/login')
            },400)
        }else{
            const data=await response.json()
            const {error}=data
            setLoading(false)
            setErrorMsg(error)
            setErrorUpdate(true)
        }
    }
    const onCrossIconClick=()=>{
       navigate("/login")
    }
    const SuccessView=()=>(
        <div className="successIconContainer">
            <IoMdCheckmarkCircle  color="#05a129" size="70"/>
            <SuccessHeading>Password Set Successfully</SuccessHeading>
        </div>
    )
    const loadingApi=()=>(
        <TailSpin  color="#dae0eb" height="16" width="16"/>
    )
    return(
        <ForgotMainPage>
            {isApiSuccess ? SuccessView():
            <ForgotCardPage onSubmit={onSubmitClick}>
                <button className='cross-icon'>
                <RxCross2 onClick={onCrossIconClick} color="#000000" size="25" cursor="pointer"/>
                </button>
                <ForgotRouteHeading>Set New Password</ForgotRouteHeading>
                <ForgotInput  id="username"type="text" value={username} placeholder='Enter Username' onChange={onUsernameChange}/>
                <ForgotInput type="password" value={password} placeholder='Enter Password' onChange={onpasswordChange}/>
                <ForgotInput type="password" value={conformPassword} placeholder='Conform Password' onChange={onConformPassword}/>
                <ForgotRouteButton type='submit'>{ isLoading ? loadingApi() :"Confirm"}</ForgotRouteButton>
                {isErrorOccured && <ErrorMsgPara> {errorMsg} </ErrorMsgPara>}
            </ForgotCardPage>
            }
        </ForgotMainPage>
    )
}

export default ForgotPassword