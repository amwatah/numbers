import { PrismaClient } from "@prisma/client";
import { router } from "../trpc";
import { ContactsRouter } from "./contacts";

export const myPrisna = new PrismaClient();
export const appRouter = router({
  contacts: ContactsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
