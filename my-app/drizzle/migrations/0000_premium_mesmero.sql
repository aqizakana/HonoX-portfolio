CREATE TABLE `articles` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`content` text NOT NULL,
	`image_url` text,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
