import * as yup from 'yup';

export const SaveObjectIdSchema = yup.object().shape({
    objectId: yup
        .string()
});
