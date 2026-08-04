<template>
  <label class="input-wrapper">
    <span v-if="label">{{ label }}:</span>
    <input
      v-model="inputValue"
      type="text"
      class="input"
      :placeholder
    />
  </label>
</template>

<script setup lang="ts">

interface InputProps {
  label?: string;
  placeholder?: string;
}

const props = defineProps<InputProps>();
const inputValue = defineModel<string>();
</script>