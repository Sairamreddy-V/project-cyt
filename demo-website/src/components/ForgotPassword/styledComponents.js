import style from 'styled-components'

export const ForgotMainPage=style.div`
    background-color:#000000;
    display:flex;
    justify-content:center;
    align-items:center;
    min-height:100vh;
`
export const ForgotCardPage=style.form`
    background-color:#9fb6c4;
    padding:10px;
    display:flex;
    flex-direction:column;
    box-sizing:border-box;
    min-width:400px;
    min-height:300px;
    border-radius:10px;
    align-items:center;
`
export const ForgotInput=style.input`
    outline:none;
    border:none;
    border-left:4px solid #284b61;
    width:70%;
    padding:8px;
    color:#000000;
    margin-bottom:10px;
    border-radius:6px;

`
export const ForgotRouteButton=style.button`
    background-color:#0d90e0;
    color:#ffffff;
    font-weight:bold;
    cursor:pointer;
    border:none;
    outline:none;
    font-size:14px;
    padding:5px;
    width:80px;
    height:30px;
    border-radius:5px;
    align-self:center;
    display:flex;
    justify-content:center;
    alin-items:center;
`
export const ForgotRouteHeading=style.h1` 
    color:#102736;
    font-size:32px;
    font-weight:bold;
    margin:10px,0px,20px,0px;
`
export const ErrorMsgPara=style.p`
    color:#e60909;
    font-weight:bold;
    font-size:16px;
`
export const SuccessHeading=style.h1`
    color:#05a129;
    font-size:28px;
    margin-top:10px;
    font-weight:bold;
`
export const LabelElement=style.label`
    font-size:12px;
    margin-bottom:5px;
    color:#284b61;
    font-weight:bold;
    align-self:flex-start;
`