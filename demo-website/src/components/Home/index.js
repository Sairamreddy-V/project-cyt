import {useState,useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import cookies from 'js-cookie'
import Header from '../Header'
import HomeCards from '../HomeCards'
import {UlContainer,HomeContainer} from './styledComponents'
const cradsDetailsList=[
    {   
        id:1,
        imageUrl:"https://img.freepik.com/free-vector/hand-drawn-ipl-cricket-illustration_23-2149213601.jpg?w=900&t=st=1712917486~exp=1712918086~hmac=7b6c546d3d5250fab4f13fd6f1322e79e2fe6a618c2be0318604a759cd419344",
        name:"Cricket",
        title:"Assemble Your Ultimate Cricket Team!",
        description:"Begin your journey to cricket mastery by creating your team with a click on the 'Start' button",
    },
    {   
        id:2,
        imageUrl:"https://img.freepik.com/free-vector/soccer-player-concept-illustration_114360-23035.jpg?w=740&t=st=1712932374~exp=1712932974~hmac=610956d25d12b75706c5dcce2c3fb7dcc84d2ac486eec89ff6eef5ad483bc8c6",
        name:"Football",
        title:"Raid, Tackle, Win: Build Your Kabaddi Dream Team!",
        description:"Build your championship football team by clicking 'Start' and picking your top players.",
    },
    {   
        id:3,
        imageUrl:"https://img.freepik.com/free-vector/hand-drawn-field-hockey-illustration_23-2149509133.jpg?w=740&t=st=1713355415~exp=1713356015~hmac=4495f6d518852f129e45f88923a63413a10732a006ee3c3a30bde6bafdb22a01",
        name:"Hockey",
        title:"Create Your Championship Hockey Team",
        description:"Hit the ice with your own hockey team by clicking 'Start' to assemble your lineup.",
    },
    {   
        id:4,
        imageUrl:"https://mir-s3-cdn-cf.behance.net/projects/max_808/7129af57741691.Y3JvcCw4ODEsNjg5LDI4LDIx.png",
        name:"Kabaddi",
        title:"Kick Off Your Journey with a Custom Football Team!",
        description:"Create your kabaddi team now—click 'Start' and select your champions!",
    },
       
]
const Home=()=>{
    const[user,setUser]=useState();
    
    const navigate=useNavigate()
    useEffect(()=>{
        const token=cookies.get("jwt_token")
        if(token!==undefined){
            apirequest(token)
        }
    },[])
    const apirequest=async (token)=>{
        const options={
            method:"POST",
            headers:{
                "content-Type":"application/json",
                "authorization":`Bearer ${token}`
            }
        }
        const response= await fetch("http://localhost:3000/api/profile",options)
        if(response.ok){
            const data=await response.json()
            setUser(data.user)
        }
        else{
            setUser("Failed")
        }
    }
    return(
        <HomeContainer>
            <Header userName={user}/>
            <UlContainer>
                {cradsDetailsList.map(eachOne=>(<HomeCards cardDetails={eachOne} key={eachOne.id}/>))}
            </UlContainer>
        </HomeContainer>
    )
}

export default Home
