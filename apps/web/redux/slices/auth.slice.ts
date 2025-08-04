// import { createSlice } from "@reduxjs/toolkit";
// import { JwtAccessTokenPayload, RoleEnum, UserClient } from "@repo/types";
// import { jwtDecode } from "jwt-decode"; // Importez jwt-decode
// import { RootState } from "../store";

// interface AuthState {
//   user: UserClient | null; // Typage selon votre modèle utilisateur
//   accessToken: string | null;
//   roles: RoleEnum[]; // Liste des rôles extraits du token
//   isPremium: boolean; // État premium
//   isAppLoading: boolean; // On commence avec l'app en état de chargement
// }

// const initialState: AuthState = {
//   isAppLoading: true, // On commence avec l'app en état de chargement
//   user: null,
//   accessToken: null,
//   roles: [], // Ajout des rôles
//   isPremium: false, // Ajout de l'état premium
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     setCredentials: (state, action) => {
//       const { user, accessToken } = action.payload;
//       state.user = user;
//       state.accessToken = accessToken;

//       // Décodage du token pour extraire les rôles
//       if (accessToken) {
//         try {
//           const decoded: JwtAccessTokenPayload = jwtDecode(accessToken);
//           // console.log("🚀 ~ setCredentials ~ accessToken:", decoded);
//           state.roles = decoded.roles || []; // Assurez-vous que les rôles sont présents dans le token
//           state.isPremium = decoded.isPremium || false; // Extraire l'état premium
//           state.isAppLoading = false;
//           // if (state.user) {
//           //   state.user.notifyNewConversation = decoded.notifyNewConversation || false;
//           //   state.user.notifyNewSavedSearch = decoded.notifyNewSavedSearch || false;
//           // }
//         } catch (error) {
//           console.error("Token invalide :", error);
//           state.roles = [];
//         }
//       }
//     },
//     setAccesToken: (state, action) => {
//       state.accessToken = action.payload;
//       try {
//         const decoded: JwtAccessTokenPayload = jwtDecode(action.payload);
//         state.roles = decoded.roles || []; // Assurez-vous que les rôles sont présents dans le token
//         state.isPremium = decoded.isPremium || false; // Extraire l'état premium
//       } catch (error) {
//         console.error("Token invalide :", error);
//         state.roles = [];
//       }
//     },
//     setAppLoading: (state, action) => {
//       state.isAppLoading = action.payload;
//     },
//     setRoles: (state, action) => {
//       state.roles = action.payload; // Définir les rôles
//     },
//     removeRole: (state, action) => {
//       state.roles = state.roles.filter((role) => role !== action.payload); // Supprimer un rôle
//     },
//     addRole: (state, action) => {
//       state.roles.push(action.payload); // Ajouter un rôle
//     },
//     logOut: (state) => {
//       state.user = null;
//       state.accessToken = null;
//       state.roles = []; // Réinitialiser les rôles
//       state.isPremium = false; // Réinitialiser l'état premium
//     },
//   },
// });

// export const { setCredentials, setAccesToken, logOut, setAppLoading } = authSlice.actions;

// export default authSlice.reducer;

// // Selectors
// export const selectIsAppLoading = (state: RootState) => state.auth.isAppLoading;
// export const selectCurrentUser = (state: RootState) => state.auth.user;
// export const selectCurrentAccessToken = (state: RootState) => state.auth.accessToken;
// export const selectCurrentRoles = (state: RootState) => state.auth.roles; // Nouveau sélecteur
