import { createSlice } from "@reduxjs/toolkit";
import { JwtAccessTokenPayload } from "@repo/types";
import { jwtDecode } from "jwt-decode"; // Importez jwt-decode
import { RootState } from "../store";

interface AuthState {
  user: {
    userId: string;
    username: string;
  } | null; // Typage selon votre modèle utilisateur
  accessToken: string | null;
  roles: string[]; // Liste des rôles extraits du token
  isAppLoading: boolean; // On commence avec l'app en état de chargement
}

const initialState: AuthState = {
  isAppLoading: true, // On commence avec l'app en état de chargement
  user: null,
  accessToken: null,
  roles: [], // Ajout des rôles
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { accessToken } = action.payload;
      state.accessToken = accessToken;

      // Décodage du token pour extraire les rôles
      if (accessToken) {
        try {
          const decoded: JwtAccessTokenPayload = jwtDecode(accessToken);
          state.isAppLoading = false;
          state.user = {
            userId: decoded.userId,
            username: decoded.username,
          };
        } catch (error) {
          console.error("Token invalide :", error);
        }
      }
    },

    setAppLoading: (state, action) => {
      state.isAppLoading = action.payload;
    },
    setRoles: (state, action) => {
      state.roles = action.payload; // Définir les rôles
    },
    removeRole: (state, action) => {
      state.roles = state.roles.filter((role) => role !== action.payload); // Supprimer un rôle
    },
    addRole: (state, action) => {
      state.roles.push(action.payload); // Ajouter un rôle
    },
    resetAuth: (state) => {
      state.user = null;
      state.accessToken = null;
      state.roles = []; // Réinitialiser les rôles
    },
  },
});

export const { setCredentials, resetAuth, setAppLoading } = authSlice.actions;

export default authSlice.reducer;

// Selectors
export const selectIsAppLoading = (state: RootState) => state.auth.isAppLoading;
export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectCurrentAccessToken = (state: RootState) => state.auth.accessToken;
export const selectCurrentRoles = (state: RootState) => state.auth.roles; // Nouveau sélecteur
