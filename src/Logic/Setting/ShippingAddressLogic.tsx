import * as Yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {useForm} from 'react-hook-form';

export default function ShippingAddressLogic() {
    const validationSchema = Yup.object().shape({
      name: Yup.string().trim().required('Required'),
      street: Yup.string().trim().required('Required'),
      postalCode: Yup.string().trim().required('Required'),
      city: Yup.string().trim().required('Required'),
      
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