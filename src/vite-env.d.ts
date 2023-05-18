/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component

  export interface ILcu {
    fetch: (string, string, string) => Promise<string>,
  }
  
  declare global {
    interface Window {
      lcu: ILcu
    }
  }
}

