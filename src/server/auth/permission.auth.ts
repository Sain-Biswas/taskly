import "server-only";

import { createAccessControl } from "better-auth/plugins/access";

const statement = {
  ac: ["create", "read", "update", "delete"],
  organization: ["update", "delete"],
  member: ["create", "update", "delete"],
  invitation: ["create", "cancel"],
  team: ["create", "update", "delete"],
  project: ["create", "share", "update", "delete"],
} as const;

export const ac = createAccessControl(statement);
