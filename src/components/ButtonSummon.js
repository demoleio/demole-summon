import styled from "styled-components";
import SummonBtn from "../assests/img/summon-btn.png"

const ButtonSummon = styled.button`
    background-image: url(${SummonBtn});
    width: 336px;
    height: 136px;
    background-color: transparent;
    margin: auto;
    margin-top: 11px;

    &:before {
        content: "SUMMON";
        font-size: 24px;
        font-weight: bold;
        color: white;
        line-height: 32px;
        position: relative;
        top: 2px;
    }

    &:disabled {
        opacity: 0.1;
    }
`;

export default ButtonSummon