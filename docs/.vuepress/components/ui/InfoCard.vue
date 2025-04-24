<template>
  <div class="custom-info-card" :class="type">
    <p class="custom-info-card-title">{{ title }}</p>
    <slot />
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: 'info', // 'info', 'tip', 'warning', 'danger'
    validator: (value) => ['info', 'tip', 'warning', 'danger'].includes(value),
  },
})
</script>

<style lang="scss" scoped>
.custom-info-card {
  padding: 1rem 1.5rem;
  border-radius: 0.5rem;
  margin: 1rem 0;
  border-left-width: 0.5rem;
  border-left-style: solid;
  background-color: var(--c-bg-light, #f3f4f6); // 使用 CSS 变量兼容亮暗模式

  &.info {
    border-left-color: var(--c-brand, #3eaf7c); // 默认使用品牌色
  }
  &.tip {
    border-left-color: var(--c-tip, #42b983);
    background-color: var(--c-tip-bg, #e2f5ec);
  }
  &.warning {
    border-left-color: var(--c-warning, #e7c000);
    background-color: var(--c-warning-bg, #fff8d8);
    .custom-info-card-title {
      color: var(--c-warning-title, #b49400);
    }
  }
  &.danger {
    border-left-color: var(--c-danger, #cc0000);
    background-color: var(--c-danger-bg, #ffe0e0);
    .custom-info-card-title {
      color: var(--c-danger-title, #a40000);
    }
  }
}

.custom-info-card-title {
  font-weight: 600;
  margin-top: 0;
  margin-bottom: 0.5rem;
}

// 移除段落的默认边距，如果它是卡片内的唯一元素
:slotted(p:first-child:last-child) {
  margin: 0;
}
</style>
