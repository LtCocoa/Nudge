<template>
  <label class="input-wrapper">
    <span v-if="label">{{ label }}:</span>
    <input
      v-model="inputValue"
      type="datetime-local"
      class="input-field"
    />
  </label>
</template>

<script setup lang="ts">

interface DateTimeInputProps {
  label?: string;
}

const props = defineProps<DateTimeInputProps>();
const inputValue = defineModel<Date | null>();
</script>