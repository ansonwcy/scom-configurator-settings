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
    '#pnlPreview :nth-child(2)': {
      marginInline: 'auto '
    },
    '.custom-settings--ui': {
      marginTop: '1rem',
      $nest: {
        '& > i-form': {
          display: 'block',
          height: '100%',
          $nest: {
            '& > i-vstack': {
              overflow: 'auto',
              minHeight: '300px',
              maxHeight: 'calc(70vh - 231px)',
              justifyContent: 'start'
            },
            '& > i-panel': {
              width: '100%',
              overflow: 'auto',
              maxHeight: 'calc(70vh - 231px)'
            },
            '& > i-vstack > i-panel': {
              width: '100%'
            }
          }
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
        },
        'i-combo-box .selection input': {
          paddingInline: 0
        }
      }
    },
    '::-webkit-scrollbar': {
      width: '7px',
    },
    '::-webkit-scrollbar-track': {
      borderRadius: '10px',
      border: '1px solid transparent',
      background: `${Theme.action.focus} !important`
    },
    '::-webkit-scrollbar-thumb': {
      background: `${Theme.divider} !important`,
      borderRadius: '10px',
      outline: '1px solid transparent'
    },
    '@media screen and (max-width: 992px)': {
      $nest: {
        '.custom-settings--ui': {
          $nest: {
            '& > i-form > i-vstack > i-panel': {
              maxHeight: 'auto',
              overflow: 'auto'
            }
          }
        },
        '#pnlPreview': {
          width: '100% !important'
        },
        '.custom--divider + i-vstack': {
          width: '100% !important'
        },
        '.custom--divider': {
          width: '100% !important',
          height: '2px !important'
        }
      }
    }
  }
})
