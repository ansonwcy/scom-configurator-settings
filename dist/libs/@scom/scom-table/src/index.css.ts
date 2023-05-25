import { Styles } from "@ijstech/components";
const Theme = Styles.Theme.ThemeVars;

export const containerStyle = Styles.style({
  width: 'var(--layout-container-width)',
  maxWidth: 'var(--layout-container-max_width)',
  textAlign: ('var(--layout-container-text_align)' as any),
  margin: '0 auto',
  padding: 10
})

export const tableStyle = Styles.style({
  display: 'block',
  $nest: {
    'i-progress .i-progress_wrapbar': {
      borderRadius: 4
    },
    'i-input input': {
      border: 'none',
      background: 'transparent'
    },
    'i-table': {
      fontSize: '12px',
      $nest: {
        '.i-table-container': {
          overflowY: 'auto',
          height: 'inherit'
        },
        'thead': {
          background: Theme.background.main,
          position: 'sticky',
          top: 0,
          zIndex: 1
        }
      }
    },
    'i-pagination': {
      lineHeight: '24px',
      $nest: {
        '.pagination a': {
          minWidth: 30,
          height: 25,
          fontSize: 12,
          padding: '0 2px',
          background: Theme.colors.success.light,
          color: Theme.colors.success.contrastText
        },
        '.pagination a.active': {
          background: Theme.colors.success.dark,
          borderColor: Theme.colors.success.dark,
          color: Theme.colors.secondary.contrastText
        }
      }
    },
    '::-webkit-scrollbar': {
      width: '5px',
      height: '5px'
    },
    '::-webkit-scrollbar-track': {
      borderRadius: '10px',
      border: '1px solid transparent',
      background: Theme.action.focus
    },
    '::-webkit-scrollbar-thumb': {
      background: Theme.colors.info.main,
      borderRadius: '10px'
    }
  }
})
