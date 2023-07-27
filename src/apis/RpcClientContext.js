import React from 'react';

export const RpcClientContext = React.createContext(undefined);

export function useRpcClient() {
    const rpcClient = React.useContext(RpcClientContext);
    if (!rpcClient) {
        throw new Error('useRpcClient must be within RpcClientContext');
    }
    return rpcClient;
}
