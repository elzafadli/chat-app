/// <reference types="vite/client" />

declare module 'vue-material-design-icons/*' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
