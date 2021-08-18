import styled from "styled-components";
import SettingIcon from '../assests/img/settings.svg'
import removePartOfString, { formatCurrency } from "../utils";
import useAvatar from "../hooks/useAvatar";
import { useWeb3React } from "@web3-react/core";


const Wrapper = styled.div`
    background: #1A1E30;
    border: 1px solid #292F49;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 16px;
    padding: 24px;
    position: absolute;
    top: 60px;
    right: 0px;
    width: 344px;

    
    & > p {
        font-weight: 600;
        font-size: 16px;
        margin-bottom: 16px;
    }
   
`;

const Head = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 16px;

    canvas {
        height: 42px;
        width: 42px;
        border-radius: 50%;
    }

    div {
        margin: 0 15px;

        p:first-child {
            font-weight: bold;
            font-size: 18px;
        }

        p:last-child {
            font-weight: 600;
            font-size: 12px;
            color: #9298AB;

            span {
                font-size: 18px;
            }
        }
    }
`

const Menu = styled.ul`
    border-top: 1px solid #292F49;

    li {
        font-weight: 600;
        font-size: 16px;
        margin-top: 16px;
        cursor: pointer;
    }
`

export default function WalletInfoPopover(props) {
    const {account} = useWeb3React()
    const {balance} = props

    useAvatar(account)

    return (
        <Wrapper>
            <Head>
                <canvas className="blockie"></canvas>
                <div>
                    <p>{removePartOfString(account, 10, 37)}</p>
                    <p>Balance: <span>{formatCurrency(balance)} BNB</span></p>
                </div>
                <img src={SettingIcon} alt="photos"></img>
            </Head>

            <p>You are qualified to summon a monster</p>

            <Menu>
                <li><a href="/">My monster</a></li>
                <li><a href="/">My egg</a></li>
                <li onClick={props.onDisconect}>Disconnect</li>
            </Menu>
        </Wrapper>
    )
}
