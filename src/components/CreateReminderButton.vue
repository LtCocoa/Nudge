<template>
  <ModalWindow>
    <template #open-button="{ onOpen }">
      <AppButton
        variant="primary"
        @click="onOpen"
      >
        <div class="flex justify-center gap-1">
          <Plus />
          New reminder
        </div>
      </AppButton>
    </template>

    <template #default="{ onClose }">
      <CreateReminder @created="onClose" />
    </template>

    <template #close-button="{ onClose }">
      <AppButton
        class="mt-2"
        @click="onClose"
      >
        Cancel
      </AppButton>
    </template>
  </ModalWindow>
</template>

<script lang="ts" setup>
import ModalWindow from './ModalWindow.vue';
import CreateReminder from './CreateReminder.vue';
import AppButton from './AppButton.vue';
import { Plus } from '@lucide/vue';

</script>