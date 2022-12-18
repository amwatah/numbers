import { z } from "zod";
import { publicProcedure, router } from "../trpc";

export const ContactsRouter = router({
  getContacts: publicProcedure.query(async ({ ctx }) => {
    const contacts = await ctx.prisma.contact.findMany();
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
      const addedContact = await ctx.prisma.contact.create({
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
      const deletedContact = await ctx.prisma.contact.delete({
        where: {
          id: input.id,
        },
      });
      console.log("deleted", deletedContact);
    }),
});
