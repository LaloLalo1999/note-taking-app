import { createTool } from "@mastra/core";
import { z } from "zod";

// Tool for improving note content
export const improveNoteTool = createTool({
  id: "improve-note",
  description: "Improve the content and structure of a note",
  inputSchema: z.object({
    content: z.string().describe("The note content to improve"),
  }),
  execute: async ({ context, mastra }) => {
    const agent = mastra.getAgent("noteAssistant");
    const response = await agent.generate(
      `Please improve this note content while maintaining its core message:\n\n${context.content}`
    );
    return { improvedContent: response.text };
  },
});

// Tool for summarizing notes
export const summarizeNoteTool = createTool({
  id: "summarize-note",
  description: "Create a concise summary of note content",
  inputSchema: z.object({
    content: z.string().describe("The note content to summarize"),
  }),
  execute: async ({ context, mastra }) => {
    const agent = mastra.getAgent("noteAssistant");
    const response = await agent.generate(
      `Please provide a concise summary of this note:\n\n${context.content}`
    );
    return { summary: response.text };
  },
});

// Tool for generating content ideas
export const generateIdeasTool = createTool({
  id: "generate-ideas",
  description: "Generate ideas based on a topic or existing note",
  inputSchema: z.object({
    topic: z.string().describe("The topic to generate ideas about"),
  }),
  execute: async ({ context, mastra }) => {
    const agent = mastra.getAgent("noteAssistant");
    const response = await agent.generate(
      `Generate 5 interesting ideas related to: ${context.topic}`
    );
    return { ideas: response.text };
  },
});
