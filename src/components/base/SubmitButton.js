import { LoadingButton } from '@mui/lab';
import { styled } from '@mui/system';

const SubmitBtn = styled(LoadingButton)({
    textTransform: 'none',
    fontSize: 16,
    fontWeight: 'bold',
    height: 44,
});

export const SubmitButton = ({ children, loading, ...props }) => {
    return (
        <SubmitBtn type="submit" variant="contained" fullWidth {...props} loading={loading}>
            {children}
        </SubmitBtn>
    );
};
