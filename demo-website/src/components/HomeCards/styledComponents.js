import style from 'styled-components'

export const CardConatainer=style.div`
    display:flex;
    align-items:center;
    min-height:210px;
    width:440px;
    border-radius:10px;
    box-shadow:1px 1px 1px 1px #ffffff;
    background-image:url("https://img.freepik.com/free-vector/white-abstract-background-design_23-2148825582.jpg?w=900&t=st=1712921018~exp=1712921618~hmac=37bb6702bbbcf903d77d2a8d1bd68378e162f44ed70852ed999ab0fb1ceaba23");
    background-size:cover;
    margin-right:15px;
    margin-bottom:15px;
    border-box:box-sizing;
    flex-grow:1;
    @media(min-width:578px){
        height:210px;
    }
`
export const CardImage=style.img`
    height:100%;
    width:40%;
    border-top-left-radius:7px;
    border-bottom-left-radius:7px;
`
export const CardTextContainer=style.div`
    padding:10px 10px 10px 10px;
    display:flex;
    flex-direction:column;
    justify-content:flex-start;
    box-sizing:border-box;
    overflow:auto;
`
export const TextHeading=style.h1`
    color:#174861;
    font-size:24px;
    font-weight:500;
    margin-bottom:5px;
`
export const Textpara=style.p`
    color:#697f8a;
    font-size:14px;
    margin-bottom:15px;
`
export const CardButton=style.button`
    color:#ffffff;
    font-size:14px;
    padding:7px;
    outline:none;
    border:none;
    width:70px;
    border-radius:5px;
    background-color:#185370;
    cursor:pointer;
    display:flex;
    justify-content:space-between;
    align-items:center;
    align-self:flex-end;
    margin-right:15px;
`