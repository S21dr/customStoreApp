import { Store } from "../common/store/store";
import { Registry } from "../common/store/registry";

export const ADD_PRODUCT = "ADD_PRODUCT";
export const REMOVE_PRODUCT = "REMOVE_PRODUCT";

const ProductsStore = new Store("products", {
  data: {
    products: [],
  },
  options: {
    shouldInitFromState: true,
    stateKey: "products",
  },
  reducers: [
    {
      type: ADD_PRODUCT,
      action(state, payload) {
        const { product } = payload;

        const products = [...state.products, product];
        return {
          ...state,
          products,
        };
      },
    },
    {
      type: REMOVE_PRODUCT,
      action(state, payload) {
        const { id } = payload;

        const products = [...state.products];

        const index = products.findIndex((product) => product.id === id);

        if (index !== -1) {
          products.splice(index, 1);
        }

        return {
          ...state,
          products,
        };
      },
    },
  ],
});

export const ADD_REGISTERED_USER = "ADD_REGISTERED_USER";
export const LOGIN_USER = "LOGIN_USER";
export const LOGOUT = "LOGOUT";

const AuthorizationStore = new Store("authorization", {
  data: {},
  options: {
    shouldInitFromState: true,
    stateKey: "authorization",
  },
  reducers: [
    {
      type: ADD_REGISTERED_USER,
      action(state, payload) {
        const {user} = payload;

        const registeredUsers = [...state.registeredUsers, user];
        return {
          ...state,
          registeredUsers,
        };
      },
    },
    {
      type: LOGIN_USER,
      action(state, payload) {
        const authorizedUser = payload;
        return {
          ...state,
          authorizedUser,
        };
      },
    },
    {
      type: LOGOUT,
      action(state) {
        const authorizedUser = '';
        return {
          ...state,
          authorizedUser,
        };
      },
    },
  ],
});


Registry.addStore(AuthorizationStore);


Registry.addStore(ProductsStore);

export { ProductsStore };
