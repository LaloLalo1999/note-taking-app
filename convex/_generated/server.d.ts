/* eslint-disable */
/**
 * Generated server utilities.
 */

import {
  ActionBuilder,
  HttpActionBuilder,
  MutationBuilder,
  QueryBuilder,
  internalActionGeneric,
  internalMutationGeneric,
  internalQueryGeneric,
} from "convex/server";
import type { DataModel } from "./dataModel.js";

/**
 * Define a query in your Convex API.
 *
 * This function will be allowed to read your Convex database and will be accessible from the client.
 */
export const query: QueryBuilder<DataModel, "public"> = null as any;

/**
 * Define a mutation in your Convex API.
 *
 * This function will be allowed to modify your Convex database and will be accessible from the client.
 */
export const mutation: MutationBuilder<DataModel, "public"> = null as any;

/**
 * Define an action in your Convex API.
 *
 * An action is a function that can call third-party services and other Convex functions.
 */
export const action: ActionBuilder<DataModel, "public"> = null as any;

/**
 * Define an HTTP action for responding to HTTP requests.
 */
export const httpAction: HttpActionBuilder = null as any;

/**
 * Define an internal query in your Convex API.
 */
export const internalQuery = internalQueryGeneric as QueryBuilder<
  DataModel,
  "internal"
>;

/**
 * Define an internal mutation in your Convex API.
 */
export const internalMutation = internalMutationGeneric as MutationBuilder<
  DataModel,
  "internal"
>;

/**
 * Define an internal action in your Convex API.
 */
export const internalAction = internalActionGeneric as ActionBuilder<
  DataModel,
  "internal"
>;
