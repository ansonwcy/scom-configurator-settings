import { Styles } from "@ijstech/components";
const Theme = Styles.Theme.ThemeVars;

export const configStyle = Styles.style({
  $nest: {
    '.text-capitalize': {
      textTransform: 'capitalize !important' as any
    },
    '.icon-close svg': {
      fill: Theme.colors.primary.main
    },
    '.is-direction': {
      $nest: {
        'i-tab .tab-item > i-icon svg': {
          fill: `${Theme.colors.primary.contrastText} !important`,
        },
        'i-input': {
          border: `1px solid ${Theme.input.fontColor}`
        }
      }
    },
    'i-tab .tab-item > i-icon svg': {
      opacity: 0.55
    },
    'i-tab:not(.disabled).active .tab-item > i-icon svg': {
      opacity: 1
    },
    'i-tab:not(.disabled):hover .tab-item > i-icon svg': {
      opacity: 1
    },
    '#pnlPreview i-input': {
      marginBottom: '0 !important'
    },
    '.custom-settings--ui': {
      $nest: {
        '& > i-panel > i-vstack > i-panel': {
          width: '100%'
        },
        '.form-control > i-panel': {
          $nest: {
            '& > i-panel > i-hstack > i-label': {
              fontSize: '1.25rem !important'
            },
            '& > i-hstack > i-hstack > i-label': {
              fontSize: '1.25rem !important'
            }
          }
        }
      }
    }
  }
})
