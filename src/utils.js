import { useAppStore } from "./stores/Store";
import { storeToRefs } from "pinia";

export const saveUserProfiles = (profiles) => {
  return window.filesystem.saveFile(JSON.stringify({ profiles }));
}

export const getUserProfiles = () => {
  return window.filesystem.readFile();
}

export const initAppData = () => {
  return {
    profiles: [],
    currentProfile: null,
  }
}
