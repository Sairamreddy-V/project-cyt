import style from 'styled-components'

export const LoginMainpage=style.div`
    background-color:#000000;
    height:100vh;
    @media(min-width:768px){
        display:flex;
        justify-content:space-around;
        align-items:center;
    }
    @media(max-width:767px){
        display:flex;
        flex-direction:column;
        align-items:center;
        justify-content:center;
    }
    box-sizing:border-box;
`
export const LoginImage=style.img`
    @media (min-width:768px){
        height:400px;
        width:400px;
        margin-right:22px;
    }
    @media (max-width:767px){
        height:150px;
        width:150px;
        margin-bottom:20px;
    }
    border-radius:8px;
`
export const UserInputContainer=style.div`
    height:400px;
    display:flex;
    flex-direction:column;
    background-color:#333635;
    padding:12px;
    border-radius:8px;
    box-sizing:border-box;
`
export const LoginHeading=style.h1`
    color:#ffffff;
    font-size:26px;
    align-self:center;
    font-weight:bold;
`
export const LoginFormContainer=style.form`
    display:flex;
    flex-direction:column;
`
export const LoginInputContainer=style.div`
    width:250px;
    display:flex;
    flex-direction:column;
    margin-bottom:10px;
    box-sizing:border-box;
`

export const LoginLabelElement=style.label`
    color:#9fa0a1;
    font-size:12px;
    margin-bottom:7px;
    font-weight:bold;
`
export const LoginInputElement=style.input`
    width:100%;
    outline:none;
    border-radius:5px;
    padding:7px;
    font-size:14px;
    background-color:#d0d4d6;
    border:none;
    border-bottom:${props=>(props.isactive=== true && " 2px solid red")};
    color:#000000;
    box-sizing:border-box;
`
export const LoginButton=style.button`
    color:#ffffff;
    background-color:${props=>(props.buttonType ? "#242659":"#945f31")};
    border:none;
    border-radius:7px;
    padding:7px;
    font-size:14px;
    width:110px;
    font-weight:bold;
    align-self:center;
    cursor:pointer;
`