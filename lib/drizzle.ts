import { drizzle } from "drizzle-orm/vercel-postgres";
import { sql } from "@vercel/postgres";
import * as schema from "@/drizzle/schema";

const db = drizzle({ client: sql, schema });
export default db;
