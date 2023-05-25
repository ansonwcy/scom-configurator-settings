import { Styles } from "@ijstech/components";
const Theme = Styles.Theme.ThemeVars;

export const containerStyle = Styles.style({
  width: 'var(--layout-container-width)',
  maxWidth: 'var(--layout-container-max_width)',
  textAlign: ('var(--layout-container-text_align)' as any),
  margin: '0 auto',
  padding: 10
})

export const chartStyle = Styles.style({
  display: 'block',
})
