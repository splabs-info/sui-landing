export const fetchCoreDetails = async (p) => {
    if (p && Object.keys(p).includes('POLICY')) {
        return Object.values(p).flatMap((i) => {
            return {
                ...i?.content?.fields?.value?.fields,
                objectId: i?.objectId,
                name: i?.name,
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
                type_core: i?.type_core,
                rule_name: i?.name?.value,
            }
        })
    }
    return []
}