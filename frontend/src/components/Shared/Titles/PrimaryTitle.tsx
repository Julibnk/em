import styles from './styles.module.css';
import { Title, TitleProps } from '@mantine/core';

type Props = {
  text: string;
} & TitleProps;

export const PrimaryTitle = (props: Props) => {
  const { text, ...rest } = props;
  return (
    <Title className={styles.primaryTitle} {...rest}>
      {text}
    </Title>
  );
};
