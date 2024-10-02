import { useMemo } from "react";

import { paths } from "src/routes/paths";

import { useTranslate } from "src/locales";
import { useDataContext } from 'src/contexts/data-context';

import SvgColor from "src/components/svg-color";


// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor
    src={`/assets/icons/navbar/${name}.svg`}
    sx={{ width: 1, height: 1 }}
  />
);

const ICONS = {
  job: icon("ic_job"),
  blog: icon("ic_blog"),
  chat: icon("ic_chat"),
  mail: icon("ic_mail"),
  user: icon("ic_user"),
  file: icon("ic_file"),
  lock: icon("ic_lock"),
  tour: icon("ic_tour"),
  order: icon("ic_order"),
  label: icon("ic_label"),
  blank: icon("ic_blank"),
  kanban: icon("ic_kanban"),
  folder: icon("ic_folder"),
  banking: icon("ic_banking"),
  booking: icon("ic_booking"),
  invoice: icon("ic_invoice"),
  product: icon("ic_product"),
  calendar: icon("ic_calendar"),
  disabled: icon("ic_disabled"),
  external: icon("ic_external"),
  menuItem: icon("ic_menu_item"),
  ecommerce: icon("ic_ecommerce"),
  analytics: icon("ic_analytics"),
  dashboard: icon("ic_dashboard"),
};

// ----------------------------------------------------------------------

export function useNavData() {
  const { t } = useTranslate();
  const { dataProvided } = useDataContext();

  const navigationItems = useMemo(
    () => dataProvided,
    [dataProvided]
  );

  const data = useMemo(
    () => [
      // OVERVIEW
      // ----------------------------------------------------------------------
      {
        subheader: t("overview"),
        items: [
          {
            title: t("dashboard"),
            path: paths.dashboard.root,
            icon: ICONS.dashboard,
          },
        ],
      },

      // MANAGEMENT
      // ----------------------------------------------------------------------
      {
        subheader: t("management"),
        items: [
          {
            title: t("list"),
            path: paths.dashboard.view.root,
            icon: ICONS.file,
            children: navigationItems.map((item) => ({
              title: t(item.name),
              path: `${paths.dashboard.view.list}/${item.id}`,
            })),
          },
          {
            title: t("create"),
            path: paths.dashboard.create.root,
            icon: ICONS.banking,
            children: navigationItems.map((item) => ({
              title: t(item.name),
              path: `${paths.dashboard.create.new}/${item.id}`,
            })),
          },
        ],
      },
    ],
    [t, navigationItems]
  );

  return data;
}
