import { createClient } from "@hexabase/hexabase-js";

const baseUrl = 'https://hxb-graph.hexabase.com/graphql'

async function login(email: string, password: string) {
  console.log('emai', email)
  console.log('password', password)
  console.log('hi')
  let user = {} as any;
  const hexabase = await createClient({ url: baseUrl, email, password });
  const { token, error } = await hexabase.auth.login({ email, password });
  if (token && !error) {
    const { userInfo, error } = await hexabase.user.get(token);
    user = userInfo;
    user.token = token;
    localStorage.setItem("user", JSON.stringify(user));
  }

  return user;
}

export const userService = {
  login,
}
