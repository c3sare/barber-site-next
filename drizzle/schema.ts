import { pgTable, uniqueIndex, pgEnum, primaryKey } from "drizzle-orm/pg-core";
import { relations, sql } from "drizzle-orm";
import { createId } from "@paralleldrive/cuid2";
import type { AdapterAccount } from "next-auth/adapters";

export const userRole = pgEnum("user_role", ["USER", "ADMIN"]);
export const fileType = pgEnum("file_type", ["VIDEO", "AUDIO", "IMAGE"]);
export const footerComponentEnum = pgEnum("footer_component_enum", [
  "HERO_BOX",
  "LINK_BOX",
  "PHOTO_GALLERY",
]);

export const menuVariant = pgEnum("menu_variant", ["HEADER"]);

export const twoFactorConfirmation = pgTable(
  "two_factor_confirmation",
  (t) => ({
    id: t.serial("id").primaryKey(),
    userId: t
      .text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade", onUpdate: "cascade" }),
  }),
  (t) => [uniqueIndex("two_factor_confirmation_userid_key").on(t.userId)]
);

export const twoFactorConfirmationRelations = relations(
  twoFactorConfirmation,
  ({ one }) => ({
    user: one(user, {
      fields: [twoFactorConfirmation.userId],
      references: [user.id],
    }),
  })
);

export const verificationToken = pgTable(
  "verificationToken",
  (t) => ({
    identifier: t.text("identifier").notNull(),
    token: t.text("token").notNull(),
    expires: t.timestamp("expires", { mode: "date" }).notNull(),
  }),
  (vt) => [primaryKey({ columns: [vt.identifier, vt.token] })]
);

export const file = pgTable("file", (t) => ({
  id: t.text("id").primaryKey().notNull(),
  name: t.text("name").notNull(),
  type: fileType("type").notNull(),
  width: t.integer("width").notNull(),
  height: t.integer("height").notNull(),
  uploadedAt: t
    .timestamp("uploaded_at", { mode: "date" })
    .notNull()
    .default(sql`now()`),
  blurDataUrl: t.text("blur_data_url").notNull(),
  url: t.text("url").notNull(),
  desc: t.text("desc").notNull(),
  userId: t
    .text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "restrict", onUpdate: "cascade" }),
}));

export const fileRelations = relations(file, ({ one }) => ({
  author: one(user, { fields: [file.userId], references: [user.id] }),
}));

export const passwordResetToken = pgTable(
  "password_reset_token",
  (t) => ({
    id: t.serial("id").primaryKey(),
    email: t.text("email").notNull(),
    token: t.text("token").notNull(),
    expires: t
      .timestamp("expires", { mode: "date" })
      .notNull()
      .default(sql`now()`),
  }),
  (t) => [
    uniqueIndex("password_reset_token_key").on(t.token),
    uniqueIndex("password_reset_email_token_key").on(t.email, t.token),
  ]
);

export const twoFactorToken = pgTable(
  "two_factor_token",
  (t) => ({
    id: t.serial("id").primaryKey(),
    email: t.text("email").notNull(),
    token: t.text("token").notNull(),
    expires: t.timestamp("expires", { mode: "date" }).notNull(),
  }),
  (t) => [
    uniqueIndex("two_factor_token_key").on(t.token),
    uniqueIndex("two_factor_email_token_key").on(t.email, t.token),
  ]
);

