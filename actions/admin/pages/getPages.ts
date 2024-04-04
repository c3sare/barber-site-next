import { db } from "@/lib/db";

export async function getPages() {
    const pages = await db.page.findMany({});

    return pages;
}