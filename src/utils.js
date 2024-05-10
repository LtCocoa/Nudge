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

export const showNotification = (params = { title: 'Default title', body: 'default body' }, onclick = null) => {
  new window.Notification(params.title, { body: params.body }).onclick = onclick;
}
