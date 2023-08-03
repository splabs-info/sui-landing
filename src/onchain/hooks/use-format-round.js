import { ethers } from 'ethers';
import {
    isEmpty
} from 'lodash';
import { fetchCoreDetails } from 'onchain/helpers';
import { SuiContext } from 'provider/SuiProviderV2';
import React from 'react';
export const useFormatRound = () => {
    const [infoRound, setInfoRound] = React.useState([])
    const { projects, provider } = React.useContext(SuiContext)

    const [policies, setPolicies] = React.useState({})
    const [services, setServices] = React.useState({})


    const fetchDynamicFieldObject = React.useCallback(
        async (item) => {
            try {
                const dynamicFiled = await provider.getDynamicFieldObject({
                    parentId: item?.parent_id,
                    name: item?.name,
                })
                return {
                    [item?.type_core]: {
                        ...dynamicFiled?.data,
                        name: item?.name,
                        parent_id: item?.parent_id,
                        type_core: item?.type_core,
                    },
                }
            } catch (e) {
                console.error(e)
                return null
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    )

    const fetchDynamicFields = React.useCallback(
        async (field) => {
            try {
                const fields = await provider.getDynamicFields({ parentId: field?.fields?.value })
                return {
                    [field?.fields.key]: fields?.data.map((i) => ({
                        ...i,
                        type_core: field?.fields.key,
                        parent_id: field?.fields?.value,
                    })),
                }
            } catch (e) {
                console.error(e)
                return null
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    )

    const formatInfoRound = React.useCallback(async (name) => {
        if (isEmpty(projects)) return

        const rounds = projects
            .map((item) =>
                item?.all_rounds?.find((round) => round?.name === name)
            )
            .filter(Boolean)

        const dynamicFieldsPromises = rounds
            .flatMap((round) => {
                return round?.core?.fields?.contents?.map((content) => fetchDynamicFields(content)) || [];
            })
            .filter(Boolean);

        const results = await Promise.all(dynamicFieldsPromises).catch((e) => console.error(e))

        if (Array.isArray(results) && results.length > 0) {
            const nonNullResults = results.filter(Boolean)
            const corePromises = nonNullResults.flatMap((item) =>
                Object.values(item).flatMap((ele) =>
                    Object.values(ele).flatMap((e) => fetchDynamicFieldObject(e))
                )
            )
            let cores;
            try {
                cores = await Promise.all(corePromises)
            } catch (e) {
                console.error(e)
                cores = []
            }

            const coreDetailsPromises = cores.map(fetchCoreDetails)
            let coreDetails;
            try {
                coreDetails = await Promise.all(coreDetailsPromises)

            } catch (e) {
                console.error(e)
                coreDetails = []
            }

            // Flatten the coreDetails array and filter out null or undefined elements
            const flattenCoreDetails = [].concat(...coreDetails).filter(Boolean)

            const policies = flattenCoreDetails.filter((core) => core?.type_core === 'POLICY')
            const services = flattenCoreDetails.filter((core) => core?.type_core === 'SERVICE')
            // const vault = flattenCoreDetails.filter((core) => core?.type_core === 'VAULT')

            let additionalInfo = {}
            policies.forEach((p) => {
                if (!p?.max_purchase || !p?.min_purchase) return;

                additionalInfo = {
                    ...additionalInfo,
                    maxPurchase:
                        Number(
                            ethers.utils.formatUnits(
                                p?.max_purchase,
                                rounds[0]?.token_decimal
                            )
                        ) || 0,
                    minPurchase:
                        Number(
                            ethers.utils.formatUnits(
                                p?.min_purchase,
                                rounds[0]?.token_decimal
                            )
                        ) || 0,
                }
            })

            setServices(services)
            setPolicies(policies)
            setInfoRound((pre) => ({ ...pre, ...additionalInfo }))
        }


        const infoState = rounds.map((info) => ({
            id: info?.id?.id || '',
            name: info?.name || '',
            payments: info.payments || [],
            projectName: projects[0]?.name || '',
            telegram: info?.project?.fields.telegram,
            discord: info?.project?.fields.discord,
            twitter: info?.project?.fields.twitter,
            medium: info?.project?.fields.medium,
            website: info?.project?.fields.website,
            imageUrl: info?.project?.fields.image_url,
            endAt: info?.end_at || '',
            startAt: info?.start_at || '',
            decimals: info?.token_decimal || 0,
            description: info?.project?.fields.description || '',
            iconUrl: info?.token?.iconUrl || '',
            tokenName: info?.token?.name || '',
            symbol: info?.token?.symbol || '',
            totalSold: Number(info?.total_sold) || 0,
            totalSupply: Number(info?.total_supply) || 0,
            type: info?.token_type,
            purchaseType: info?.purchase_type?.fields?.contents,
            participants: info?.participants?.fields?.content
        }))

        setInfoRound((pre) => ({
            ...pre,
            ...infoState[0],
        }))

    }, [fetchDynamicFieldObject, fetchDynamicFields, projects])

    return {
        infoRound,
        services,
        policies,
        formatInfoRound
    }
}