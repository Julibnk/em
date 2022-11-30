import { Button, ButtonProps } from '@mantine/core';
import styles from './styles.module.css';

const SecondaryButton = (props) => {
  const buttonProps: ButtonProps = {
    classNames: {
      outline: styles.outline,
    },
    color: 'gray',
    variant: 'outline',
    type: 'button',
    ...props,
  };
  return <Button {...buttonProps}></Button>;
};

export default SecondaryButton;
