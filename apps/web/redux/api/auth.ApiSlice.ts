// import { apiSlice } from "./config/apiSlice";

// export const authApiSlice = apiSlice.injectEndpoints({
//   endpoints: (builder) => ({
//     login: builder.mutation<{ user: UserClient; accessToken: string }, { email: string; password: string }>({
//       query: (credentials) => ({
//         url: "auth/login",
//         method: "POST",
//         body: credentials,
//       }),
//       async onQueryStarted(arg, { dispatch, queryFulfilled }) {
//         try {
//           const result = await queryFulfilled;

//           // Store user data in localStorage
//           const userData = {
//             email: result.data.user.email,
//             avatar: result.data.user.avatar,
//             isFacebookUser: result.data.user.isFacebookUser,
//             isGoogleUser: result.data.user.isGoogleUser,
//           };
//           localStorage.setItem("userData", JSON.stringify(userData));

//           dispatch(setCredentials(result.data));
//         } catch (error) {
//           console.log("Error during queryFulfilled:", error);
//         }
//       },
//     }),
//     createAccount: builder.mutation<void, UserCreateAccountDto>({
//       query: (data) => {
//         // Console log des données avant de les envoyer
//         console.log("Payload envoyé à la mutation :", data);

//         return {
//           url: "auth/create-account",
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: data,
//         };
//       },
//     }),
//     verifyUserEmail: builder.mutation<void, string>({
//       query: (token) => ({
//         url: `auth/verify-email/${token}`,
//         method: "POST",
//       }),
//     }),

//     refreshTokens: builder.mutation<{ user: UserClient; accessToken: string }, void>({
//       query: () => ({
//         url: "auth/refresh-token",
//         method: "POST",
//       }),
//       async onQueryStarted(arg, { dispatch, queryFulfilled }) {
//         // console.log("Starting refresh tokens");
//         try {
//           // console.log("Login arguments:", arg);
//           const result = await queryFulfilled;
//           // console.log("Query fulfilled:", result);
//           const userData = {
//             email: result.data.user.email,
//             avatar: result.data.user.avatar,
//             isFacebookUser: result.data.user.isFacebookUser,
//             isGoogleUser: result.data.user.isGoogleUser,
//           };
//           localStorage.setItem("userData", JSON.stringify(userData));
//           // Dispatch des actions Redux
//           dispatch(setCredentials(result.data));
//         } catch (error) {
//           console.log("Error during queryFulfilled:", error);
//         } finally {
//           dispatch(setAppLoading(false));
//           // console.log("Finally block");
//         }
//       },
//     }),
//     logOut: builder.mutation<void, void>({
//       query: () => ({
//         url: "auth/logout",
//         method: "POST",
//       }),
//       async onQueryStarted(arg, { dispatch, queryFulfilled }) {
//         console.log("Starting logout");
//         try {
//           await new Promise((resolve) => setTimeout(resolve, 300));
//           console.log("Logout fulfilled");
//         } catch (error) {
//           console.log("Error during logout:", error);
//         } finally {
//           dispatch(logOut());
//           dispatch(apiSlice.util.resetApiState());
//         }
//       },
//     }),
//     logWithFacebook: builder.query<{ user: UserClient; accessToken: string }, void>({
//       query: () => ({
//         url: "auth/facebook",
//         method: "GET",
//         credentials: "include",
//       }),
//     }),

//     isMailUnique: builder.mutation<{ isUnique: boolean }, { email: string }>({
//       query: ({ email }) => ({
//         url: `auth/unique-email`,
//         method: "POST",
//         body: { email },
//       }),
//     }),

//     resetPasswordWithToken: builder.mutation<void, { token: string; newPassword: string }>({
//       query: (credentials) => ({
//         url: `auth/reset-password/${credentials.token}`,
//         method: "POST",
//         body: credentials,
//       }),
//     }),
//     resetPassword: builder.mutation<void, { email: string }>({
//       query: (credentials) => ({
//         url: "auth/reset-password",
//         method: "POST",
//         body: credentials,
//       }),
//     }),
//     sendNewActivationLink: builder.mutation<void, { email: string }>({
//       query: (credentials) => ({
//         url: "auth/send-new-activation-link",
//         method: "POST",
//         body: credentials,
//       }),
//     }),
//   }),
// });

// export const {
//   useLoginMutation,
//   useVerifyUserEmailMutation,
//   useCreateAccountMutation,
//   useResetPasswordWithTokenMutation,
//   useResetPasswordMutation,
//   useIsMailUniqueMutation,
//   useLogWithFacebookQuery,
//   useLogOutMutation,
//   useSendNewActivationLinkMutation,
//   useRefreshTokensMutation,
// } = authApiSlice;
