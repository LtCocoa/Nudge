<template>
  <button
    type="button"
    class="btn"
    :class="[
      `btn-${variant}`,
    ]"
    :attrs="$attrs"
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