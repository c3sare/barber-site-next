import {
  pgTable,
  uniqueIndex,
  foreignKey,
  pgEnum,
  text,
  timestamp,
  integer,
  jsonb,
  boolean,
  index,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

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
    id: text("id").primaryKey().notNull(),
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

export const verificationToken = pgTable(
  "VerificationToken",
  {
    id: text("id").primaryKey().notNull(),
    email: text("email").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { precision: 3, mode: "string" }).notNull(),
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
  uploadedAt: timestamp("uploadedAt", { precision: 3, mode: "string" })
    .defaultNow()
    .notNull(),
  blurDataUrl: text("blurDataUrl").notNull(),
  url: text("url").notNull(),
  desc: text("desc").notNull(),
  userId: text("userId")
    .notNull()
    .references(() => user.id, { onDelete: "restrict", onUpdate: "cascade" }),
});

export const passwordResetToken = pgTable(
  "PasswordResetToken",
  {
    id: text("id").primaryKey().notNull(),
    email: text("email").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { precision: 3, mode: "string" }).notNull(),
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
    id: text("id").primaryKey().notNull(),
    email: text("email").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { precision: 3, mode: "string" }).notNull(),
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
    id: text("id").primaryKey().notNull(),
    pageId: text("pageId")
      .notNull()
      .references(() => page.id, { onDelete: "cascade", onUpdate: "cascade" }),
    menuId: text("menuId").references(() => menu.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
    parentId: text("parentId"),
    createdAt: timestamp("createdAt", { precision: 3, mode: "string" })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updatedAt", { precision: 3, mode: "string" })
      .defaultNow()
      .notNull(),
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

export const footerComponent = pgTable("FooterComponent", {
  id: text("id").primaryKey().notNull(),
  component: footerComponentEnum("component").notNull(),
  data: jsonb("data").notNull(),
});

export const user = pgTable(
  "User",
  {
    id: text("id").primaryKey().notNull(),
    name: text("name"),
    email: text("email"),
    emailVerified: timestamp("emailVerified", { precision: 3, mode: "string" }),
    verifyPasscode: text("verifyPasscode"),
    passcodeCreatedAt: timestamp("passcodeCreatedAt", {
      precision: 3,
      mode: "string",
    }),
    changePasswordToken: text("changePasswordToken"),
    image: text("image"),
    password: text("password"),
    role: userRole("role").default("USER").notNull(),
    isTwoFactorEnabled: boolean("isTwoFactorEnabled").default(false).notNull(),
    phone: text("phone"),
    createdAt: timestamp("createdAt", { precision: 3, mode: "string" })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updatedAt", {
      precision: 3,
      mode: "string",
    }).notNull(),
  },
  (table) => {
    return {
      emailKey: uniqueIndex("User_email_key").on(table.email),
    };
  }
);

export const page = pgTable(
  "Page",
  {
    id: text("id").primaryKey().notNull(),
    name: text("name").notNull(),
    slug: text("slug").notNull(),
    data: text("data").notNull(),
    creatorId: text("creatorId").references(() => user.id, {
      onDelete: "set null",
      onUpdate: "cascade",
    }),
    createdAt: timestamp("createdAt", { precision: 3, mode: "string" })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updatedAt", { precision: 3, mode: "string" })
      .defaultNow()
      .notNull(),
  },
  (table) => {
    return {
      slugKey: uniqueIndex("Page_slug_key").on(table.slug),
    };
  }
);

export const account = pgTable(
  "Account",
  {
    id: text("id").primaryKey().notNull(),
    userId: text("userId")
      .notNull()
      .references(() => user.id, { onDelete: "cascade", onUpdate: "cascade" }),
    type: text("type").notNull(),
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

export const menu = pgTable("Menu", {
  id: text("id").primaryKey().notNull(),
  title: text("title").notNull(),
  createdAt: timestamp("createdAt", { precision: 3, mode: "string" })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updatedAt", { precision: 3, mode: "string" })
    .defaultNow()
    .notNull(),
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
