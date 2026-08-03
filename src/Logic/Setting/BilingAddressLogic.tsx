import * as Yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {useForm} from 'react-hook-form';
import {Language} from '../../utiles/Language/i18n';

export default function BilingAddressLogic() {
    const validationSchema = Yup.object().shape({
      name: Yup.string().trim().required(Language.required_field),
      street: Yup.string().trim().required(Language.required_field),
      postalCode: Yup.string().trim().required(Language.required_field),
      city: Yup.string().trim().required(Language.required_field),
        phone: Yup.string().trim(),
        email: Yup.string()
          .trim()
          .required(Language.email_required)
      });
      const {
        control,
        handleSubmit,
        formState: {errors, isValid},
        getValues,
      } = useForm({
        defaultValues: {
          name: '',
          street: '',
          postalCode: '',
          city: '',
          phone: '',
          email: '',
    
        },
        mode: 'onChange',
        resolver: yupResolver(validationSchema),
      })
      const onSubmit = (data: any) => {
        console.log(data);
      }
 return{
    control,
    handleSubmit,
    errors,
    isValid,
    onSubmit,
 }
}