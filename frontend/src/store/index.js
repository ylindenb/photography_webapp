import { createStore } from "vuex";
import { auth } from "./auth.module";
import { errorHandling } from "./error.module";
import { imagesStore } from "./images.module";
import { orderStore } from "./order.module";

const store = createStore({
  modules: {
    auth,
    errorHandling,
    imagesStore,
    orderStore,
  },
});

export default store;
