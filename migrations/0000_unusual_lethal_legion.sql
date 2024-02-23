DROP TABLE "Bookmark";
DROP TABLE "Tab";
DROP TABLE "User";

CREATE TABLE "Bookmark" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tab_id" uuid NOT NULL,
	"url" varchar(256) NOT NULL,
	"title" varchar(64),
	"row" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Tab" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"name" varchar(64) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "User" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" varchar(64) NOT NULL,
	"password" varchar(64) NOT NULL,
	CONSTRAINT "User_email_unique" UNIQUE("email")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Bookmark" ADD CONSTRAINT "Bookmark_tab_id_Tab_id_fk" FOREIGN KEY ("tab_id") REFERENCES "Tab"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Tab" ADD CONSTRAINT "Tab_user_id_User_id_fk" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
