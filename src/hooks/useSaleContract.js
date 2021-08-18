import { useSelector } from "react-redux";
import Contract from "web3-eth-contract"
import { selectChainName } from "../redux/chainName";
import saleV2 from "../constants/abis/saleV2.abi.json"
import { CHAIN_CONFIG } from "../constants";
import { useEffect, useState } from "react";

function useSaleContract(library) {
    const chainName = useSelector(selectChainName)
    const [contract, setcontract] = useState(null);


    useEffect(() => {
        if (library) {
            Contract.setProvider(library.provider);
            setcontract(new Contract(saleV2, CHAIN_CONFIG[chainName].SALE_CONTRACT))
        }
    }, [chainName, library]);

    return contract
}

export default useSaleContract