import { FaArrowRight } from "react-icons/fa";
import { CardConatainer,CardButton,CardImage,CardTextContainer,TextHeading,Textpara } from "./styledComponents"
const HomeCards=props=>{
    const {cardDetails}=props
    const{id,imageUrl,name,title,description}=cardDetails
    return(
        <CardConatainer>
            <CardImage alt="Cricket" src={imageUrl}/>
            <CardTextContainer>
                <TextHeading>{title}</TextHeading>
                <Textpara>{description}</Textpara>
                <CardButton>Start <span><FaArrowRight color="#ffffff"/></span> </CardButton>
            </CardTextContainer>
        </CardConatainer>
    )
}

export default HomeCards