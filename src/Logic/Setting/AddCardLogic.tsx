
import * as Yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {useForm} from 'react-hook-form';
import {Language} from '../../utiles/Language/i18n';

export default function AddCardLogic() {

  const validationSchema = Yup.object().shape({
    password: Yup.string().trim().required(Language.required_field),
    email: Yup.string()
      .trim()
      .required(Language.email_required)
      .email('Please enter a valid email address')
  });
  const {
    control,
    handleSubmit,
    formState: {errors},
    getValues,
  } = useForm({
    defaultValues: {
      password: '',
      email: '',

    },
    mode: 'onSubmit',
    resolver: yupResolver(validationSchema),
  });

  return{
    control,
    handleSubmit,
    errors,
  }
}