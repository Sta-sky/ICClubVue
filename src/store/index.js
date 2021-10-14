import { createStore } from "vuex";
import active from './modules/active'

const debug = process.env.NODE_ENV !== 'production'

export default createStore({
    modules: {
        active,
    },
    strict: debug,
  })