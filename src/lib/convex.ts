import { ConvexReactClient } from "convex/react";

// Initialize Convex client
// For local development, this will connect to a local Convex backend
// In production, set VITE_CONVEX_URL environment variable
export const convexClient = new ConvexReactClient(
  import.meta.env.VITE_CONVEX_URL || "http://localhost:3210"
);
