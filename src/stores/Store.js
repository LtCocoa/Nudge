import { defineStore } from "pinia";
import { getUserProfiles, saveUserProfiles } from "../utils";


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
      await saveUserProfiles([...this.profiles, newUserProfile]);
      return this.getProfiles();
    },
    setCurrentProfile(profileUuid) {
      this.currentProfile = this.profiles.find(profile => profile.uuid == profileUuid);
    },
    async deleteProfile(profileUuid) {
      const profiles = this.profiles.filter(({ uuid }) => uuid != profileUuid);
      await saveUserProfiles(profiles);
      this.getProfiles();
    }
  }
});
