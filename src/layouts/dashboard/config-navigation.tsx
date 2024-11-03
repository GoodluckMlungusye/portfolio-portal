import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';

import { paths } from 'src/routes/paths';

import { api } from 'src/utils/api';

import { useTranslate } from 'src/locales';
import { getData } from 'src/services/getService';

import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
  job: icon('ic_job'),
  blog: icon('ic_blog'),
  chat: icon('ic_chat'),
  mail: icon('ic_mail'),
  user: icon('ic_user'),
  file: icon('ic_file'),
  lock: icon('ic_lock'),
  tour: icon('ic_tour'),
  order: icon('ic_order'),
  label: icon('ic_label'),
  blank: icon('ic_blank'),
  kanban: icon('ic_kanban'),
  folder: icon('ic_folder'),
  banking: icon('ic_banking'),
  booking: icon('ic_booking'),
  invoice: icon('ic_invoice'),
  product: icon('ic_product'),
  calendar: icon('ic_calendar'),
  disabled: icon('ic_disabled'),
  external: icon('ic_external'),
  menuItem: icon('ic_menu_item'),
  ecommerce: icon('ic_ecommerce'),
  analytics: icon('ic_analytics'),
  dashboard: icon('ic_dashboard'),
};

// ----------------------------------------------------------------------

export function useNavData() {
  const { t } = useTranslate();
  const { data } = useQuery({
    queryKey: ['links'],
    queryFn: () => getData(`${api.get}/links`),
  });

  const navigationItems = useMemo(() => data, [data]);
  const filteredItems = useMemo(() => ['home', 'about', 'skills', 'subskills'], []);
  const filteredCreateItems = useMemo(() => ['home', 'about', 'clients'], []);

  const listItems = useMemo(
    () =>
      navigationItems
        ? navigationItems
            .filter((item: any) => !filteredItems.includes(item.name))
            .map((item: any) => ({
              title: t(item.name),
              path: `${paths.dashboard.view.list}/${item.name}`,
            }))
        : [],
    [navigationItems, filteredItems,  t]
  );
  
  const createItems = useMemo(
    () =>
      navigationItems
        ? navigationItems
        .filter((item: any) => !filteredCreateItems.includes(item.name))
            .map((item: any) => ({
              title: t(item.name),
              path: `${paths.dashboard.create.new}/${item.name}`,
            }))
        : [],
    [navigationItems,filteredCreateItems, t]
  );

  const navData = useMemo(
    () => [
      // OVERVIEW
      // ----------------------------------------------------------------------
      {
        subheader: t('overview'),
        items: [
          {
            title: t('dashboard'),
            path: paths.dashboard.root,
            icon: ICONS.dashboard,
          },
        ],
      },

      // MANAGEMENT
      // ----------------------------------------------------------------------
      {
        subheader: t('management'),
        items: [
          {
            title: t('list'),
            path: paths.dashboard.view.root,
            icon: ICONS.file,
            children: listItems,
          },
          {
            title: t('create'),
            path: paths.dashboard.create.root,
            icon: ICONS.banking,
            children: createItems,
          },
        ],
      },
    ],
    [t, listItems, createItems]
  );

  return navData;
}
