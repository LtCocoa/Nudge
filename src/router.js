import { createRouter, createMemoryHistory } from 'vue-router';
import ProfileList from './components/ProfileList.vue';
import CreateProfile from './components/CreateProfile.vue';
import ProfileCard from './components/ProfileCard.vue';


const routes = [
  {
    path: '/',
    name: 'profiles',
    component: ProfileList
  },
  {
    path: '/create-profile',
    name: 'create-profile',
    component: CreateProfile
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfileCard,
  }
];

export const router = createRouter({
  history: createMemoryHistory(),
  routes,
});
