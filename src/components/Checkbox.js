import { FormCheck } from "react-bootstrap"
import styled from "styled-components";

const Checkbox = styled(FormCheck)`
    & > .form-check-input {
        width: 18px;
        height: 18px;
        background-color: transparent;
        border: 2px solid #9298AB;
    }

    & > .form-check-input:checked {
        background-color: #00CEFF;
        background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3e%3cpath fill='none' stroke='%23000' stroke-linecap='round' stroke-linejoin='round' stroke-width='3' d='M6 10l3 3l6-6'/%3e%3c/svg%3e");
        border: none;
    }

    & > label {
        font-size: 18px;
        margin-left: 5px;
    }

    & > .form-check-input[type=checkbox] {
        border-radius: 3px;
    }
`;

export default Checkbox