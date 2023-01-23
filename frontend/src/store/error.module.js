export const errorHandling = {
  namespaced: true,
  state: {
    isError: false,
    error: {},
    errorMessage: "",
  },
  actions: {
    setError(context, errorMessage) {
      context.commit('setError', errorMessage);
    },
    clearError(context) {
      context.commit('clearError');
    },
  },
  mutations: {
    setError(state, error) {
      state.error = error,
      state.errorMessage = error.message;
      state.isError = true;
    },
    clearError(state) {
      state.error = {},
      state.errorMessage = "";
      state.isError = false;
    },
  },
  getters: {
    getErrorMessage (state) {
      return state.errorMessage;
    },
    isError (state) {
      return state.isError;
    },
    getError (state) {
      return state.error;
    }
  }
};
