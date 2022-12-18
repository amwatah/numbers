import { z } from "zod";
import { publicProcedure, router } from "../trpc";
import { myPrisna } from "./_app";

export const ContactsRouter = router({
  getContacts: publicProcedure.query(async ({ ctx }) => {
    const contacts = await myPrisna.contact.findMany();
    return contacts;
  }),
  addContacts: publicProcedure
    .input(
      z.object({
        name: z.string(),
        phone: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const addedContact = await myPrisna.contact.create({
        data: {
          name: input.name,
          phone: input.phone,
        },
      });
      console.log("added", addedContact);
    }),
  deleteContact: publicProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const deletedContact = await myPrisna.contact.delete({
        where: {
          id: input.id,
        },
      });
      console.log("deleted", deletedContact);
    }),
});
