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

export const userRole = pgEnum("UserRole", ["USER", "ADMIN"]);
export const fileType = pgEnum("FileType", ["VIDEO", "AUDIO", "IMAGE"]);
export const footerComponentEnum = pgEnum("FooterComponentEnum", [
  "HERO_BOX",
  "LINK_BOX",
  "PHOTO_GALLERY",
]);

export const twoFactorConfirmation = pgTable(
  "TwoFactorConfirmation",
  {
    id: serial("id").primaryKey(),
    userId: text("userId")
      .notNull()
      .references(() => user.id, { onDelete: "cascade", onUpdate: "cascade" }),
  },
  (table) => {
    return {
      userIdKey: uniqueIndex("TwoFactorConfirmation_userId_key").on(
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
  "VerificationToken",
  {
    id: serial("id").primaryKey(),
    email: text("email").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires").notNull(),
  },
  (table) => {
    return {
      tokenKey: uniqueIndex("VerificationToken_token_key").on(table.token),
      emailTokenKey: uniqueIndex("VerificationToken_email_token_key").on(
        table.email,
        table.token
      ),
    };
  }
);

export const file = pgTable("File", {
  id: text("id").primaryKey().notNull(),
  name: text("name").notNull(),
  type: fileType("type").notNull(),
  width: integer("width").notNull(),
  height: integer("height").notNull(),
  uploadedAt: timestamp("uploadedAt")
    .notNull()
    .default(sql`now()`),
  blurDataUrl: text("blurDataUrl").notNull(),
  url: text("url").notNull(),
  desc: text("desc").notNull(),
  userId: text("userId")
    .notNull()
    .references(() => user.id, { onDelete: "restrict", onUpdate: "cascade" }),
});

export const fileRelations = relations(file, ({ one }) => ({
  author: one(user, { fields: [file.userId], references: [user.id] }),
}));

export const passwordResetToken = pgTable(
  "PasswordResetToken",
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
      tokenKey: uniqueIndex("PasswordResetToken_token_key").on(table.token),
      emailTokenKey: uniqueIndex("PasswordResetToken_email_token_key").on(
        table.email,
        table.token
      ),
    };
  }
);

export const twoFactorToken = pgTable(
  "TwoFactorToken",
  {
    id: serial("id").primaryKey(),
    email: text("email").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires").notNull(),
  },
  (table) => {
    return {
      tokenKey: uniqueIndex("TwoFactorToken_token_key").on(table.token),
      emailTokenKey: uniqueIndex("TwoFactorToken_email_token_key").on(
        table.email,
        table.token
      ),
    };
  }
);

export const menuItem = pgTable(
  "MenuItem",
  {
    id: serial("id").primaryKey(),
    pageId: integer("pageId")
      .notNull()
      .references(() => page.id, { onDelete: "cascade", onUpdate: "cascade" }),
    menuId: integer("menuId").references(() => menu.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
    parentId: integer("parentId"),
    createdAt: timestamp("createdAt")
      .notNull()
      .default(sql`now()`),
    updatedAt: timestamp("updatedAt")
      .notNull()
      .default(sql`now()`),
    creatorId: text("creatorId").references(() => user.id, {
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
        name: "MenuItem_parentId_fkey",
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

export const footerComponent = pgTable("FooterComponent", {
  id: serial("id").primaryKey(),
  component: footerComponentEnum("component").notNull(),
  data: jsonb("data").notNull(),
  imageIds: text("imageIds")
    .references(() => file.id, {
      onDelete: "cascade",
    })
    .array()
    .default(sql`ARRAY[]::text[]`)
    .notNull(),
});

export const footerComponentRelations = relations(
  footerComponent,
  ({ many }) => ({
    images: many(file),
  })
);

export const user = pgTable(
  "user",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => createId()),
    name: text("name"),
    email: text("email"),
    emailVerified: timestamp("emailVerified"),
    verifyPasscode: text("verifyPasscode"),
    passcodeCreatedAt: timestamp("passcodeCreatedAt"),
    changePasswordToken: text("changePasswordToken"),
    image: text("image"),
    password: text("password"),
    role: userRole("role").default("USER").notNull(),
    isTwoFactorEnabled: boolean("isTwoFactorEnabled").default(false).notNull(),
    phone: text("phone"),
    createdAt: timestamp("createdAt")
      .notNull()
      .default(sql`now()`),
    updatedAt: timestamp("updatedAt")
      .notNull()
      .default(sql`now()`)
      .$onUpdateFn(() => sql`now()`),
  },
  (table) => {
    return {
      emailKey: uniqueIndex("User_email_key").on(table.email),
    };
  }
);

export const userRelations = relations(user, ({ many }) => ({
  accounts: many(account),
}));

export const page = pgTable(
  "Page",
  {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    slug: text("slug").notNull(),
    data: text("data").notNull(),
    creatorId: text("creatorId").references(() => user.id, {
      onDelete: "set null",
      onUpdate: "cascade",
    }),
    createdAt: timestamp("createdAt")
      .notNull()
      .default(sql`now()`),
    updatedAt: timestamp("updatedAt")
      .notNull()
      .default(sql`now()`)
      .$onUpdateFn(() => sql`now()`),
    imageIds: text("imageIds")
      .references(() => file.id, {
        onDelete: "cascade",
      })
      .array()
      .default(sql`ARRAY[]::text[]`)
      .notNull(),
  },
  (table) => {
    return {
      slugKey: uniqueIndex("Page_slug_key").on(table.slug),
    };
  }
);

export const pageRelations = relations(page, ({ one, many }) => ({
  creator: one(user, { fields: [page.creatorId], references: [user.id] }),
  images: many(file),
}));

export const account = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccount["type"]>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
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

export const menu = pgTable("Menu", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  createdAt: timestamp("createdAt")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updatedAt")
    .notNull()
    .default(sql`now()`)
    .$onUpdateFn(() => sql`now()`),
  creatorId: text("creatorId").references(() => user.id, {
    onDelete: "set null",
    onUpdate: "cascade",
  }),
});
