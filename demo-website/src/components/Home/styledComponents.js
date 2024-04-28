import style from 'styled-components'

export const HomeContainer=style.div`
    min-height:100vh;
    padding-bottom:100px;
    display:flex;
    flex-direction:column;
    box-sizing:border-box;
    background-color:#000000;
`

export const HomeNav=style.nav` 
    padding:10px;
    height:8vh;
    background-color:#11161c;
    display:flex;
    justify-content:space-between;
    align-items:center;
`
export const NavLogoName=style.h1`
    color:#b58a3a;
    font-weight:bold;
    font-size:32px;
`
export const NavButton=style.button`
    color:${props=>(props.isLoginButton==="LOGIN" ? "#0b8f04":"#b81a24")};
    border: 2px solid ${props=>(props.isLoginButton==="LOGIN" ? "#0b8f04":"#b81a24")};
    background-color:transparent;
    outlet:none;
    cursor:pointer;
    font-size:14px;
    padding:5px;
    border-radius:4px;
    font-weight:bold;
`
export const UlContainer=style.ul`
    list-style-type:none;
    display:flex;
    background-color:#000000;
    min-height:92vh;
    margin-top:0px;
    padding-top:20px;
    flex-wrap:wrap;
    align-content: flex-start;
`
export const LogoutPopupContainer=style.div`
    background-color:transparent;
    display:flex;
    justify-content:center;
    align-items:center;
`
export const PopupCard=style.div`
    border-radius:10px;
    padding:10px;
    display:flex;
    width:180px;
    height:90px;
    flex-direction:column;
    background-color:#11161c;
`
export const PopupContent=style.p`
    color:#ffffff;
    font-size:15px;
    font-weight:bold;
    margin-bottom:18px;
    align-self:center;
`
export const ButtonContainer=style.div`
    display:flex;
    justify-content:space-around;
`
export const CancelButton=style.button`
    border:2px solid #8c0d0d;
    color:#8c0d0d;
    font-size:12px;
    background-color:transparent;
    font-weight:bold;
    padding:5px;
    border-radius:7px;
    cursor:pointer;
    outline:none;
`
export const ConfirmButton=style.button`
    border:none;
    color:#11161c;
    font-size:12px;
    background-color:#ffffff;
    font-weight:bold;
    padding:5px;
    border-radius:7px;
    cursor:pointer;
    outline:none;
`