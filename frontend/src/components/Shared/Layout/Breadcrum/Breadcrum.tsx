import { Breadcrumbs, ActionIcon } from '@mantine/core';
import { IconHome2 } from '@tabler/icons-react';
const items = [
  { title: '', href: '#' },
  { title: 'Hola', href: '#' },
].map((item, index) => (
  <ActionIcon variant='filled' color='turquoise' key={index}>
    <IconHome2 />
  </ActionIcon>
));

export const Breadcrum = () => {
  return <Breadcrumbs>{items}</Breadcrumbs>;
};
