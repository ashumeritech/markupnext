import * as Yup from 'yup';

export const AddPostValidateSchema = Yup.object({
    Title: Yup.string().required('Title is required'),
    Description: Yup.string().required('Description is required'),
    HtmlCode: Yup.string(),
    CssCode: Yup.string(),
    CategoryIds: Yup.array(),
    // Image: Yup.mixed().test((value: any, ctx) => {
    //    return !value?.name?.length ? ctx.createError({ message: "Image is required" }) : true
    // })
});