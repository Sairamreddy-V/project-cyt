import { useState,useEffect } from 'react'
import{useNavigate} from 'react-router-dom'
import cookies from 'js-cookie'
import Popup from 'reactjs-popup'
import { HomeNav,NavButton,NavLogoName,PopupCard,PopupContent,LogoutPopupContainer,ButtonContainer,CancelButton,ConfirmButton,UserNameHeading} from './styledComponents'


const Header=(props)=>{
    const[isLoginButton,setLoginButton]=useState();
    const [isLogin,setLoginUpdate]=useState()
    const navigate=useNavigate()
    useEffect(()=>{
        const token=cookies.get("jwt_token")
        if(token===undefined){
            setLoginButton("LOGIN")
            setLoginUpdate(false)
        }else{
            setLoginButton("LOGOUT")
            setLoginUpdate(true)
        }
    },[])
    const onNavButton=event=>{
        const value=event.target.value
        if(value==="LOGOUT"){
            cookies.remove('jwt_token')
            navigate('/login')
        }else{
            navigate('/login')
        }
    }
    return(
        <HomeNav>
            <NavLogoName>CYT</NavLogoName>
            {isLogin &&<UserNameHeading>Hello {props.userName}</UserNameHeading>}
            {isLoginButton==="LOGIN" ? <NavButton onClick={onNavButton} value={isLoginButton} isLoginButton={isLoginButton}>{isLoginButton}</NavButton>:
                <Popup
                    modal
                    trigger={
                        <NavButton  isLoginButton={isLoginButton}>{isLoginButton}</NavButton>
                    }
                >
                    {close => (
                    <>
                        <LogoutPopupContainer>
                            <PopupCard>
                                <PopupContent>Are you Sure!</PopupContent>
                                <ButtonContainer>
                                    <CancelButton onClick={() => close()}>Cancel</CancelButton>
                                    <ConfirmButton value={isLoginButton} onClick={onNavButton}>Confirm</ConfirmButton>
                                </ButtonContainer>
                            </PopupCard>
                        </LogoutPopupContainer>
                    </>
                    )}
                </Popup>
            }
        </HomeNav>
    )
}

export default Header