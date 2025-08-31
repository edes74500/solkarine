import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { apiSlice } from "./config/apiSlice";

const CDN_URL = process.env.NEXT_PUBLIC_CDN_URL || "cdn.solkarine.fr";

export const postsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // generatePresignedUrl: builder.mutation<{ url: string }, { imageFolder: string; imageName: string }>({
    //   query: ({ imageFolder, imageName }) => ({
    //     url: "/cdn/generate-presigned-url",
    //     method: "POST",
    //     body: { imageFolder, imageName },
    //     // headers: {
    //     //   "Content-Type": "application/json",
    //     //   authorization: `Bearer ${localStorage.getItem("accessToken") || ""}`,
    //     // },
    //   }),
    // }),

    // uploadImageToPresignedUrl: builder.mutation<string, { file: File; presignedUrl: string }>({
    //   async queryFn({ file, presignedUrl }) {
    //     try {
    //       // Upload file to the presigned URL
    //       const response = await fetch(presignedUrl, {
    //         method: "PUT",
    //         body: file,
    //         headers: {
    //           "Content-Type": file.type,
    //         },
    //       });

    //       if (!response.ok) {
    //         return {
    //           error: {
    //             status: response.status,
    //             data: `Erreur HTTP: ${response.statusText}`,
    //           } as FetchBaseQueryError,
    //         };
    //       }
    //       // Étape 3 : Construire l'URL publique
    //       const baseUrl = presignedUrl.replace(
    //         "nextanim.a1c984e21a682e4c63eb50270ee07eb4.r2.cloudflarestorage.com",
    //         "cdn.nextanim.fr",
    //       );
    //       const publicUrl = baseUrl.split("?")[0];
    //       console.log("Image uploaded to:", publicUrl);
    //       return { data: publicUrl };
    //     } catch (error) {
    //       return {
    //         error: {
    //           status: "CUSTOM_ERROR",
    //           data: error instanceof Error ? error.message : "Erreur inconnue",
    //         } as FetchBaseQueryError,
    //       };
    //     }
    //   },
    // }),

    uploadImagetoTempR2WithPresignedUrl: builder.mutation<string, { file: File; imageName: string }>({
      async queryFn({ file, imageName }, api, extraOptions, baseQuery) {
        try {
          // Étape 1 : Générer l'URL présignée
          const presignedResponse = await baseQuery({
            url: "/cdn/generate-presigned-url",
            method: "POST",
            // headers: {
            //   "Content-Type": "application/json",
            //   authorization: `Bearer ${localStorage.getItem("accessToken") || ""}`,
            // },
            body: { imageName },
          });

          if (presignedResponse.error) {
            return { error: presignedResponse.error };
          }

          // Assurez-vous que presignedResponse.data contient bien une URL
          const presignedData = presignedResponse.data as { url: string };
          const presignedUrl = presignedData.url;

          if (!presignedUrl) {
            return {
              error: {
                status: "CUSTOM_ERROR",
                data: "Aucune URL présignée reçue",
              } as FetchBaseQueryError,
            };
          }

          console.log("Presigned URL:", presignedUrl);
          console.log("File:", file.name);
          console.log("Image Name:", imageName);
          console.log("File type:", file.type);
          console.log("File size:", file.size);
          // Étape 2 : Uploader l'image
          const uploadResponse = await fetch(presignedUrl, {
            method: "PUT",
            headers: {
              "Content-Type": file.type,
            },
            body: file,
          });

          if (!uploadResponse.ok) {
            return {
              error: {
                status: uploadResponse.status,
                data: `Erreur HTTP: ${uploadResponse.statusText}`,
              } as FetchBaseQueryError,
            };
          }
          // Étape 3 : Construire l'URL publique
          const baseUrl = presignedUrl.replace(
            "solkarine.a1c984e21a682e4c63eb50270ee07eb4.r2.cloudflarestorage.com",
            // "https://a1c984e21a682e4c63eb50270ee07eb4.r2.cloudflarestorage.com",
            CDN_URL as string,
          );
          const publicUrl = baseUrl.split("?")[0];
          console.log(uploadResponse);
          console.log("Image uploaded to:", publicUrl);
          // const publicUrl = uploadResponse.url;
          return { data: publicUrl };
        } catch (error) {
          return {
            error: {
              status: "CUSTOM_ERROR",
              data: error instanceof Error ? error.message : "Erreur inconnue",
            } as FetchBaseQueryError,
          };
        }
      },
    }),
  }),
});

export const {
  useUploadImagetoTempR2WithPresignedUrlMutation,
  // useGeneratePresignedUrlMutation,
  // useUploadImageToPresignedUrlMutation,
} = postsApiSlice;
