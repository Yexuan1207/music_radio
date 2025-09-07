// plugins/confirm.ts
import { createVNode, render, type App } from 'vue'
import ConfirmDialog from './confirm.vue'
import { toRem } from '@/utils' // 假设你有这个工具函数



// 核心命令式函数
const confirm = (text: string, title?: string | (() => void), onConfirm?: () => void) => {
    // 处理重载：title 是函数的情况
    if (typeof title === 'function') {
        onConfirm = title
        title = undefined
    }

    // DOM 容器
    const container = document.createElement('div')
    document.body.appendChild(container)

    // 创建 VNode
    const vnode = createVNode(ConfirmDialog, {
        visible: true,
        text,
        title,
        width: toRem(320), // 可配置
        //它对应于 confirm.vue 组件内部通过 emit('update:visible', false) 触发的事件
        // 通过命令式方式创建的组件实例是没有父组件模板处理的事件的，所以需要在vnode创建时绑定事件
        'onUpdate:visible': (visible: boolean) => {
            if (!visible) {
                // 关闭后卸载组件
                render(null, container)
                document.body.removeChild(container)
            }
        },
        //作为prop对应.vue文件的onConfirm事件
        onConfirm: () => {
            onConfirm?.()
            // 自动关闭
            vnode.props!.visible = false
            render(vnode, container)
        }
    })

    // 渲染到页面
    render(vnode, container)

}

// 插件形式注册（可选）


export { confirm }
