import { getDefaultWallets } from '@rainbow-me/rainbowkit';
import { createConfig } from 'wagmi';
import { sepolia } from 'wagmi/chains';
import { http } from 'viem';

const { connectors } = getDefaultWallets({
  appName: 'Your App Name',
  projectId: '7a4bed53f4e9953a1271690c0085477b',
  chains: [sepolia],
});

export const wagmiConfig = createConfig({
  connectors,
  chains: [sepolia],
  transports: {
    [sepolia.id]: http(),
  },
});
