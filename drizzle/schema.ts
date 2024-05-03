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
} from "drizzle-orm/pg-core";
import { relations, sql } from "drizzle-orm";
import { createId } from "@paralleldrive/cuid2";
import { customType } from "drizzle-orm/pg-core";
import type { AdapterAccount } from "next-auth/adapters";

const DateTime = customType<{
  data: Date;
  driverData: string;
  config?: { withTimezone?: boolean; precision?: number };
}>({
  dataType(config) {
    const precision =
      typeof config?.precision !== "undefined" ? `(${config.precision})` : "";
    return `timestamp${precision}${
      config?.withTimezone ? " with time zone" : ""
    }`;
  },
  fromDriver(value: string): Date {
    return new Date(value);
  },
});

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
    id: text("id").primaryKey().default(createId()),
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
    id: text("id").primaryKey().default(createId()),
    email: text("email").notNull(),
    token: text("token").notNull(),
    expires: DateTime("expires", { precision: 3 }).notNull(),
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
  uploadedAt: DateTime("uploadedAt", { precision: 3 })
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
    id: text("id").primaryKey().default(createId()),
    email: text("email").notNull(),
    token: text("token").notNull(),
    expires: DateTime("expires", { precision: 3 })
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
    id: text("id").primaryKey().default(createId()),
    email: text("email").notNull(),
    token: text("token").notNull(),
    expires: DateTime("expires", { precision: 3 }).notNull(),
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
    id: text("id").primaryKey().default(createId()),
    pageId: text("pageId")
      .notNull()
      .references(() => page.id, { onDelete: "cascade", onUpdate: "cascade" }),
    menuId: text("menuId").references(() => menu.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
    parentId: text("parentId"),
    createdAt: DateTime("createdAt", { precision: 3 })
      .notNull()
      .default(sql`now()`),
    updatedAt: DateTime("updatedAt", { precision: 3 })
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
  id: text("id").primaryKey().default(createId()),
  component: footerComponentEnum("component").notNull(),
  data: jsonb("data").notNull(),
});

export const footerComponentRelations = relations(
  footerComponent,
  ({ many }) => ({
    images: many(usedFooterImages),
  })
);

export const user = pgTable(
  "User",
  {
    id: text("id").primaryKey().default(createId()),
    name: text("name"),
    email: text("email"),
    emailVerified: DateTime("emailVerified", { precision: 3 }),
    verifyPasscode: text("verifyPasscode"),
    passcodeCreatedAt: DateTime("passcodeCreatedAt", { precision: 3 }),
    changePasswordToken: text("changePasswordToken"),
    image: text("image"),
    password: text("password"),
    role: userRole("role").default("USER").notNull(),
    isTwoFactorEnabled: boolean("isTwoFactorEnabled").default(false).notNull(),
    phone: text("phone"),
    createdAt: DateTime("createdAt", { precision: 3 })
      .notNull()
      .default(sql`now()`),
    updatedAt: DateTime("updatedAt", { precision: 3 })
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
    id: text("id").primaryKey().default(createId()),
    name: text("name").notNull(),
    slug: text("slug").notNull(),
    data: text("data").notNull(),
    creatorId: text("creatorId").references(() => user.id, {
      onDelete: "set null",
      onUpdate: "cascade",
    }),
    createdAt: DateTime("createdAt", { precision: 3 })
      .notNull()
      .default(sql`now()`),
    updatedAt: DateTime("updatedAt", { precision: 3 })
      .notNull()
      .default(sql`now()`)
      .$onUpdateFn(() => sql`now()`),
  },
  (table) => {
    return {
      slugKey: uniqueIndex("Page_slug_key").on(table.slug),
    };
  }
);

export const pageRelations = relations(page, ({ one }) => ({
  creator: one(user, { fields: [page.creatorId], references: [user.id] }),
}));

export const account = pgTable(
  "Account",
  {
    userId: text("userId")
      .notNull()
      .references(() => user.id, { onDelete: "cascade", onUpdate: "cascade" }),
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
  (table) => {
    return {
      userIdIdx: index("Account_userId_idx").on(table.userId),
      providerProviderAccountIdKey: uniqueIndex(
        "Account_provider_providerAccountId_key"
      ).on(table.provider, table.providerAccountId),
    };
  }
);

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, { fields: [account.userId], references: [user.id] }),
}));

export const menu = pgTable("Menu", {
  id: text("id").primaryKey().default(createId()),
  title: text("title").notNull(),
  createdAt: DateTime("createdAt", { precision: 3 })
    .notNull()
    .default(sql`now()`),
  updatedAt: DateTime("updatedAt", { precision: 3 })
    .notNull()
    .default(sql`now()`)
    .$onUpdateFn(() => sql`now()`),
  creatorId: text("creatorId").references(() => user.id, {
    onDelete: "set null",
    onUpdate: "cascade",
  }),
});

export const usedFooterImages = pgTable(
  "_usedFooterImages",
  {
    a: text("A")
      .notNull()
      .references(() => file.id, { onDelete: "cascade", onUpdate: "cascade" }),
    b: text("B")
      .notNull()
      .references(() => footerComponent.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
  },
  (table) => {
    return {
      abUnique: uniqueIndex("_usedFooterImages_AB_unique").on(table.a, table.b),
      bIdx: index().on(table.b),
    };
  }
);

export const usedFooterImagesRelations = relations(
  usedFooterImages,
  ({ one }) => ({
    file: one(file, { fields: [usedFooterImages.a], references: [file.id] }),
    component: one(footerComponent, {
      fields: [usedFooterImages.b],
      references: [footerComponent.id],
    }),
  })
);

export const pageFiles = pgTable(
  "_PageFiles",
  {
    a: text("A")
      .notNull()
      .references(() => file.id, { onDelete: "cascade", onUpdate: "cascade" }),
    b: text("B")
      .notNull()
      .references(() => page.id, { onDelete: "cascade", onUpdate: "cascade" }),
  },
  (table) => {
    return {
      abUnique: uniqueIndex("_PageFiles_AB_unique").on(table.a, table.b),
      bIdx: index().on(table.b),
    };
  }
);

export const pageFilesRelations = relations(pageFiles, ({ one }) => ({
  file: one(file, { fields: [pageFiles.a], references: [file.id] }),
  page: one(page, { fields: [pageFiles.b], references: [page.id] }),
}));
