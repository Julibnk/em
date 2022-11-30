import { LoadingOverlay } from '@mantine/core';

export const FullPageLoader = ({ children }) => {
  return (
    // <div style={{ position: 'relative' }}>
    <LoadingOverlay visible={true}>{children}</LoadingOverlay>
    // </div>
  );
};
