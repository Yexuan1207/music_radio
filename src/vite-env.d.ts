/// <reference types="vite/client" />

declare module '*.vue' {
    import { Appm, defineAsyncComponent } from "vue"
    const component: ReturnType<typeof defineAsyncComponent> & {
        install(app: Appm): void
    }
    export default component
}