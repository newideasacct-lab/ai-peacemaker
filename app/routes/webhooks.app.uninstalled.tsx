import type { ActionFunctionArgs } from "@remix-run/node";

export const action = async ({ request }: ActionFunctionArgs) => {
  console.log("App uninstalled webhook received");
  return new Response("OK", { status: 200 });
};
