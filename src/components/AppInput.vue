<template>
  <label class="input-wrapper">
    <span>{{ label }}:</span>
    <input
      v-model="inputValue"
      type="text"
      class="input"
    />
  </label>
</template>

<script setup lang="ts">
import { LabeledInputProps } from './types';

interface InputProps extends LabeledInputProps {}

const props = defineProps<InputProps>();
const inputValue = defineModel<string>();
</script>