"use server";

// Vergleichbar mit POST Endpunkt in Spring
//  aber: wir müssen den Eddpunkt nicht selbst implementieren

import { revalidatePath } from "next/cache";

import { mutateArticleLikes } from "@/queries/queries";

export async function saveLikeAction(articleId: string) {
  const newLikes = await mutateArticleLikes(articleId);

  revalidatePath("/articles");
  revalidatePath(`/articles/${articleId}`);

  return newLikes;

  // todo: mutateArticleLikes zum Speichern aufrufen
  // todo: revalidatePath
}
