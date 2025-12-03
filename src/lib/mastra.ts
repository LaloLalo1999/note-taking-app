import { Mastra, Agent, Model, createTool } from "@mastra/core";
import { z } from "zod";

// Initialize Mastra with Gemini model
export const mastra = new Mastra({
  agents: {
    noteAssistant: new Agent({
      name: "Note Assistant",
      instructions: `You are a helpful AI assistant for a note-taking app inspired by Obsidian and Notion. 
      You help users:
      - Improve and expand their notes
      - Generate summaries
      - Suggest connections between notes
      - Format content in markdown
      - Brainstorm ideas
      
      Always provide helpful, concise, and well-formatted responses.`,
      model: new Model({
        provider: "GOOGLE",
        name: "gemini-1.5-flash",
      }),
      enabledTools: {},
    }),
  },
});

// Tool for improving note content
export const improveNoteTool = createTool({
  id: "improve-note",
  description: "Improve the content and structure of a note",
  inputSchema: z.object({
    content: z.string().describe("The note content to improve"),
  }),
  execute: async ({ context }) => {
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
  execute: async ({ context }) => {
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
  execute: async ({ context }) => {
    const agent = mastra.getAgent("noteAssistant");
    const response = await agent.generate(
      `Generate 5 interesting ideas related to: ${context.topic}`
    );
    return { ideas: response.text };
  },
});

/**
 * Retrieves the configured note assistant agent from the Mastra instance.
 *
 * @returns The "noteAssistant" agent.
 */
export function getNoteAssistant() {
  return mastra.getAgent("noteAssistant");
}