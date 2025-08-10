// config/dbConnexion.config.ts
import mongoose from "mongoose";

declare global {
  // évite d'attacher plusieurs listeners en dev
  // eslint-disable-next-line no-var
  var __CMD_MONITOR__: boolean | undefined;
}

export const dbConnexion = {
  connect: async (): Promise<void> => {
    const uri = process.env.MONGO_URI;
    if (!uri) throw new Error("URI de connexion MongoDB non définie");

    // Fusible: en mode test, refuse une DB non '*test*'
    const dbName = new URL(uri).pathname.slice(1).split("?")[0];
    if (process.env.NODE_ENV === "test" && !/test/i.test(dbName)) {
      throw new Error(`Refus: tests connectés à '${dbName}' (pas une DB de test).`);
    }

    await mongoose.connect(uri, { monitorCommands: true } as any);
    console.info(`🍃 Connexion à MongoDB établie avec succès sur la base ${mongoose.connection.name}`);

    // Logger destructif (optionnel, dev only)
    // if (process.env.NODE_ENV !== "production" && !global.__CMD_MONITOR__) {
    //   global.__CMD_MONITOR__ = true;
    //   const client = mongoose.connection.getClient();
    //   client.on("commandStarted", (e: any) => {
    //     if (["drop", "dropDatabase", "delete"].includes(e.commandName)) {
    //       const cmd = e.command || {};
    //       const coll = e.commandName === "delete" ? cmd.delete : e.commandName === "drop" ? cmd.drop : "(db)";
    //       const filter = cmd.deletes?.[0]?.q;
    //       console.warn("⚠️ Destructive op:", { name: e.commandName, db: e.databaseName, coll, filter });
    //     }
    //   });
    // }
  },

  disconnect: async (): Promise<void> => {
    await mongoose.disconnect();
    console.log("🔌 Déconnexion de MongoDB réussie");
  },
};
