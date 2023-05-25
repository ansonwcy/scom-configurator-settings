import { Styles } from "@ijstech/components";
const Theme = Styles.Theme.ThemeVars;

export const configStyle = Styles.style({
  $nest: {
    '.text-capitalize': {
      textTransform: 'capitalize !important' as any
    },
    '.icon-close svg': {
      fill: Theme.colors.primary.main
    }
  }
})
