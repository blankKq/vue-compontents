/*
 * @Author: blank 1653571991@qq.com
 * @Date: 2024-08-06 17:46:40
 * @LastEditors: blank 1653571991@qq.com
 * @LastEditTime: 2024-08-13 10:08:44
 * @FilePath: \vue-compontents\src\main.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import "./styles/common.css"

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

createApp(App).use(store).use(router).use(ElementPlus).mount('#app')
