import { createClient } from "@hexabase/hexabase-js";
import type { CreateWsInput } from "@hexabase/hexabase-js/dist/lib/types/workspace";
const baseUrl = 'https://hxb-graph.hexabase.com/graphql'

export const workspacesService = {
  getWorkspaces,
  createWorkspace
}

// get all workspace
async function getWorkspaces() {
  const user = JSON.parse(localStorage.getItem("user")!);
  const hexabase = await createClient({ url: baseUrl, token: user?.token });
  const { workspaces, error } = await hexabase.workspace.get();
  return workspaces;
}

// add a workspace
async function createWorkspace(name: CreateWsInput) {
  const user = JSON.parse(localStorage.getItem("user")!);
  const hexabase = await createClient({ url: baseUrl, token: user.token });
  const { w_id, error } = await hexabase.workspace.create(name);
  return w_id;
}
