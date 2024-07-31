import { useMemo } from 'react';

import { paths } from 'src/routes/paths';

import { useTranslate } from 'src/locales';

import Label from 'src/components/label';
import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
  // OR
  // <Iconify icon="fluent:mail-24-filled" />
  // https://icon-sets.iconify.design/solar/
  // https://www.streamlinehq.com/icons
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

  const data = useMemo(
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
          }
        ],
      },

      // MANAGEMENT
      // ----------------------------------------------------------------------
      {
        subheader: t('management'),
        items: [
          {
            title: t('view'),
            path: paths.dashboard.user.root,
            icon: ICONS.analytics,
            children: [
              { title: t('projects'), path: paths.dashboard.user.list },
              { title: t('skills'), path: paths.dashboard.user.list },
              { title: t('education'), path: paths.dashboard.user.list },
              { title: t('explore'), path: paths.dashboard.user.list },
              { title: t('services'), path: paths.dashboard.user.list },
              { title: t('navigations'), path: paths.dashboard.user.list },
            ],
          },
          {
            title: t('create'),
            path: paths.dashboard.user.root,
            icon: ICONS.banking,
            children: [
              { title: t('projects'), path: paths.dashboard.product.new },
              { title: t('skills'), path: paths.dashboard.product.new },
              { title: t('education'), path: paths.dashboard.product.new },
              { title: t('explore'), path: paths.dashboard.product.new },
              { title: t('services'), path: paths.dashboard.product.new },
              { title: t('navigations'), path: paths.dashboard.product.new },
            ],
          }
        ],
      },

      // CLIENTS
      // ----------------------------------------------------------------------
      {
        subheader: t('clients'),
        items: [
          // MAIL
          {
            title: t('mail'),
            path: paths.dashboard.mail,
            icon: ICONS.mail,
            info: <Label color="error">+32</Label>,
          },

          // CHAT
          {
            title: t('chat'),
            path: paths.dashboard.chat,
            icon: ICONS.chat,
          }
        ]
      }
    ],
    [t]
  );

  return data;
}
