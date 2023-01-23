import axios from 'axios';

export const orderStore = {
  namespaced: true,
  state: {
    order: {},
    orders: [],
  },
  actions: {
    fetchOrders(context) {
      return axios
        .get(import.meta.env.VITE_API_URL + '/orders')
        .then(res => {
          context.commit('setOrders', res.data.orders)
        });
    },
    fetchOrdersOfUser(context, userId) {
      return axios
        .get(import.meta.env.VITE_API_URL + '/orders/' +  userId)
        .then(res => {
          context.commit('setOrders', res.data.orders)
        });
    },
    fetchOpenOrder(context, userId) {
      if (userId === undefined) {
        return;
      }
      console.log("fetchOpenOrder");
      return axios
        .get(import.meta.env.VITE_API_URL + '/order', { params: { userId: userId } })
        .then(res => {
          context.commit('setOrder', res.data.order)
        })
        .catch((error) => {
        })
    },
    updateOrder(context, order) {
      console.log("updateOrder")
      return axios
      .put(import.meta.env.VITE_API_URL + '/orders', order)
      .then(res => {
        context.commit('setOrder', res.data.order)
      });
    },
    sendOrder(context, order) {
      console.log("sendOrder")
      return axios
      .put(import.meta.env.VITE_API_URL + '/orders', order)
      .then(res => {
        context.commit('clearOrder')
      });
    },
    createOrder(context, userProductObj) {
      console.log("createOrder")
      let order = {
        products: userProductObj.products,
        user: userProductObj.userId,
        status: "Open",
      }
      return axios
      .post(import.meta.env.VITE_API_URL + '/orders/', order)
      .then(res => {
        context.commit('setOrder', res.data.order)
      });
    },
    clearOrder(context) {
      console.log("Test");
      context.commit('clearOrder');
    },
  },
  mutations: {
    setOrder(state, order) {
      console.log("Test4");
      state.order = order;
    },
    clearOrder(state) {
      console.log("Test3");
      state.order = {}
    },
    setOrders(state, orders) {
      state.orders = orders;
    },
  },
};
