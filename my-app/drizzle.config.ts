import { defineConfig } from "drizzle-kit";
import { config } from 'dotenv';
config({ path: './dev.vars' });

// Access the environment variable

export default defineConfig({
    schema: './app/lib/schema.ts',
    out: './drizzle/migrations',
    dialect: 'sqlite',
    driver: 'd1-http',
    dbCredentials: {
        accountId: process.env.ACCOUNT_ID!,
        databaseId: process.env.DATABASE_ID!,
        token: process.env.API_KEY!
    },
    migrations: {
        table: "custom_migrations_table",
        schema: "public"
    }
});