// import { yupResolver } from '@hookform/resolvers/yup';
// import { LoadingButton } from '@mui/lab';
// import { styled } from '@mui/material/styles';
// import { useWallet } from '@suiet/wallet-kit';
// import { InputField } from 'components/base/InputFieldV2';
// import { SuiContext } from 'provider/SuiProviderV2';
// import React from 'react';
// import { useForm } from 'react-hook-form';
// import { useYouSuiStore } from 'zustand-store/yousui_store';
// import { SaveObjectIdSchema } from './validation';

// const StyledBuyTokenBtn = styled(LoadingButton)(({ them }) => ({
//     background: 'linear-gradient(178.73deg, rgba(104, 230, 184, 0.9) -8.02%, rgba(109, 133, 218, 0.9) 98.69%);',
//     color: 'white',
//     height: 48,
//     width: 156,
//     fontSize: 18,
//     borderRadius: 48,
//     alignItems: 'center',
//     boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25), inset 0px 0px 30px rgba(255, 255, 255, 0.25)',
//     '&.Mui-disabled': {
//         color: 'rgba(255, 255, 255, 0.5)',
//     },
// }));
// export const SaveObjectIDForm = () => {
//     const { objectIdOGRoleNft, setObjectId } = useYouSuiStore();
//     const { provider } = React.useContext(SuiContext)
//     const wallet = useWallet();


//     const {
//         control,
//         handleSubmit,
//         formState: { isValid },
//     } = useForm({
//         mode: 'onChange',
//         defaultValues: {
//             objectId: objectIdOGRoleNft || '',
//         },
//         resolver: yupResolver(SaveObjectIdSchema),
//     });

//     const handleSave = async (value) => {
//         setObjectId(value.objectId)

//         const validate = await provider.getObject({
//             id: value?.objectId,
//             options: { showContent: true },
//         })

        
//     }

//     return (
//         <form onSubmit={handleSubmit(handleSave)}>
//             <InputField
//                 id="objectId"
//                 name="objectId"
//                 control={control}
//             />
//             <StyledBuyTokenBtn type="submit" disable={!isValid}>Save</StyledBuyTokenBtn>
//         </form>
//     );
// };
export {}