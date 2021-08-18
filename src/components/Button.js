import styled from "styled-components"

const Button = styled.button`
    background: #00CEFF;
    border: none;
    color: white;
    font-size: 16px;
    padding: 8px 16px;
    border-radius: 8px;

    &:disabled {
        opacity: 0.7;
    }
`;

export default Button