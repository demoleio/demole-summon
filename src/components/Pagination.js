import styled from "styled-components";
import ArrowLeft from '../assests/img/arrow-left.png'
import ArrowRight from '../assests/img/arrow-right.png'

const Wrapper = styled.section`
    height: 32px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    & > img {
        cursor: pointer;
    }

    & > p{
        cursor: pointer;
        width: 32px;
        height: 32px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #6E6D7A;
        font-size: 16px;
        font-weight: 600;
   
    }

    & > p:hover {
        background-color: #F3F3F4;
        border-radius: 50%;
    }

    & > .selected {
        background-color: #0BB7EE;
        border-radius: 50%;
        color: white;
    }
`;

export default function Pagination() {
    return (
        <Wrapper className="Pagination">
            <img src={ArrowLeft} alt="photos"></img>
            <p className="selected">1</p>
            <p>2</p>
            <p>3</p>
            <p>4</p>
            <p>5</p>
            <p>...</p>
            <p>150</p>
            <img src={ArrowRight} alt="photos"></img>
        </Wrapper>
    )
}
