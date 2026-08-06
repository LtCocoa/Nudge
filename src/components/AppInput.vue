<template>
  <label class="input-wrapper">
    <span v-if="label">{{ label }}:</span>
    <div class="input-field">
      <input
        v-model="inputValue"
        type="text"
        class="input"
        :placeholder
      />
      <X
        class="clear-button"
        @click="onClearClick"
      />
    </div>
  </label>
</template>

<script setup lang="ts">
import { X } from '@lucide/vue';

interface InputProps {
  label?: string;
  placeholder?: string;
  clearable?: boolean;
}

const props = withDefaults(
  defineProps<InputProps>(), {
    clearable: false,
  }
);

const inputValue = defineModel<string>();

const onClearClick = () => {
  inputValue.value = '';
}

</script>

<style scoped>
  .input-field {
    @apply p-2 rounded border-2 flex gap-2;

    .input {
      flex: 1;
      height: 24px;
    }

    .clear-button {
      @apply text-neutral-400 cursor-pointer;
    }
  }
</style>