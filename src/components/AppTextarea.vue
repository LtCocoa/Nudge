<template>
  <label class="input-wrapper">
    <span v-if="label">{{ label }}:</span>
    <textarea
      v-model="inputValue"
      type="text"
      class="input min-h-12 max-h-36"
      maxlength="100"
    />
  </label>
</template>

<script setup lang="ts">

interface TextareaProps {
  label?: string;
}

const props = defineProps<TextareaProps>();
const inputValue = defineModel<string>();
</script>