import * as utils from './index'
import type { App, } from 'vue'
const components = import.meta.glob("@/base/*.vue", { eager: true })//eager: true 表示立即加载
const GlobalComponents = {
    install(app: App) {
        // for (const path in components) {
        //     components[path]().then((mod: any) => {
        //         const component = mod.default
        //         console.log(component.name, component);
        //         app.component(component.name, component)
        //     })
        // }
        Object.values(components).forEach((mod: any) => {
            const component = mod.default
            app.component(component.name, component)

        })
        // app.config.globalProperties.$utils = utils
        app.provide('utils', utils)


    }
};
export default GlobalComponents