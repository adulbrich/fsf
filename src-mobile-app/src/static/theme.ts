import { tokens } from '@tamagui/themes';

const light = {
  background: '#fff',
  backgroundHover: tokens.color.gray3,
  backgroundPress: tokens.color.gray4,
  backgroundFocus: tokens.color.gray5,
  borderColor: tokens.color.gray4,
  borderColorHover: tokens.color.gray6,
  color: tokens.color.gray12,
  colorHover: tokens.color.gray11,
  colorPress: tokens.color.gray10,
  colorFocus: tokens.color.gray6,
  shadowColor: tokens.color.grayA5,
  shadowColorHover: tokens.color.grayA6,
}

// note: we set up a single consistent base type to validate the rest:
type BaseTheme = typeof light

// the rest of the themes use BaseTheme
const dark: BaseTheme = {
  background: '#000',
  backgroundHover: tokens.color.gray2Dark,
  backgroundPress: tokens.color.gray3Dark,
  backgroundFocus: tokens.color.gray4Dark,
  borderColor: tokens.color.gray3Dark,
  borderColorHover: tokens.color.gray4Dark,
  color: '#ddd',
  colorHover: tokens.color.gray11Dark,
  colorPress: tokens.color.gray10Dark,
  colorFocus: tokens.color.gray6Dark,
  shadowColor: tokens.color.grayA6,
  shadowColorHover: tokens.color.grayA7,
}

const dark_translucent: BaseTheme = {
  ...dark,
  background: 'rgba(0,0,0,0.7)',
  backgroundHover: 'rgba(0,0,0,0.5)',
  backgroundPress: 'rgba(0,0,0,0.25)',
  backgroundFocus: 'rgba(0,0,0,0.1)',
}

const light_translucent: BaseTheme = {
  ...light,
  background: 'rgba(255,255,255,0.85)',
  backgroundHover: 'rgba(250,250,250,0.85)',
  backgroundPress: 'rgba(240,240,240,0.85)',
  backgroundFocus: 'rgba(240,240,240,0.7)',
}

// note the steps here
// we recommend doing this because it avoids a category of confusing type errors

// 1. to get ThemeNames/Theme, first create an object with all themes
const allThemes = {
  dark,
  light,
  dark_translucent,
  light_translucent,
  ...colorThemes,
}

// 2. then get the name type
type ThemeName = keyof typeof allThemes

// 3. then, create a Themes type that explicitly maps ThemeName => BaseTheme
type Themes = {
  [key in ThemeName]: BaseTheme
}

// 4. finally, export it with the stricter type
export const themes: Themes = allThemes