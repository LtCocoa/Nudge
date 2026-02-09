import { mount } from '@vue/test-utils';
import { suite, test } from 'vitest';
import CreateTask from '../components/CreateTask.vue';
import { createTestingPinia } from '@pinia/testing';
import { useAppStore } from '../stores/Store';
import { Task } from '../data/Task';

const wrapper = mount(CreateTask, {
  global: {
    plugins: [createTestingPinia()],
  }
});

vi.mock('uuid', () => ({ v4: () => '00000000-0000-0000-0000-000000000000' }));

const store = useAppStore();

suite('Component works', () => {
  test('Component emits `Created` event', async () => {
    await wrapper.find('button').trigger('click');
    expect(wrapper.emitted()).toHaveProperty('created');
  });

  test('Adding a task with empty fields creates an empty task', async () => {
    await wrapper.find('button').trigger('click');
    expect(store.addTask).toHaveBeenCalledWith(new Task());
  });

  test('Task fields are filling properly', async () => {
    const [
      nameInput,
      descriptionInput,
      scheduleInput,
      button,
    ] = [
      wrapper.find('#task-name'),
      wrapper.find('#task-description'),
      wrapper.find('#task-schedule'),
      wrapper.find('button'),
    ];

    const expectedTask = new Task({
      name: 'Test task',
      description: 'Test description',
      date: '2017-06-01T08:30',
    });

    await nameInput.setValue(expectedTask.name);
    await descriptionInput.setValue(expectedTask.description);
    await scheduleInput.setValue('2017-06-01T08:30');
    await button.trigger('click');

    expect(store.addTask).toHaveBeenCalledWith(expectedTask);
  });
});
