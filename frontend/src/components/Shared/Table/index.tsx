/* eslint-disable security/detect-object-injection */
import { Table as MantineTable } from '@mantine/core';
import styles from './styles.module.css';

type TextAlign = 'left' | 'center' | 'end';

type ThProps = {
  children: React.ReactNode;
  textAlign?: TextAlign;
};

type TdProps = {
  children?: React.ReactNode;
  textAlign?: TextAlign;
  emphasized?: boolean;
};

type TableProps = {
  children: React.ReactNode;
  className?: string;
};

export const Th = ({ children, textAlign = 'left' }: ThProps) => {
  const className = `${styles.th} ${styles[textAlign]}`;

  return <th className={className}>{children}</th>;
};

export const Td = ({
  children,
  textAlign = 'left',
  emphasized = false,
}: TdProps) => {
  const className = `${styles.td} ${styles[textAlign]} ${
    emphasized && styles.emphasized
  }`;

  return <td className={className}>{children}</td>;
};

export const Table = ({ children, className }: TableProps) => {
  return (
    <MantineTable
      highlightOnHover
      className={`${styles.table} ${className && className} shadow`}
      verticalSpacing='xs'
    >
      {children}
    </MantineTable>
  );
};
