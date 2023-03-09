# vue部分知识点

## vue常用的修饰符
**v-on**
 - .stop - 调用 event.stopPropagation()。 阻止默认事件
 - .prevent - 调用 event.preventDefault()。阻止默认行为
 - .native - 监听组件根元素的原生事件。

**v-bind**
 - .prop - 作为一个 DOM property 绑定而不是作为 attribute 绑定。
 - .camel - (2.1.0+) 将 kebab-case attribute 名转换为 camelCase。(从 2.1.0 开始支持)
 - .sync (2.3.0+) 语法糖，会扩展成一个更新父组件绑定值的 v-on 侦听器。

**v-model**
 - [.lazy]- 取代 input 监听 change 事件
 - [.number] - 输入字符串转为有效的数字
 - [.trim] - 输入首尾空格过滤


## 自定义指令
实现点击一次后需经过一段时间才能再次点击
1.创建实现方法
```typescript
const onceClick = {
  mounted(el: any, binding: any, vnode: any) {
    el.addEventListener("click", () => {
      if (!el.disabled) {
        el.disabled = true;
        el.setAttribute("once-click", true);
        setTimeout(() => {
          el.disabled = false;
          el.setAttribute("once-click", false);
        }, binding.value || 1000);
      }
    });
  },
};

export default onceClick;
```
2.在main.ts中引入并挂载到全局
```typescript
//自定义指令
import onceClick from './directive/index';
app.directive("onceClick", onceClick);
```
3.使用v-onceClick
```html
<template>
    <div class="app">
      <el-button color="#626aef" plain v-onceClick="5000" @click="btnClick">ClickMe</el-button>
    </div>
</template>
```
## provide/inject
```vue
<script setup lang="ts">
  import HomeView from './views/HomeView.vue'
  provide('message', 'hello');
</script>

<template>
  <HomeView />
</template>
```
```vue
<template>
  <main>
    <HelloWorld />
  </main>
</template>
```
```vue
<script setup lang="ts">
console.log(inject('message'));
const message = inject('message');
</script>

<template>
  <div>消息：{{ message }}</div>
</template>

<style scoped lang="scss">

</style>
```
## props 
```vue
<script setup lang="ts">
import HomeView from './views/HomeView.vue'

const aaa = ref('test111');

const btnClick = () => {
  aaa.value = 'test222';
  console.log('点击成功');
}
</script>

<template>
  <HomeView :test-props="aaa"/>
  <div class="app">
    <el-button color="#626aef" plain v-onceClick="5000" @click="btnClick">ClickMe</el-button>
  </div>
</template>
```
**注意：**
HTML 标签和属性名称是不分大小写的，所以浏览器会把任何大写的字符解释为小写。这意味着当你使用 DOM 内的模板时，无论是 PascalCase 形式的组件名称、camelCase 形式的 prop 名称还是 v-on 的事件名称，都需要转换为相应等价的 **kebab-case** (短横线连字符) 形式：
```vue
<script setup lang="ts">
interface Props {
  testProps: string
}
const props = withDefaults(defineProps<Props>(), {
  testProps: '123',
})
console.log(props);
</script>

<template>
  <main>
    <HelloWorld />
    props:{{ props.testProps }}
  </main>
</template>
```
## render props
```vue
<script lang='ts'>
import RenderWorld from '@/components/RenderWorld.vue'

export default {
    setup() {
        const count = ref(500);
        return () => h(
            'div',
            [
                h(
                    RenderWorld, {
                        count: count.value // 给子组件传递数据
                    }
                )
            ],

        )
    }
}
```
```vue
<script lang='ts'>
export default {
    props: {
        count: {
            type: Number,
            default: 100
        }
    },
    setup(props, { expose }) {
        let newCount = ref(props.count);
        console.log(props.count);
        const increment = () => ++newCount.value
        expose({
            increment
        })
        return () => h(
            'div',
            newCount.value
        )
    }
}
</script>
```
## customRef()
创建一个自定义的 ref，显式声明对其依赖追踪和更新触发的控制方式。
```vue
<template>
   <el-input v-model="text"></el-input>
</template>
<script setup lang="ts">
const useDebouncedRef = (value: string, delay = 200) => {
  let timeout: number;
  return customRef((track, trigger) => {
    return {
      get() {
        track();
        return value;
      },
      set(newValue) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          value = newValue;
          trigger();
        }, delay)
      }
    }
  })
}
const text = useDebouncedRef('hello', 1000)
</script>
```
## effectScope()
创建一个 effect 作用域，可以捕获其中所创建的响应式副作用 (即计算属性和侦听器)，这样捕获到的副作用可以一起处理。
```vue
<script setup lang="ts">
const counter = ref(123);
const scope = effectScope();
scope.run(() => {
  const doubled = computed(() => counter.value * 2)

  watch(doubled, () => console.log('watch', doubled.value))

  watchEffect(() => console.log('watchEffect: ', doubled.value))
})

// 处理掉当前作用域内的所有 effect
scope.stop();

setTimeout(() => {
  counter.value = 234;
}, 2000);
</script>
```
