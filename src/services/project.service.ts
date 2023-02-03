import { createClient } from "@hexabase/hexabase-js";
export const appService = {
  getAppAndDs,
  createApp,
  updateProjectName,

}
const baseUrl = 'https://hxb-graph.hexabase.com/graphql'
async function getAppAndDs(id: string) {
  const user = JSON.parse(localStorage.getItem("user")!);
  const hexabase = await createClient({ url: baseUrl, token: user.token });
  const { appAndDs, error } =
    await hexabase.project.getProjectsAndDatastores(id);
  return appAndDs;
}

async function createApp(createProjectParams: any) {
  const user = JSON.parse(localStorage.getItem("user")!);
  const hexabase = await createClient({ url: baseUrl, token: user.token });
  const { app, error } = await hexabase.project.create(
    createProjectParams
  );
  return app?.project_id;
}

async function updateProjectName(payload) {
  const user = JSON.parse(localStorage.getItem("user")!);
  const hexabase = await createClient({ url: baseUrl, token: user.token });
  const { data, error } = await hexabase.project.updateProjectName(payload);
  return data;
}


