<template>
  <div class="calendar-container">
    <div class="header">
      <span>{{ `${months[date.getMonth()]} ${date.getFullYear()}` }}</span>

      <div class="controls">
        <button
          type="button"
          @click="onClick(-1)"
        >
          <
        </button>
        <button
          type="button"
          @click="onClick(1)"
        >
          >
        </button>
      </div>
    </div>

    <ul class="calendar">
      <li
        v-for="(day, index) in days"
        :key="index"
        class="calendar-day"
      >
        {{ day.shortName }}
      </li>
      <li
        v-for="(calendarDate, index) in calendarDates"
        :key="index"
        :class="{
          'calendar-date': true,
          'disabled': calendarDate.getMonth() != date.getMonth()
        }"
        @click="onDateClick(calendarDate)"
      >
        {{ calendarDate.getDate() }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { fillMonth, days, months } from '../utils';

const date = ref(new Date());

const calendarDates = computed(() => {
  return fillMonth(date.value.getFullYear(), date.value.getMonth());
});

const onClick = (val: number) => {
  date.value = new Date(date.value.setMonth(date.value.getMonth() + val));
}

const onDateClick = (calendarDate: Date) => {
  console.log(calendarDate);
}
</script>

<style scoped>
  .calendar-container {
    width: 250px;
  }

  .calendar {
    display: grid;
    grid-template-columns: auto auto auto auto auto auto auto;
    grid-gap: 5px;
  }

  .calendar-day {
    cursor: default;
  }

  .calendar-date {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }

  .calendar-date:hover {
    background-color: rgb(20, 149, 255);
  }

  .header {
    display: flex;
    justify-content: space-between;
  }

  .disabled {
    color: rgb(175, 175, 175);
  }
</style>