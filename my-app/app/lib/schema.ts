import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export interface Article {
    id: number;
    title: string;
    content: string;
    imageUrl: string | null;
    createdAt: Date; // Date型
    updatedAt: Date; // Date型
}

export const ArticleTable = sqliteTable('articles', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    title: text('title').notNull(),
    content: text('content').notNull(),
    imageUrl: text('image_url'),
    createdAt: text('created_at').notNull(),
    updatedAt: text('updated_at').notNull(),
});
