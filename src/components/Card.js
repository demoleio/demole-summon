
import { Fragment } from "react";
import styled from "styled-components"

const CardWrapper = styled.div`
    background: #1A1E30;
    border: 1px solid #292F49;
    border-radius: 12px;
    padding: 24px;
    margin-bottom: 60px;
`;

const CardHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
    & > p {
        font-size: 36px;
        font-family: "EvilEmpire";
    }

    & > span {
        font-size: 18px;
        color: #00CEFF;
    }
  
`;

function Card(props) {
    return (
        <Fragment>
            {props.header && <CardHeader>
                <p>{props.header}</p>
                {props.headerRight && <span>{props.headerRight}</span>}
            </CardHeader>}
            <CardWrapper {...props}>
                {props.children}
            </CardWrapper>
        </Fragment>

    )
}

export default Card