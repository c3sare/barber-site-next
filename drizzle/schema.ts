import {
  pgTable,
  uniqueIndex,
  pgEnum,
  text,
  integer,
  jsonb,
  boolean,
  primaryKey,
  serial,
  timestamp,
} from "drizzle-orm/pg-core";
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
  {
    id: serial("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade", onUpdate: "cascade" }),
  },
  (table) => {
    return {
      userIdKey: uniqueIndex("two_factor_confirmation_userid_key").on(
        table.userId
      ),
    };
  }
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
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  })
);

export const file = pgTable("file", {
  id: text("id").primaryKey().notNull(),
  name: text("name").notNull(),
  type: fileType("type").notNull(),
  width: integer("width").notNull(),
  height: integer("height").notNull(),
  uploadedAt: timestamp("uploaded_at", { mode: "date" })
    .notNull()
    .default(sql`now()`),
  blurDataUrl: text("blur_data_url").notNull(),
  url: text("url").notNull(),
  desc: text("desc").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "restrict", onUpdate: "cascade" }),
});

export const fileRelations = relations(file, ({ one }) => ({
  author: one(user, { fields: [file.userId], references: [user.id] }),
}));

export const passwordResetToken = pgTable(
  "password_reset_token",
  {
    id: serial("id").primaryKey(),
    email: text("email").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" })
      .notNull()
      .default(sql`now()`),
  },
  (table) => {
    return {
      tokenKey: uniqueIndex("password_reset_token_key").on(table.token),
      emailTokenKey: uniqueIndex("password_reset_email_token_key").on(
        table.email,
        table.token
      ),
    };
  }
);

export const twoFactorToken = pgTable(
  "two_factor_token",
  {
    id: serial("id").primaryKey(),
    email: text("email").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (table) => {
    return {
      tokenKey: uniqueIndex("two_factor_token_key").on(table.token),
      emailTokenKey: uniqueIndex("two_factor_email_token_key").on(
        table.email,
        table.token
      ),
    };
  }
);

export const menuItem = pgTable("menu_item", {
  id: serial("id").primaryKey(),
  pageId: integer("page_id").references(() => page.id, {
    onDelete: "cascade",
    onUpdate: "cascade",
  }),
  menuId: integer("menu_id")
    .notNull()
    .references(() => menu.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  url: text("url"),
  name: text("name").notNull(),
  createdAt: timestamp("created_at", { mode: "date" })
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at", { mode: "date" })
    .notNull()
    .default(sql`now()`),
  creatorId: text("creator_id").references(() => user.id, {
    onDelete: "set null",
    onUpdate: "cascade",
  }),
  order: integer("order").notNull(),
});

export const menuItemRelations = relations(menuItem, ({ one }) => ({
  creator: one(user, { fields: [menuItem.creatorId], references: [user.id] }),
  menu: one(menu, { fields: [menuItem.menuId], references: [menu.id] }),
  page: one(page, { fields: [menuItem.pageId], references: [page.id] }),
}));

export const footerComponent = pgTable("footer_component", {
  id: serial("id").primaryKey(),
  component: footerComponentEnum("component").notNull(),
  data: jsonb("data").notNull(),
  imageIds: text("image_ids")
    .array()
    .default(sql`ARRAY[]::text[]`)
    .notNull(),
});

export const user = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  name: text("name"),
  email: text("email").notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  verifyPasscode: text("verify_passcode"),
  passcodeCreatedAt: timestamp("passcode_created_at", { mode: "date" }),
  changePasswordToken: text("change_password_token"),
  image: text("image"),
  password: text("password"),
  role: userRole("role").default("USER").notNull(),
  isTwoFactorEnabled: boolean("is_two_factor_enabled").default(false).notNull(),
  phone: text("phone"),
  createdAt: timestamp("created_at", { mode: "date" })
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at", { mode: "date" })
    .notNull()
    .default(sql`now()`),
});

export const userRelations = relations(user, ({ many }) => ({
  accounts: many(account),
}));

export const pageVariants = pgEnum("page_variants", ["HOME"]);

export const page = pgTable(
  "page",
  {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    slug: text("slug").notNull(),
    data: text("data").notNull(),
    creatorId: text("creator_id").references(() => user.id, {
      onDelete: "set null",
      onUpdate: "cascade",
    }),
    createdAt: timestamp("created_at", { mode: "date" })
      .notNull()
      .default(sql`now()`),
    updatedAt: timestamp("updated_at", { mode: "date" })
      .notNull()
      .default(sql`now()`),
    imageIds: text("image_ids")
      .array()
      .default(sql`ARRAY[]::text[]`)
      .notNull(),
    pageVariant: pageVariants("page_variant"),
  },
  (table) => {
    return {
      slugKey: uniqueIndex("page_slug_key").on(table.slug),
    };
  }
);

export const pageRelations = relations(page, ({ one }) => ({
  creator: one(user, { fields: [page.creatorId], references: [user.id] }),
}));

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const account = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccount["type"]>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (table) => ({
    compoundKey: primaryKey({
      columns: [table.provider, table.providerAccountId],
    }),
  })
);

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, { fields: [account.userId], references: [user.id] }),
}));

export const menu = pgTable("menu", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  createdAt: timestamp("created_at", { mode: "date" })
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at", { mode: "date" })
    .notNull()
    .default(sql`now()`),
  creatorId: text("creator_id").references(() => user.id, {
    onDelete: "set null",
    onUpdate: "cascade",
  }),
  usedBy: menuVariant("used_by"),
});

export const menuRelations = relations(menu, ({ many }) => ({
  items: many(menuItem),
}));
