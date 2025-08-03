import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

export const dbConnexion = {
  mongoURI: process.env.MONGO_URI,
  mongoOptions: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },

  connect: async (): Promise<void> => {
    try {
      if (!dbConnexion.mongoURI) {
        throw new Error("URI de connexion MongoDB non définie");
      }

      await mongoose.connect(dbConnexion.mongoURI);
      console.info(`🍃 Connexion à MongoDB établie avec succès sur la base de données ${mongoose.connection.name}`);
    } catch (error) {
      console.error("❌ Erreur de connexion à MongoDB:", error);
      process.exit(1);
    }
  },

  disconnect: async (): Promise<void> => {
    try {
      await mongoose.disconnect();
      console.log("🔌 Déconnexion de MongoDB réussie");
    } catch (error) {
      console.error("❌ Erreur lors de la déconnexion de MongoDB:", error);
    }
  },
};
