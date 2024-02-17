"use client"

import { createWeb3Modal, defaultConfig } from '@web3modal/ethers5/react'

// 1. Get projectId
const projectId = 'YOUR_PROJECT_ID'

// 2. Set chains
const mainnet = {
  chainId: 168587773,
  name: 'Blast Sepolia',
  currency: 'ETH',
  explorerUrl: 'https://testnet.blastscan.io',
  rpcUrl: 'https://sepolia.blast.io'
}

// 3. Create modal
const metadata = {
  name: 'My Website',
  description: 'My Website description',
  url: 'https://mywebsite.com',
  icons: ['https://www.figma.com/file/qBVgYu4I7tyXnjCtKxnfxh/CHESS?type=design&node-id=15-4&mode=design&t=ddmPeKDK7RjMqo57-4']
}

createWeb3Modal({
  ethersConfig: defaultConfig({ metadata }),
  chains: [mainnet],
  defaultChain: mainnet,
  chainImages:{
    168587773:'https://assets-global.website-files.com/65a6baa1a3f8ed336f415cb4/65a6c39bae6093c6653dd016_Logo%20Yellow%20on%20Black%20Background%202x-p-500.png'
  },
  projectId,
})

export function Web3ModalProvider({ children }) {
  return children;
}   