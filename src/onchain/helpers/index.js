import { ethers } from 'ethers'
import { toNumber } from 'lodash'
import * as moment from 'moment'
export const fetchCoreDetails = async (p) => {
    if (p && Object.keys(p).includes('POLICY')) {
        return Object.values(p).flatMap((i) => {
            return {
                ...i?.content?.fields?.value?.fields,
                objectId: i?.objectId,
                name: i?.name,
                parent_id: i?.parent_id,
                type_core: i?.type_core,
                rule_name: i?.content?.fields?.name,
            }
        })
    }

    if (p && Object.keys(p).includes('SERVICE')) {
        return Object.values(p).flatMap((i) => {
            return {
                ...i?.content?.fields?.info?.fields,
                objectId: i?.objectId,
                name: i?.name,
                parent_id: i?.parent_id,
                type_core: i?.type_core,
                rule_name: i?.name?.value,
            }
        })
    }
    return []
}


export const formatEther = (number, dec) => {
    if (!number) return;
    try {
        return toNumber(ethers.utils.formatUnits(number, dec))
    } catch (error) {
        console.log('error__formatEther', error)
    }
}

export const transformStakingData = (stakingData) => {
    return stakingData.map((staking) => ({
        id: staking.id,
        name: staking.name || 'Loading',
        time: staking.days || 0,
        expectedAPY: staking.apr || 0,
        subscriptionDate: moment().format('LLL'),
        firstRewardPayment: '',
        stakingExpirationDate: moment().add(toNumber(staking.days), 'days').format('LLL'),
        unstakeFee: staking.unstake_soon_fee || 0,
        className: 'default',
        minStakeAmount: staking.min_stake_amount || 0,
        image: staking.image || '',
        description: staking.description || '',
        currentTokenStakingAddress: staking?.current_token_staking_address || '',
        currentTokenStakingSymbol: staking?.current_token_staking_symbol || ''
    }));
}
