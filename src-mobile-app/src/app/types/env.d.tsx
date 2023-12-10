declare module '@env' {
  export const PUBLIC_SUPABASE_URL: string;
  export const PUBLIC_SUPABASE_ANON_KEY: string;
}

declare module "*.png" {
  const value: any;
  export default value;
}

declare module "*.jpg" {
  const value: any;
  export default value;
}

declare module 'react-native-ios-modal' {
  var ModalView: any
}