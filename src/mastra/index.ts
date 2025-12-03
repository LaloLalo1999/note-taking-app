import { Mastra } from "@mastra/core";
import { noteAssistant } from "./agents";
import { improveNoteTool, summarizeNoteTool, generateIdeasTool } from "./tools";

// Initialize Mastra with Gemini model
export const mastra = new Mastra({
  agents: {
    noteAssistant,
  },
});

// Export tools
export { improveNoteTool, summarizeNoteTool, generateIdeasTool };

/**
 * Retrieves the configured note assistant agent from the Mastra instance.
 *
 * @returns The `Agent` instance named "noteAssistant".
 */
export function getNoteAssistant() {
  return mastra.getAgent("noteAssistant");
}
