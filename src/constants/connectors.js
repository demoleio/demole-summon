import { InjectedConnector } from '@web3-react/injected-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { NetworkConnector } from '@web3-react/network-connector'
import { CHAIN_CONFIG } from '.'

let supportedChainIds = []
let rpc = {}

Object.keys(CHAIN_CONFIG).map(chain => {
    supportedChainIds.push(CHAIN_CONFIG[chain].CHAIN_ID)
    rpc[CHAIN_CONFIG[chain].CHAIN_ID] = CHAIN_CONFIG[chain].RPC_URL
    return true
})

console.log(supportedChainIds);

const connectors = {
    network: new NetworkConnector({
        urls: rpc,
        defaultChainId: 56
    }),
    injected : new InjectedConnector({ supportedChainIds }),
    walletconnect : new WalletConnectConnector({
        rpc,
        qrcode: true
    })
}

export default connectors