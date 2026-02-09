import { mount } from "@vue/test-utils";
import { suite, expect, test } from "vitest";
import ListView from "../views/ListView.vue";
import { createTestingPinia } from '@pinia/testing';
import CreateTask from "../components/CreateTask.vue";

const wrapper = mount(ListView, {
  global: {
    stubs: {
      teleport: true,
    },
    plugins: [createTestingPinia()],
  }
});

suite('Task list', () => {
  test('Add task modal inputs are empty when opened', async () => {
    const openButton = wrapper.find('#open-button');

    await openButton.trigger('click');

    const [
      nameInput,
      descriptionInput,
      scheduleInput,
      recurrencyInput,
    ] = [
      wrapper.find('#task-name'),
      wrapper.find('#task-description'),
      wrapper.find('#task-schedule'),
      wrapper.find('#task-recurrency'),
    ];

    expect(nameInput.element.value).toBe('');
    expect(descriptionInput.element.value).toBe('');
    expect(scheduleInput.element.value).toBe('');
    expect(recurrencyInput.element.checked).toBe(false);
  });

  test('Closing add task modal resets inputs', async () => {
    const openButton = wrapper.find('#open-button');

    await openButton.trigger('click');

    let createTask = wrapper.getComponent(CreateTask);
    const closeButton = wrapper.find('#close-button');

    let [
      nameInput,
      descriptionInput,
      scheduleInput,
    ] = [
      createTask.find('#task-name'),
      createTask.find('#task-description'),
      createTask.find('#task-schedule'),
    ];

    await nameInput.setValue('Task name');
    await descriptionInput.setValue('Task description');
    await scheduleInput.setValue('2017-06-01T08:30');
    await closeButton.trigger('click');
    await openButton.trigger('click');

    createTask = wrapper.findComponent(CreateTask);
    [
      nameInput,
      descriptionInput,
      scheduleInput,
    ] = [
      createTask.find('#task-name'),
      createTask.find('#task-description'),
      createTask.find('#task-schedule'),
    ];

    expect(nameInput.element.value).toBe('');
    expect(descriptionInput.element.value).toBe('');
    expect(scheduleInput.element.value).toBe('');
  });
});