import styled from "styled-components"

const Input = styled.input`
    width: 100%;
    background: transparent;
    border: none;
    color: white;
    border: 1px solid #9298AB;
    border-radius: 8px;
    padding: 10px 12px;
    font-size: 16px;
    margin: auto;
    -moz-appearance: textfield;

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
        appearance: none;
        -webkit-appearance: none;
    }

    &:focus {
        outline: none;
    }
`;

export default Input