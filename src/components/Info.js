import styled from "styled-components"
import { ProgressBar } from "react-bootstrap"
import Countdown from "./Countdown";
import Table from "./Table"
import useSaleContract from "../hooks/useSaleContract";
import { useCallback, useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import removePartOfString, { formatCurrency, timeDifference } from "../utils";
import { fromWei } from "web3-utils";
import { CHAIN_CONFIG } from "../constants";
import { selectChainName } from "../redux/chainName";
import { useSelector } from "react-redux";
import useSaleHistories from "../hooks/useSaleHistories";

const Wrapper = styled.div`
    margin-top: 80px;
`;

const TotalSale = styled.div`
    background: #1A1E30;
    border: 1px solid #292F49;
    box-sizing: border-box;
    box-shadow: 0px 0px 2px 8px rgba(41, 47, 73, 0.5);
    border-radius: 8px;
    text-align: center;
    width: 90%;

    p {
        font-family: "EvilEmpire";
        font-size: 84px;
    }

    @media only screen and (max-width: 768px) {
        width: 100%;

        & > p{
            font-size: 60px;
        }
    }
`

const ProgressBarStyled = styled(ProgressBar)`
    width: 74%;
    height: 12px;
    margin: auto;
    background-color: #9298AB;
    border-radius: 8px;
    overflow: hidden;
    margin-bottom: 40px;
    margin-top: 21px;

    .progress-bar-bar {
        background-color: #FFB337;
        height: 12px;
    }
`;

const Title = styled.p`
    font-weight: bold;
    font-size: 24px;
    margin-top: 42px;
    margin-bottom: 12px;

    @media only screen and (max-width: 576px) {
        text-align: center;
    }
`;

export default function Info(props) {
    const { isOpen, setisOpen } = props
    const { library } = useWeb3React()
    const contract = useSaleContract(library)
    const [deadline, setdeadline] = useState(0);
    const [totalSold, settotalSold] = useState(0);
    const [totalSale, settotalSale] = useState(1000);
    const chainName = useSelector(selectChainName)
    const saleHistories = useSaleHistories(chainName)

    const getSaleInfo = useCallback(async () => {
        if (!contract) return
        const promiseArr = [
            contract.methods.totalSale().call(),
            contract.methods.totalSold().call(),
        ]

        const result = await Promise.all(promiseArr)
        // update totalSold and totalSale
        if (result[0] !== "0") settotalSale(parseInt(result[0]))
        settotalSold(parseInt(result[1]))
    }, [contract])

    const getTimeInfo = useCallback(async () => {
        if (!contract) return

        const promiseArr = [
            contract.methods.openTime().call(),
            contract.methods.closeTime().call()
        ]

        const result = await Promise.all(promiseArr)
        // check time
        const openTime = (parseInt(result[0]) + 10) * 1000 // add 10 seconds
        const closeTime = parseInt(result[1]) * 1000
        const currentTime = new Date().getTime()

        if (currentTime >= openTime) {
            setisOpen(true)
            setdeadline(closeTime)
        } else {
            setisOpen(false)
            setdeadline(openTime)
        }
    }, [contract, setisOpen])

    useEffect(() => {
        getSaleInfo()
    }, [getSaleInfo]);

    useEffect(() => {
        getTimeInfo()
    }, [contract, getTimeInfo]);

    function onCountdownEnd() {
        getTimeInfo()
    }

    const saleHistoriesParsed = saleHistories.map(value => {
        return {
            address: value.user,
            buyer: removePartOfString(value.user, 10, 37),
            price: formatCurrency(parseFloat(fromWei(value.value))),
            time: timeDifference(value.time * 1000)
        }
    })

    return (
        <Wrapper>
            <TotalSale>
                <p>{totalSale - totalSold} Monster</p>
                <ProgressBarStyled now={totalSold / totalSale * 100} bsPrefix="progress-bar"></ProgressBarStyled>
            </TotalSale>
            <Title>{isOpen ? "Batch ends in 🔥" : "Batch start in 🔥"}</Title>
            <Countdown deadline={deadline} onEnd={onCountdownEnd}></Countdown>
            <Title>Sale History</Title>
            <Table>
                <div style={{minWidth: 600}}>
                    <div className="table-title">
                        <div style={{ minWidth: 220 }}>
                            <p>Buyer</p>
                        </div>
                        <div>
                            <p>Price {CHAIN_CONFIG[chainName].COIN_SYMBOL}</p>
                        </div>
                        <div>
                            <p>Time</p>
                        </div>
                    </div>
                    <div className="table-item">
                        {saleHistoriesParsed.map((value, index) => {
                            return (
                                <div key={index} className={`${index % 2 === 0 ? "row-even" : ""} table-row`}>
                                    <a style={{ minWidth: 220 }} href={`${CHAIN_CONFIG[chainName].EXPLORER_URL}/address/${value.address}`} target="_blank" rel="noreferrer">{value.buyer}</a>
                                    <p>{ formatCurrency( value.price, 2)} {CHAIN_CONFIG[chainName].COIN_SYMBOL}</p>
                                    <p>{value.time}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </Table>
        </Wrapper>
    )
}