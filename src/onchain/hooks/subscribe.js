import { SuiClient, getFullnodeUrl } from '@mysten/sui.js/client';
import { PACKAGE_BASE } from 'onchain/constants';

const client = new SuiClient({
    url: getFullnodeUrl('testnet'),
});

export const subscribe = async (setHasEvent) => {
    console.log('do roi')
    try {
        await client.subscribeEvent({
            filter: {
                MoveEventType: `${PACKAGE_BASE}::ido::Purchase`,
            },
            onMessage(event) {
                console.log('abc', event)
                setHasEvent(true);
            }
        })
    } catch (error) {
        console.log('error___Connection failed', error)
    }
}