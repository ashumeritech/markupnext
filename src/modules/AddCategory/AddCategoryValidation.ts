import * as Yup from 'yup';

export const AddCategoryValidateSchema = Yup.object({
    Name: Yup.string().required('Name is required'),
    Description: Yup.string().required('Description is required')
});