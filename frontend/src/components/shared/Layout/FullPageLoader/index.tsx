import { LoadingOverlay } from '@mantine/core';

export const FullPageLoader = () => {
  return (
    // <div style={{ position: 'relative' }}>
    <LoadingOverlay overlayOpacity={0.5} visible={true} />
    // <LoadingOverlay visible={true}>{children}</LoadingOverlay>
    // </div>
  );
};
