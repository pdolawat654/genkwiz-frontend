import { ThemeConfig } from 'antd/es/config-provider/context';

export const antdConfigProviderTheme: ThemeConfig = {
  token: {
    // TODO: convert hard coded color value to css variable
    colorPrimary: '#bddbed',
    colorTextHeading: 'var(--color-heading)',
    colorTextPlaceholder: 'var(--color-placeholder-text)',
    fontFamily: 'var(--default-font-family)',
    controlHeight: 36,
    lineHeight: 1.5,
    colorBorder: 'var(--color-primary)',
    borderRadius: '0.25rem' as unknown as number,
  },
  components: {
    Radio: {
      colorPrimary: 'var(--color-primary)',
    },
    /* to override "Antd Select" component border style, changed it's by default border color to 'transparent' */
    Select: {
      colorBorder: 'transparent',
      colorPrimaryHover: '#fff',
    },
    /* to override antd styling of Layout component */
    Layout: {
      colorBgHeader: 'white',
    },
    /* to override antd styling of Tabs component */
    Tabs: {
      itemSelectedColor: 'var(--color-primary-dark)',
      itemColor: 'var(--color-primary)',
      cardBg: 'var(--color-body)',
    },
    /* to override antd styling of Menu component */
    Menu: {
      colorItemBg: 'transparent',
      colorItemText: 'white',
      colorItemTextHover: 'white',
      colorItemTextSelected: 'white',
      colorItemBgSelected: 'var(--color-heading)',
    },
    /* to override antd styling of Switch component */
    Switch: {
      handleBg: 'var(--color-primary-dark)',
      innerMaxMargin: 40,
      handleSize: 20,
      trackHeight: 24,
    },
  },
};

export default antdConfigProviderTheme;
