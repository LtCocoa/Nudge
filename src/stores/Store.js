import { defineStore } from "pinia";
import {
  readAppDataFile,
  saveAppData,
  showNotification,
  scrollElementIntoView,
  scheduleTask
} from "../utils";


export const useAppStore = defineStore('app', {
  state: () => ({
    profiles: [],
    currentProfile: null,
  }),
  actions: {
    async getAppData() {
      const { profiles, currentProfile } = await readAppDataFile();
      this.profiles = profiles;
      this.currentProfile = currentProfile;
    },
    async createNewProfile(newUserProfile) {
      this.profiles = [...this.profiles, newUserProfile];
      saveAppData({ profiles: this.profiles, currentProfile: this.currentProfile });
    },
    async setCurrentProfile(profileUuid) {
      
      this.currentProfile = this.profiles.find(profile => profile.uuid == profileUuid);
    },
    async deleteProfile(profileUuid) {
      this.profiles = this.profiles.filter(({ uuid }) => uuid != profileUuid);
      saveAppData({ profiles: this.profiles, currentProfile: this.currentProfile });
    },
    addTask(task) {
      this.currentProfile.tasks.push(task);

      // TODO: возможно стоит перенести в электрон
      showNotification(
        {
          title: `Created new task: ${task.name}`,
          body: task.description
        },
        () => scrollElementIntoView(task.uuid)
      );

      if (task.date) {
        scheduleTask(task);
      }

      saveAppData({ profiles: this.profiles, currentProfile: this.currentProfile });
    }
  }
});
