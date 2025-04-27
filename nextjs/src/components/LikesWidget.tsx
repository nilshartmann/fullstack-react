import { revalidatePath } from "next/cache";

import LikesButton from "@/components/LikesButton";
import { mutateArticleLikes } from "@/queries/queries";

type LikesWidgetProps = {
  articleId: string;
  currentLikes: number;
};

export function LikesWidget({ articleId, currentLikes }: LikesWidgetProps) {
  const handleSubmit = async () => {
    "use server";
    console.log("LIKE FORM SUBMIT", articleId);

    await mutateArticleLikes(articleId);

    revalidatePath("/articles");
    revalidatePath(`/articles/${articleId}`);

    // -> LikesButton anpassen
    // -> ZEIGEN: ALLES FUNKTIONIERT OHNE JAVASCRIPT
  };

  return (
    <form className={"inline-block"} action={handleSubmit}>
      <LikesButton likes={currentLikes} />
    </form>
  );
}
