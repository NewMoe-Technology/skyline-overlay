import { createStore } from 'vuex';
/* mutations */
import { UPDATE_COMBAT_DATA } from './mutations';

export const store = createStore({
  state: {
    combatData: {},
  },
  mutations: {
    [UPDATE_COMBAT_DATA](state, payload) {
      state.combatData = payload;
    },
  },
});