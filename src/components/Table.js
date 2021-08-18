import styled from "styled-components";

const Table = styled.div`
    border-radius: 16px;
    display: block;
    background-color: #2B2F40;
    overflow: auto;
    .row-even {
        background: linear-gradient(0deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), #8894B8;
    }

    .table-title {
        display: flex;
        padding: 22px 31px;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        background-color: #0f132359;

        & > div {
            display: flex;
            align-items: center;
            flex: 1;
            & > p {
                font-size: 18px;
                margin-right: 6px;
            }
        }
    }

    .table-item {
        max-height: 285px;
        overflow: auto;

        &::-webkit-scrollbar {
            width: 8px;
            background: transparent;
        }

        &::-webkit-scrollbar-thumb {
            border-radius: 4px;
            background-color: #9298AB;
            -webkit-transition: all 0.2s;
            transition: all 0.2s;
        }
    }

    .table-row {
        width: 100%;
        display: flex;
        padding: 15px 31px;
        justify-content: space-between;
        align-items: center;
        font-weight: bold;
        font-size: 18px;

        & > a,
        & > p {
            flex: 1;
        }

        & > a {
            color: #00CEFF;
        }
    }
`

export default Table