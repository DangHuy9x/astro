import { createClient } from '@hexabase/hexabase-js';
import type { APIRoute } from 'astro';
const baseUrl = 'https://hxb-graph.hexabase.com/graphql'

const usernames = ["Sarah", "Chris", "Dan"]
async function getWorkspaces() {
  const user = JSON.parse(localStorage.getItem("user")!);
  const hexabase = await createClient({ url: baseUrl, token: user?.token });
  const { workspaces, error } = await hexabase.workspace.get();
  return workspaces;
}

export const get: APIRoute = ({ params, request }) => {
  const id = params.id;
  console.log('hello')
  return {
    body: JSON.stringify({
      name: usernames[id]
    })
  }
};

export function getStaticPaths() {
  return [
    { params: { wsid: "0" } },
    { params: { wsid: "1" } },
    { params: { wsid: "4" } },
  ]
}