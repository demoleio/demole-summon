import { useWeb3React } from "@web3-react/core";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { fromWei, toWei } from "web3-utils";
import dragon from '../assests/img/dragon2.png'
import openEgg from '../assests/video/open-egg.mp4'
import { useBalance } from "../hooks/useBalance";
import useSaleContract from "../hooks/useSaleContract";
import { selectChainName } from "../redux/chainName";
import ButtonSummon from "./ButtonSummon";
import Alert from "./Alert";
import useNFTContract from "../hooks/useNFTContract";
import useUserState from "../hooks/useUserState";
import WrongNetworkModal from "./WrongNetworkModal";
import { CHAIN_CONFIG } from "../constants";

const Wrapper = styled.section`
    border-radius: 20px;
    background-color: transparent;
    text-align: center;
`;

const Monster = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 593px;
    position: relative;
    background-image: radial-gradient(46.9% 46.9% at 49.88% 50.12%, rgba(255, 255, 255, 0.24) 0%, rgba(255, 255, 255, 0.28) 0.01%, rgba(255, 255, 255, 0) 107.22%);;

    & > .dragon {
        margin-left: 70px;
        margin-top: 30px;
        position: absolute;
        width: 400px;
        right: 28px;
        top: 142px;
        opacity: 0;
        transition: all .5s ease;
        -webkit-transition: all .5s ease;
        -moz-transition: all .5s ease;
    }

    @media only screen and (max-width: 768px) {
        height: 100%;
        margin-top: 50px;
        overflow: hidden;

        & > video {
            width: 100%;
        }

        & > .dragon {
            right: -10px;
            top: 60px;
            width: 80%;
        }
    }
`

export default function Summon(props) {
    const { isOpen } = props
    const { account, library } = useWeb3React()
    const balance = useBalance(account, library)
    const contract = useSaleContract(library)
    const nftContract = useNFTContract(library)
    const chainName = useSelector(selectChainName)
    const [error, seterror] = useState(false);
    const [loading, setloading] = useState(false);
    const [success, setsuccess] = useState(false);
    const userState = useUserState(chainName, account)
    const video = useRef(null)
    const character = useRef(null)

    useEffect(() => {
        if(userState.state === "NOT_CONNECTED") {
            seterror("Please connect wallet")
        }

        if(userState.state === "NOT_REGISTERED") {
            setsuccess(false)
            seterror("You have not registered to join Summon.\n\n Please register via Telegram Bot @demole_bot")
            setloading(true)
            video.current.style.display = "block"
            character.current.style.opacity = 0
        }

        if(userState.state === "REGISTERED") {
            setsuccess(false)
            seterror(false)
            setloading(false)
            video.current.style.display = "block"
            character.current.style.opacity = 0
        }

        if(userState.state === "BOUGHT") {
            setsuccess(`Congratulations! You have received tokenId #${userState.data}`)
            seterror(false)
            setloading(true)
            video.current.style.display = "none"
            character.current.style.opacity = 1
        }

    }, [userState])

    function startAnimation() {
        character.current.style.opacity = 0
        video.current.play()
        character.current.style["z-index"] = 1
        setTimeout(() => {
            character.current.style.opacity = 1
        }, 1200)
    }

    async function summon() {
        // reset states
        seterror(false)
        setloading(false)
        // check balance
        const BNBRequireInWei = await contract.methods.getBNBPrice().call()
        const BNBRequire = parseFloat(fromWei(BNBRequireInWei))
        if (balance < BNBRequire) {
            return seterror("Insufficient balance")
        }
        setloading("Wating for confirmation...")
        const proof = userState.data
        contract.methods.order(account.toLowerCase(), proof).send({
            from: account,
            value: toWei((BNBRequire + 0.001).toString())
        }).then(result => {
            setloading("Retrieving tokenId...")
            let interval = setInterval( async () => {
                const tokensOfOwner = await nftContract.methods.tokensOfOwner(account).call()
                if(tokensOfOwner.length > 0) {
                    clearInterval(interval)
                    setloading(false)
                    setsuccess(`Congratulations! You have received tokenId #${tokensOfOwner[0]}`)
                    startAnimation()
                }
            }, 1000)
        }).catch(error => {
            seterror(error.message ? error.message : error)
            setloading(false)
        })
    }

    return (
        <Wrapper>
            <Monster>
                <video preload="true" src={openEgg} playsInline={true} ref={video}></video>
                <img ref={character} className="dragon" src={dragon} alt="character"></img>
            </Monster>
            <ButtonSummon onClick={summon} disabled={!isOpen || loading || !account} />
            {error && <Alert type="error">{error}</Alert>}
            {(loading && !error) && <Alert type="default">{loading}</Alert>}
            {success && <Alert type="success">{success}</Alert>}
        </Wrapper>
    )
}
