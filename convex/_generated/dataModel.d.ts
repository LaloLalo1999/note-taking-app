/* eslint-disable */
/**
 * Generated data model types.
 */

import type {
  DataModelFromSchemaDefinition,
} from "convex/server";
import type { GenericId } from "convex/values";
import schema from "../schema.js";

/**
 * The names of all tables defined in your Convex schema.
 */
export type TableNames = "notes";

/**
 * The type of a document stored in a table.
 */
export type Doc<TableName extends TableNames> =
  TableName extends "notes"
    ? {
        _id: GenericId<"notes">;
        _creationTime: number;
        title: string;
        content: string;
        tags?: string[];
        createdAt: number;
        updatedAt: number;
      }
    : never;

export type Id<TableName extends TableNames> = GenericId<TableName>;

/**
 * A type describing your Convex data model.
 */
export type DataModel = DataModelFromSchemaDefinition<typeof schema>;
