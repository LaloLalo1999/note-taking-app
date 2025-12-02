import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Get all notes sorted by most recent
export const getNotes = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("notes").order("desc").collect();
  },
});

// Get a single note by ID
export const getNote = query({
  args: { id: v.id("notes") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

// Create a new note
export const createNote = mutation({
  args: {
    title: v.string(),
    content: v.string(),
    tags: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    return await ctx.db.insert("notes", {
      title: args.title,
      content: args.content,
      tags: args.tags || [],
      createdAt: now,
      updatedAt: now,
    });
  },
});

// Update an existing note
export const updateNote = mutation({
  args: {
    id: v.id("notes"),
    title: v.optional(v.string()),
    content: v.optional(v.string()),
    tags: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    await ctx.db.patch(id, {
      ...updates,
      updatedAt: Date.now(),
    });
  },
});

// Delete a note
export const deleteNote = mutation({
  args: { id: v.id("notes") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

// Search notes by title or content
export const searchNotes = query({
  args: { searchTerm: v.string() },
  handler: async (ctx, args) => {
    const allNotes = await ctx.db.query("notes").collect();
    const searchLower = args.searchTerm.toLowerCase();
    return allNotes.filter(
      (note) =>
        note.title.toLowerCase().includes(searchLower) ||
        note.content.toLowerCase().includes(searchLower)
    );
  },
});
