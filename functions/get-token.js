export const onRequest = (context) => {
  return new Response(context.env.STORE_TOKEN);
};