export const menuItem = pgTable("menu_item", (t) => ({
  id: t.serial("id").primaryKey(),
  pageId: t.integer("page_id").references(() => page.id, {
    onDelete: "cascade",
    onUpdate: "cascade",
  }),
  menuId: t
    .integer("menu_id")
    .notNull()
    .references(() => menu.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  url: t.text("url"),
  name: t.text("name").notNull(),
  createdAt: t
    .timestamp("created_at", { mode: "date" })
    .notNull()
    .default(sql`now()`),
  updatedAt: t
    .timestamp("updated_at", { mode: "date" })
    .notNull()
    .default(sql`now()`),
  creatorId: t.text("creator_id").references(() => user.id, {
    onDelete: "set null",
    onUpdate: "cascade",
  }),
  order: t.integer("order").notNull(),
}));

export const menuItemRelations = relations(menuItem, ({ one }) => ({
  creator: one(user, { fields: [menuItem.creatorId], references: [user.id] }),
  menu: one(menu, { fields: [menuItem.menuId], references: [menu.id] }),
  page: one(page, { fields: [menuItem.pageId], references: [page.id] }),
}));

export const footerComponent = pgTable("footer_component", (t) => ({
  id: t.serial("id").primaryKey(),
  component: footerComponentEnum("component").notNull(),
  data: t.jsonb("data").notNull(),
  imageIds: t
    .text("image_ids")
    .array()
    .default(sql`ARRAY[]::text[]`)
    .notNull(),
}));

export const user = pgTable("user", (t) => ({
  id: t
    .text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  name: t.text("name"),
  email: t.text("email").notNull(),
  emailVerified: t.timestamp("emailVerified", { mode: "date" }),
  verifyPasscode: t.text("verify_passcode"),
  passcodeCreatedAt: t.timestamp("passcode_created_at", { mode: "date" }),
  changePasswordToken: t.text("change_password_token"),
  image: t.text("image"),
  password: t.text("password"),
  role: userRole("role").default("USER").notNull(),
  isTwoFactorEnabled: t
    .boolean("is_two_factor_enabled")
    .default(false)
    .notNull(),
  phone: t.text("phone"),
  createdAt: t
    .timestamp("created_at", { mode: "date" })
    .notNull()
    .default(sql`now()`),
  updatedAt: t
    .timestamp("updated_at", { mode: "date" })
    .notNull()
    .default(sql`now()`),
}));

export const userRelations = relations(user, ({ many }) => ({
  accounts: many(account),
}));

export const pageVariants = pgEnum("page_variants", ["HOME"]);

export const page = pgTable(
  "page",
  (t) => ({
    id: t.serial("id").primaryKey(),
    name: t.text("name").notNull(),
    slug: t.text("slug").notNull(),
    data: t.text("data"),
    creatorId: t.text("creator_id").references(() => user.id, {
      onDelete: "set null",
      onUpdate: "cascade",
    }),
    createdAt: t
      .timestamp("created_at", { mode: "date" })
      .notNull()
      .default(sql`now()`),
    updatedAt: t
      .timestamp("updated_at", { mode: "date" })
      .notNull()
      .default(sql`now()`),
    imageIds: t
      .text("image_ids")
      .array()
      .default(sql`ARRAY[]::text[]`)
      .notNull(),
    pageVariant: pageVariants("page_variant"),
  }),
  (t) => [uniqueIndex("page_slug_key").on(t.slug)]
);

export const pageRelations = relations(page, ({ one }) => ({
  creator: one(user, { fields: [page.creatorId], references: [user.id] }),
}));

export const sessions = pgTable("session", (t) => ({
  sessionToken: t.text("sessionToken").primaryKey(),
  userId: t
    .text("userId")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  expires: t.timestamp("expires", { mode: "date" }).notNull(),
}));

export const account = pgTable(
  "account",
  (t) => ({
    userId: t
      .text("userId")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    type: t.text("type").$type<AdapterAccount["type"]>().notNull(),
    provider: t.text("provider").notNull(),
    providerAccountId: t.text("providerAccountId").notNull(),
    refresh_token: t.text("refresh_token"),
    access_token: t.text("access_token"),
    expires_at: t.integer("expires_at"),
    token_type: t.text("token_type"),
    scope: t.text("scope"),
    id_token: t.text("id_token"),
    session_state: t.text("session_state"),
  }),
  (t) => [
    primaryKey({
      columns: [t.provider, t.providerAccountId],
    }),
  ]
);

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, { fields: [account.userId], references: [user.id] }),
}));

export const menu = pgTable("menu", (t) => ({
  id: t.serial("id").primaryKey(),
  title: t.text("title").notNull(),
  createdAt: t
    .timestamp("created_at", { mode: "date" })
    .notNull()
    .default(sql`now()`),
  updatedAt: t
    .timestamp("updated_at", { mode: "date" })
    .notNull()
    .default(sql`now()`),
  creatorId: t.text("creator_id").references(() => user.id, {
    onDelete: "set null",
    onUpdate: "cascade",
  }),
  usedBy: menuVariant("used_by"),
}));

export const menuRelations = relations(menu, ({ many }) => ({
  items: many(menuItem),
}));
