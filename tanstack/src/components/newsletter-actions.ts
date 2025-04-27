import { createServerFn } from "@tanstack/react-start";
import { getWebRequest } from "@tanstack/react-start/server";

import { delayConfig } from "@/demo-config.ts";

export const subscribeToNewsletter = createServerFn({
  method: "POST",
  response: "raw",
})
  .validator((data: unknown) => {
    if (!(data instanceof FormData)) {
      throw new Error("Invalid! FormData is required");
    }
    const email = data.get("email");
    if (typeof email !== "string") {
      throw new Error("Invalid! Email is required");
    }

    return email;
  })
  .handler(async ({ data, context }) => {
    console.log("PATH", getWebRequest());
    console.log("Subscribing to ", data);

    await new Promise((res) =>
      setTimeout(() => res("Subscribed"), delayConfig.SubscribeNewsletter),
    );

    // if (data.length < 4) {
    //   return { error: "Invalid E-Mail" };
    // }
    //
    // return {
    //   msg: "Subscribed!",
    // };
    return new Response(`Hello, ${data}!`);
  });
