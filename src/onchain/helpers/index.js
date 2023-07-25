import { BigNumber, ethers } from 'ethers'
import { isNull, round, toNumber } from 'lodash'
import * as moment from 'moment'
import { fCurrencyV2 } from 'utils/util'
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
        return toNumber(ethers.utils.formatUnits(BigNumber.from(number.toString()), dec))

    } catch (error) {
        console.log('error__formatEther', error)
    }
}


const apyConvert = (apr) => {
    return (Math.pow((1 + (apr / 365)), 365) - 1) * 100
}
// ((1+(0.03/365))^365 -1)*100
export const transformStakingData = (stakingData) => {
    return stakingData.map((staking) => ({
        id: staking.id,
        key: staking.key,
        name: staking.name || 'Loading',
        time: staking.days || 0,
        expectedAPY: round(apyConvert(staking.apr / 100), 6) || 0,
        expectedAPR: staking.apr,
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

export const transformCerInfo = (cerInfo) => {
    const transformedData = cerInfo.map((cer) => {
        const stakeDateInSeconds = toNumber(cer?.stake_date) / 1000;
        const daysAtMomentInSeconds = toNumber(cer?.days_at_moment) * 86400;
        return {
            id: cer?.id,
            creationDate: moment(toNumber(cer?.stake_date)).format('LLLL'),
            status: cer?.unstake_date !== null ? false : true,
            terms: cer?.name,
            type: 'Staking',
            amount: fCurrencyV2(cer?.stake_amount),
            endTime: moment.unix(stakeDateInSeconds + daysAtMomentInSeconds).format('LLLL'),
            stake_date: stakeDateInSeconds,
            stake_amount: cer?.stake_amount,
            stake_token: cer?.stake_token,
            claim_list: false,
        };
    });

    return transformedData.sort((a, b) => a.stake_date - b.stake_date);
}


export const transformClaimInfo = (claims) => {
    const transformedData = claims.map((claim) => {
        const stakeDateInSeconds = toNumber(claim?.stake_date) / 1000;
        return {
            id: claim.id,
            creationDate: moment(toNumber(claim?.stake_date)).format('LLLL'),
            status: claim?.unstake_date !== null ? false : true,
            terms: claim?.name,
            type: 'Reward',
            amount: `~ ${fCurrencyV2(claim?.can_claim_amount)}`,
            can_claim_amount: isNull(claim?.unstake_date) ? toNumber(fCurrencyV2(claim?.can_claim_amount)) : 0,
            endTime: '--',
            stake_date: stakeDateInSeconds,
            stakeAmount: claim?.stake_amount,
            stake_token: claim?.stake_token,
            claim_list: true,
            profit_claimed_amount: claim?.profit_claimed_amount,
        };
    });

    return transformedData.sort((a, b) => a.stake_date - b.stake_date);
}
