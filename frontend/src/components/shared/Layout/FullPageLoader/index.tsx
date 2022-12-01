import { LoadingOverlay } from '@mantine/core';

export const FullPageLoader = () => {
  return (
    // <div style={{ position: 'relative' }}>
    <LoadingOverlay visible={true} />
    // <LoadingOverlay visible={true}>{children}</LoadingOverlay>
    // </div>
  );
};
