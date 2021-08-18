import styled from "styled-components";

const AlertColor = {
    error: "#EB526C",
    success: "#21D33D",
    default: "white"
}

const Alert = styled.p`
    color: ${props => AlertColor[props.type]};
    font-weight: bold;
    font-size: 18px;
`;

export default Alert