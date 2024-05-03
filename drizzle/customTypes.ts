import { customType } from "drizzle-orm/pg-core";

export const timestamp = customType<{
  data: Date;
  driverData: string;
}>({
  dataType(config) {
    return "text";
  },
  fromDriver(value: string): Date {
    return new Date(value);
  },
});
