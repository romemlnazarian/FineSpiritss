import {useState} from 'react';

export default function HomeLogic() {
  const [visible, setVisible] = useState(true);

  const onSubmitClose = () => {
    setVisible(prev => !prev);
  };

  return {
    visible,
    onSubmitClose,
  };
}
