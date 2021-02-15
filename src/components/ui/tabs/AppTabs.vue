<template>
  <div class="tabs" v-if="tabs.length">
    <ul class="tabs__nav">
      <li
        v-for="tab in tabs"
        :key="tab.props.title"
        :class="['tabs__link', {
          'is-active': tab.props.title === selectedIndex
        }]"
      >
        <a
          href="#"
          @click.prevent="selectedIndex = tab.props.title"
        >
          {{ tab.props.title }}
        </a>
      </li>
    </ul>
    <div class="tabs__main">
      <slot />
    </div>
  </div>
</template>

<script>
import {
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  provide,
  reactive,
  toRefs
} from 'vue'

const isTab = node => node.type.name === 'AppTab'
const isFragment = node => typeof node.type === 'symbol' && node.type.description === 'Fragment'
const hasTabs = node => node.children && node.children.length && node.children.some(isTab)
const isTabParent = node => isFragment(node) && hasTabs(node)

export default {
  name: 'AppTabs',
  setup(_, { slots }) {
    const state = reactive({
      selectedIndex: null,
      tabs: [],
      count: 0
    })

    provide('TabsProvider', state)

    const selectTab = i => {
      state.selectedIndex = i
    }

    const update = () => {
      if (slots.default) {
        state.tabs = slots
          .default()
          .filter(node => isTab(node) || isTabParent(node))
          .flatMap(node => (isTabParent(node) ? node.children : node))
      }
    }

    onBeforeMount(update)
    onBeforeUpdate(update)

    onMounted(() => {
      const selectedIndex = state.tabs.findIndex(tab => ('active' in tab.props || 'selected' in tab.props))
      const activeIndex = selectedIndex !== -1 ? selectedIndex : 0
      const activeTitle = state.tabs.length ? state.tabs[activeIndex].props.title : null

      selectTab(activeTitle)
    })

    return {
      ...toRefs(state),
      selectTab
    }
  }
}
</script>

<style>
.tabs__nav {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  padding: 0;
  margin-bottom: 15px;
}

.tabs__link {
  text-align: center;
  margin-right: 25px;
  margin-bottom: 10px;
}

.tabs__link a {
  display: inline-flex;
  color: #2c3e50;
  padding-bottom: 2px;
  border-bottom: 2px solid transparent;
}

.tabs__link.is-active a {
  color: #42b983;
  border-bottom-color: #42b983;
}
</style>
