import { defineStore } from "pinia";
import {
  getUserProfiles,
  saveUserProfiles,
  showNotification,
  scrollElementIntoView
} from "../utils";


export const useAppStore = defineStore('app', {
  state: () => ({
    profiles: [],
    currentProfile: null,
  }),
  actions: {
    async getProfiles() {
      const { profiles } = await getUserProfiles();
      this.profiles = profiles;
    },
    async createNewProfile(newUserProfile) {
      this.profiles = [...this.profiles, newUserProfile];
      saveUserProfiles(this.profiles);
    },
    setCurrentProfile(profileUuid) {
      this.currentProfile = this.profiles.find(profile => profile.uuid == profileUuid);
    },
    async deleteProfile(profileUuid) {
      this.profiles = this.profiles.filter(({ uuid }) => uuid != profileUuid);
      saveUserProfiles(this.profiles);
    },
    addTask(task) {
      this.currentProfile.tasks.push(task);
      showNotification(
        {
          title: `Created new task: ${task.name}`,
          body: task.description
        },
        () => scrollElementIntoView(task.uuid)
      );
      saveUserProfiles(this.profiles);
    }
  }
});
