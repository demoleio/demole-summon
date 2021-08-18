import React, { useEffect, useRef, useState } from 'react'
import Metamask from '../assests/img/icon_metamask.png'
import Trustwallet from '../assests/img/icon_trustwallet.png'
import WalletConnect from '../assests/img/icon_walletconnect.svg'
import IconClose from '../assests/img/close_24px.png'
import Modal from "./Modal";
import styled from "styled-components";
import { useWeb3React } from '@web3-react/core'
import connectors from '../constants/connectors'

const Wrapper = styled(Modal)`
    .connect-wallet {
        overflow: hidden;
        background-color: #161824;
        width: 412px;
        height: auto;
        margin: 30vh auto 0px;
        position: relative;
        text-align: center;
        border-radius: 16px;
        padding: 20px 24px 11px 24px;
        transform-origin: center;
        .head {
            margin-bottom: 36px;
        }
    }

    @media only screen and (max-width: 576px) {
        .connect-wallet {
            width: calc(100% - 20px);
        }
    }
`;

const Info = styled.div`
    padding: 14px 25px;
    border: 1px solid #00CEFF;
    border-radius: 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
    cursor: pointer;

    & > p {
        font-weight: bold;
        font-size: 18px;
    }
`

export default function ConnectWalletModal(props) {
    const modalBodyRef = useRef(null)
    const [connecting, setconnecting] = useState(false);

    const {activate} = useWeb3React()

    useEffect(() => {
        const modalHeight = modalBodyRef.current.clientHeight
        modalBodyRef.current.style.height = "0px"
        modalBodyRef.current.style.transition = `height 0.6s ease`
        setTimeout( () => {
            modalBodyRef.current.style.height = `${modalHeight}px`
        }, 100) 
    }, []);

    function onConnect(connectorName) {
        setconnecting(connectorName)
        if(connectorName === "trustwallet" || connectorName === "metamask") {
            connectorName = "injected"
        }
        activate(connectors[connectorName])
    }

    return (
        <Wrapper>
            <div className="wrapper">
                <div className="dark-range" onClick={props.onClose}></div>
                <div className="connect-wallet" ref={modalBodyRef}>
                    <div className="head">
                        <p>Connect to a Wallet</p>
                        <img src={IconClose} onClick={props.onClose} alt="icon-close"></img>
                    </div>

                    <Info onClick={() => onConnect("metamask")}>
                        <p>{connecting === "metamask" ? "Connecting..." : "Metamask"}</p>
                        <img src={Metamask} alt="photos"></img>
                    </Info>

                    <Info onClick={() => onConnect("trustwallet")}>
                        <p>{connecting === "trustwallet" ? "Connecting..." : "Trust Wallet"}</p>
                        <img src={Trustwallet} alt="photos"></img>
                    </Info>

                    <Info onClick={() => onConnect("walletconnect")}>
                        <p>{connecting === "walletconnect" ? "Connecting..." : "WalletConnect"}</p>
                        <img src={WalletConnect} alt="photos" width="32"></img>
                    </Info>
                </div>
            </div>
        </Wrapper>
    )
}
