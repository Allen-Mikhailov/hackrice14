// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

import { config } from "dotenv";
if (process.env.NODE_ENV !== "production") config();

export const app = initializeApp();
export const auth = getAuth(app);
