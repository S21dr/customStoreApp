// import {Store} from "../common/store/store";
// import {Registry} from "../common/store/registry";
//
// export const ADD_REGISTERED_USER = "ADD_REGISTERED_USER";
//
// const AuthorizationStore = new Store("authorization", {
//     data: {},
//     options: {
//         shouldInitFromState: true,
//         stateKey: "authorization",
//     },
//     reducers: [
//         {
//             type: ADD_REGISTERED_USER,
//             action(state, payload) {
//                 const {user} = payload;
//
//                 const registeredUsers = [...state.registeredUsers, user];
//                 return {
//                     ...state,
//                     registeredUsers,
//                 };
//             },
//         },
//     ],
// });
//
//
// Registry.addStore(AuthorizationStore);
//
// export {AuthorizationStore}
//
