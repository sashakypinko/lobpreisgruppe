const BasicConfig = {
  SERVER_URL: import.meta.env.VITE_SERVER_URL,
  API_VERSION: import.meta.env.VITE_API_VERSION,
  EPREL_LABEL_URL: import.meta.env.VITE_EPREL_LABEL_URL,
  SUBDOMAIN_FILES: import.meta.env.VITE_SUBDOMAIN_FILES,
  SOFTWARE_VERSION: import.meta.env.VITE_SOFTWARE_VERSION
    ? parseFloat(import.meta.env.VITE_SOFTWARE_VERSION)
    : 0,
  localizations: {
    defaultLanguage: 'de',
  },
  PER_PAGE: 24,
  perPageValues: [
    24,
    48,
  ],
  viewTypes: [
    {
      name: 'tiles',
      icon: 'view_module',
      translation: 'view.tiles',
    },
    {
      name: 'list',
      icon: 'view_list',
      translation: 'view.list',
    },
  ],
};
export default BasicConfig;
