"use client";

import React from "react";

import { Button } from "@/components/Button";
import { Input } from "@/components/Input";

export function NewsletterRegistration() {
  return (
    <form
      method="POST"
      className={"max-w-1/4 flex items-center space-x-4 pe-2 ps-2 font-barlow"}
    >
      <div>Don't miss latest news. Subscribe to newsletter</div>

      <div className={"max-w-64"}>
        <Input name={"email"} placeholder={"E-Mail"} />
      </div>
      <div>
        <Button>
          <button type={"submit"}>Subscribe</button>
        </Button>
      </div>
    </form>
  );
}
