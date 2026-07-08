<template>
  <label class="input-wrapper">
    <span>{{ label }}:</span>
    <input
      v-model="inputValue"
      type="datetime-local"
      class="input"
    />
  </label>
</template>

<script setup lang="ts">
import { LabeledInputProps } from './types';

interface DateTimeInputProps extends LabeledInputProps {}

const props = defineProps<DateTimeInputProps>();
const inputValue = defineModel<Date | null>();
</script>