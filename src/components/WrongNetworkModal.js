import Modal from "./Modal";
import styled from "styled-components";
import Warning from '../assests/img/warning.svg'
import { useSelector } from "react-redux";
import { selectChainName } from "../redux/chainName";

const Wrapper = styled(Modal)`
    .wrong-network {
        background-color: #161824;
        width: 563px;
        height: auto;
        margin: 30vh auto 0px;
        position: relative;
        text-align: center;
        border-radius: 16px;
        padding: 40px;

        & > p {
            margin-top: 27px;
            font-weight: bold;
            font-size: 36px;
        }

        & > span {
            font-size: 16px;
            color: #AFB9CF;
            display: block;
            margin-top: 20px;
            padding-left: 18px;
            padding-right: 18px;
        }
    }
`;

export default function WrongNetworkModal(props) {
    const chainName = useSelector(selectChainName)

    return (
        <Wrapper>
            <div className="wrapper">
                <div className="dark-range" onClick={props.onClose}></div>
                <div className="wrong-network">
                    <img src={Warning} alt="photos" width="100"></img>
                    <p>Wrong Network Connected</p>
                    <span>Demole is currently on <b>{chainName.toUpperCase()}</b> mode but your wallet is connected to another network. Please change the network on your wallet settings.</span>
                </div>
            </div>
        </Wrapper>
    )
}
