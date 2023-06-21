import { useWallet } from '@suiet/wallet-kit';
import { SuiContext } from 'provider/SuiProvider';
import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { validateReferralCode } from 'utils/util';
const Affiliate = () => {
    const wallet = useWallet();
    const { provider } = React.useContext(SuiContext);

    const [affiliate, setAffiliate] = React.useState();

    const location = useLocation();
    const event = location.state?.eventName;

    const { projectId } = useParams();
    const decodedProjectId = decodeURIComponent(projectId);


    const [affiliateInfo, setAffiliateInfo] = React.useState({})

    const [yourRef, setYourRef] = React.useState();
    const fetchAffiliate = React.useCallback(async () => {
        const allOfProjectDetail = await provider.getDynamicFields({
            parentId: decodedProjectId,
            options: { showContent: true },
        });

        if (!allOfProjectDetail || allOfProjectDetail.data.length <= 0) return;

        const affiliateElement = allOfProjectDetail?.data.filter((element) => {
            const found = element?.name?.value.split(' <> ');
            return found && found.includes('Affiliate') && found.includes('Private-sale');
        });

        if (affiliateElement.length > 0) {
            setAffiliate(affiliateElement);
        }

    }, [decodedProjectId, provider])


    const fetchAffiliateDetail = React.useCallback(async () => {
        if (!affiliate || affiliate.length <= 0) return;

        affiliate.map(async (element) => {

            const affiliateDetail = await provider.getObject({
                id: element.objectId,
                options: { showContent: true },
            })

            setAffiliateInfo(prev => ({
                ...prev,
                profitList: affiliateDetail?.data?.content?.fields?.profit_list?.fields?.content?.contents
            }))

            const dynamicFiledVesting = await provider.getDynamicFields({
                parentId: element.objectId,
                options: { showContent: true },
            });

            const yourRef = dynamicFiledVesting?.data.find((item) => {
                // console.log('item___', item);

                const refCode = item?.name?.value;
                // console.log('refCode___', refCode)
                // console.log('wallet?.address__', wallet?.address)
                const found = validateReferralCode(refCode, wallet?.address);
                if(found) return found;

                // console.log('found___', found)
                return;
            })
            setYourRef(yourRef)
            // console.log('yourRef__', yourRef)
            // console.log('dynamicFiledVesting___', dynamicFiledVesting)
        })

        // const your 
    }, [affiliate, provider])

    React.useEffect(() => {
        fetchAffiliate();
    }, [fetchAffiliate])


    React.useEffect(() => {
        fetchAffiliateDetail()
    }, [fetchAffiliateDetail])


    return <div>Test</div>
}
export default Affiliate;