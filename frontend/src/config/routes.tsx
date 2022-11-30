import { lazy, LazyExoticComponent } from 'react';
import i18n from 'i18next';

export interface Route {
  path: string;
  title?: string;
  subtitle?: string;
  component: LazyExoticComponent<() => JSX.Element>;
}

export const routes: Route[] = [
  {
    path: 'home/*',
    component: lazy(() => import('../components/HomeScreen')),
  },
  {
    path: 'message/*',
    title: i18n.t('message', { count: 0 }) || undefined,
    subtitle: i18n.t('message_subtitle') || undefined,
    component: lazy(() => import('../components/MessageScreen')),
  },
  {
    path: 'contact/*',
    title: i18n.t('contact', { count: 0 }) || undefined,
    subtitle: i18n.t('contact_subtitle') || undefined,

    component: lazy(() => import('../components/ContactScreen')),
  },
  {
    path: 'configuration/*',
    title: i18n.t('configuration', { count: 0 }) || undefined,
    subtitle: i18n.t('configuration_subtitle') || undefined,
    component: lazy(() => import('../components/ConfigurationScreen')),
  },
  {
    path: 'profile/*',
    title: i18n.t('profile') || undefined,
    subtitle: i18n.t('profile_subtitle') || undefined,
    component: lazy(() => import('../components/ProfileScreen')),
  },
];
