// @ts-ignore
import {
  Address,
  createWalletClient,
  custom,
  WalletClient,
  WalletClientConfig,
} from "viem";
import { testnet } from "./chains";
import { toAccount } from "viem/accounts";
let client: any = null;

const getClient = (
  provider: any,
  name: string = "window.ethereum",
  address?: string
): WalletClient | null => {
  if (!provider && !client) {
    console.warn("Provider is required to create a client.");
    return null;
  }
  if (
    !client ||
    (client.transport.name !== name && provider) ||
    (address !== client.account?.address && provider)
  ) {
    const obj = {
      chain: testnet,
      transport: custom(provider, {
        name: name,
      }),
    } as WalletClientConfig;
    if (address) {
      obj.account = toAccount(address as Address);
    }
    client = createWalletClient(obj);
  }
  return client;
};
export { getClient };
