import { createMuiTheme } from '@material-ui/core/styles';
import createPalette from '@material-ui/core/styles/createPalette';

// Reds
export const Primary = {
  '500': '#4988ed',
  '600': '#1c54af',
  '50': '#4988ed',
  '100': '#4988ed',
  '200': '#4988ed',
  '300': '#4988ed',
  '400': '#4988ed',
  '700': '#1c54af',
  '800': '#1c54af',
  '900': '#1c54af',
  'A100': '#1c54af',
  'A200': '#1c54af',
  'A400': '#1c54af',
  'A700': '#1c54af',
  contrastDefaultColor: 'light'
};

const theme = createMuiTheme({
  typography: {
    fontFamily: '"Ted Next", sans-serif',
    htmlFontSize: '62.5%',
    color: 'currentColor',
    display1: { fontSize: '45px', lineHeight: '53px', fontWeight: '300', color: 'currentColor' },
    display2: { fontSize: '35px', lineHeight: '43px', fontWeight: '300', color: 'currentColor' },
    display3: { fontSize: '28px', lineHeight: '35px', fontWeight: '300', color: 'currentColor' },
    display4: { fontSize: '22px', lineHeight: '27px', fontWeight: '300', color: 'currentColor' },
    headline: { fontSize: '28px', lineHeight: '35px', fontWeight: '300', color: 'currentColor' },
    title: { fontSize: '22px', lineHeight: '27px', fontWeight: '600', color: 'currentColor'},
    subheading: { fontSize: '18px', lineHeight: '27px', fontWeight: '300', color: 'currentColor'},
    body2: { fontSize: '16px', lineHeight: '25px', fontWeight: '600', color: 'currentColor' },
    body1: { fontSize: '16px', lineHeight: '25px', fontWeight: '300', color: 'currentColor' },
    caption: { fontSize: '14px', lineHeight: '19px', fontWeight: '600', color: 'currentColor' },
    button: { fontSize: '16px', lineHeight: '19px', fontWeight: '600', color: 'currentColor' }
  },
  palette: createPalette({
    primary: Primary,
    accent: Primary
  }),
  overrides: {
    MuiInput: {
      input: {
        'fieldset:not([disabled]) &': {
        },
        'fieldset[disabled] &': {
        },
        '&:invalid': {
        }
      },
      underline: {
      },
    },
    MuiTextarea: {
      root: {
      }
    },
    MuiInputLabel: {
      root: {
      }
    },
    MuiSelect: {
      select: {
      }
    },
    MuiDialog: {
      root: {
      }
    },
    MuiButtonBase: {
      root: {
      }
    },
    MuiButton: {
      root: {
      }
    },
    MuiPaper: {
      root: {
      }
    },
    MuiDivider: {
      root: {
      }
    },
    MuiTabs: {
      root: {
      },
      indicator: {
      }
    },
    MuiTableCell: {
      head: {
      }
    }
  }
});

export default theme;
