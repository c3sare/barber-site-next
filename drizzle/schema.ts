import {
  pgTable,
  uniqueIndex,
  foreignKey,
  pgEnum,
  text,
  integer,
  jsonb,
  boolean,
  index,
  primaryKey,
  serial,
} from "drizzle-orm/pg-core";
import { relations, sql } from "drizzle-orm";
import { createId } from "@paralleldrive/cuid2";
import type { AdapterAccount } from "next-auth/adapters";
import { timestamp } from "./customTypes";

export const userRole = pgEnum("user_role", ["USER", "ADMIN"]);
export const fileType = pgEnum("file_type", ["VIDEO", "AUDIO", "IMAGE"]);
export const footerComponentEnum = pgEnum("footer_component_enum", [
  "HERO_BOX",
  "LINK_BOX",
  "PHOTO_GALLERY",
]);

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
  "verification_token",
  {
    id: serial("id").primaryKey(),
    email: text("email").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires").notNull(),
  },
  (table) => {
    return {
      tokenKey: uniqueIndex("verification_token_key").on(table.token),
      emailTokenKey: uniqueIndex("verification_email_token_key").on(
        table.email,
        table.token
      ),
    };
  }
);

export const file = pgTable("file", {
  id: text("id").primaryKey().notNull(),
  name: text("name").notNull(),
  type: fileType("type").notNull(),
  width: integer("width").notNull(),
  height: integer("height").notNull(),
  uploadedAt: timestamp("uploaded_at")
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
    expires: timestamp("expires")
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
    expires: timestamp("expires").notNull(),
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

export const menuItem = pgTable(
  "menu_item",
  {
    id: serial("id").primaryKey(),
    pageId: integer("page_id")
      .notNull()
      .references(() => page.id, { onDelete: "cascade", onUpdate: "cascade" }),
    menuId: integer("menu_id").references(() => menu.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
    parentId: integer("parent_id"),
    createdAt: timestamp("created_at")
      .notNull()
      .default(sql`now()`),
    updatedAt: timestamp("updated_at")
      .notNull()
      .default(sql`now()`),
    creatorId: text("creator_id").references(() => user.id, {
      onDelete: "set null",
      onUpdate: "cascade",
    }),
    order: integer("order").notNull(),
  },
  (table) => {
    return {
      menuItemParentIdFkey: foreignKey({
        columns: [table.parentId],
        foreignColumns: [table.id],
        name: "menu_item_parentId_fkey",
      })
        .onUpdate("cascade")
        .onDelete("set null"),
    };
  }
);

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

export const user = pgTable(
  "user",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => createId()),
    name: text("name"),
    email: text("email"),
    emailVerified: timestamp("email_verified"),
    verifyPasscode: text("verify_passcode"),
    passcodeCreatedAt: timestamp("passcode_created_at"),
    changePasswordToken: text("change_password_token"),
    image: text("image"),
    password: text("password"),
    role: userRole("role").default("USER").notNull(),
    isTwoFactorEnabled: boolean("is_two_factor_enabled")
      .default(false)
      .notNull(),
    phone: text("phone"),
    createdAt: timestamp("created_at")
      .notNull()
      .default(sql`now()`),
    updatedAt: timestamp("updated_at")
      .notNull()
      .default(sql`now()`)
      .$onUpdateFn(() => sql`now()`),
  },
  (table) => {
    return {
      emailKey: uniqueIndex("user_email_key").on(table.email),
    };
  }
);

export const userRelations = relations(user, ({ many }) => ({
  accounts: many(account),
}));

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
    createdAt: timestamp("created_at")
      .notNull()
      .default(sql`now()`),
    updatedAt: timestamp("updated_at")
      .notNull()
      .default(sql`now()`)
      .$onUpdateFn(() => sql`now()`),
    imageIds: text("image_ids")
      .array()
      .default(sql`ARRAY[]::text[]`)
      .notNull(),
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

export const account = pgTable(
  "account",
  {
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccount["type"]>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("provider_account_id").notNull(),
    refreshToken: text("refresh_token"),
    accessToken: text("access_token"),
    expiresAt: integer("expires_at"),
    tokenType: text("token_type"),
    scope: text("scope"),
    idToken: text("id_token"),
    sessionState: text("session_state"),
  },
  (table) => ({
    compoundKey: primaryKey({
      columns: [table.providerAccountId, table.provider],
    }),
  })
);

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, { fields: [account.userId], references: [user.id] }),
}));

export const menu = pgTable("menu", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`)
    .$onUpdateFn(() => sql`now()`),
  creatorId: text("creator_id").references(() => user.id, {
    onDelete: "set null",
    onUpdate: "cascade",
  }),
});
