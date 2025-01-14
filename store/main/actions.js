import loaderModes from '~/store/main/loaderModes';

export default {
  setLoading({ commit }, value) {
    commit('setLoading', value);
    commit('setStatusText', '');
    commit('setLoaderMode', loaderModes.default);
    commit('setLoaderProgress', 0);
    commit('setIsLoaderBackgroundHider', false);
  },
  setIsLoaderBackgroundHider({ commit }, value) {
    commit('setIsLoaderBackgroundHider', value);
  },
  setStatusText({ commit }, value) {
    commit('setStatusText', value);
  },
  setLoaderMode({ commit }, value) {
    commit('setLoaderMode', value);
  },
  setLoaderProgress({ commit }, value) {
    commit('setLoaderProgress', value);
  },
  setProjects({ commit }, value) {
    commit('setProjects', value);
  },
  async getApiData({ dispatch }) {
    await dispatch('rate/getRate', null, { root: true });
  },
  showToast(store, value) {
    const errorLabel = value?.response?.data?.msg || 'Server error';
    this._vm.$bvToast.toast(errorLabel, {
      title: 'Error',
      variant: 'warning',
      solid: true,
      toaster: 'b-toaster-bottom-right',
      appendToast: true,
    });
  },
  showInfo(store, value) {
    this._vm.$bvToast.toast(value, {
      title: 'Info',
      variant: 'info',
      solid: true,
      toaster: 'b-toaster-bottom-right',
      appendToast: true,
    });
  },
};
