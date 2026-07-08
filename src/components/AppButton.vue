<template>
  <button
    type="button"
    :class="{
      'btn': true,
      'btn-primary': variant === 'primary',
      'btn-secondary': variant === 'secondary',
    }"
    v-bind="$attrs"
  >
    <slot />
  </button>
</template>

<script lang="ts" setup>
export interface ButtonProps {
  variant?: 'primary' | 'secondary',
}

const props = withDefaults(
  defineProps<ButtonProps>(), { variant: 'secondary' }
);

</script>

<style scoped>

</style>