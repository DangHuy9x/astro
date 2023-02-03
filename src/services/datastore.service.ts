import { createClient } from "@hexabase/hexabase-js";
const baseUrl = 'https://hxb-graph.hexabase.com/graphql'

export const datastoreService = {
  getFields,
  getField,
  getActions,
  getDetail,
  getStatuses,
};

async function initHxbClient() {
  const token = JSON.parse(localStorage.getItem("user")!).token;
  const hexabase = token && (await createClient({ url: baseUrl, token }));
  return hexabase;
}

async function getFields(datastoreId: string, projectId: string) {
  const hexabase = await initHxbClient();
  const { dsFields, error } = await hexabase.datastore.getFields(
    datastoreId,
    projectId
  );
  return dsFields;
}

async function getDetail(datastoreId: string) {
  const hexabase = await initHxbClient();
  const { datastoreSetting, error } = await hexabase.datastore.getDetail(
    datastoreId
  );
  return datastoreSetting;
}

async function getField(fieldId: string, datastoreId: string) {
  const hexabase = await initHxbClient();
  const { dsField, error } = await hexabase.datastore.getField(
    fieldId,
    datastoreId
  );
  return dsField;
}

async function getActions(datastoreId: string) {
  const hexabase = await initHxbClient();
  const { dsActions, error } = await hexabase.datastore.getActions(
    datastoreId
  );
  return dsActions;
}

async function getStatuses(datastoreId: string) {
  const hexabase = await initHxbClient();
  const { dsStatuses, error } = await hexabase.datastore.getStatuses(
    datastoreId
  );
  return dsStatuses;
}