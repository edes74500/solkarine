import allowedOrigins from "./allowedOrigins.config";

const corsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Invalid origin"), false);
    }
  },
  exposedHeaders: ["Ratelimit-Limit", "Ratelimit-Remaining", "Ratelimit-Reset"], // En-têtes exposés
  methods: "GET, POST, PUT, DELETE, PATCH",
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various versions of Android) choke on 204
};

export default corsOptions;
