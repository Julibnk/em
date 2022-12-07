import { LoadingOverlay as MantineLoadingOverlay } from '@mantine/core';

export interface Props {
  loading: boolean;
}

export const LoadingOverlay = ({ loading }: Props) => {
  return <MantineLoadingOverlay visible={loading} overlayBlur={0} />;
};
