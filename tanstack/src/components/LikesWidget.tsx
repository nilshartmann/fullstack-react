import { LikeIcon, LikeIndicator } from "@/components/LoadingIndicator";
import { useAddLikeMutation } from "@/api/queries.ts";

type LikesWidgetProps = {
  articleId: string;
  currentLikes: number;
};

export function LikesWidget({ articleId, currentLikes }: LikesWidgetProps) {
  const addLikesMutation = useAddLikeMutation(articleId);

  const isPending = addLikesMutation.isPending;

  const handleSubmit = () => {
    addLikesMutation.mutate();
  };

  return (
    <form className={"inline-block"} action={handleSubmit}>
      <button
        disabled={isPending}
        className={
          "flex items-center justify-center space-x-2 rounded border border-slate-200 bg-slate-50 px-3 py-1 text-[15px] text-teal-700 hover:cursor-pointer hover:bg-teal-700 hover:text-white disabled:cursor-default disabled:border-teal-600 disabled:bg-teal-600 disabled:text-teal-50 disabled:hover:bg-teal-600"
        }
      >
        <span>{currentLikes}</span>
        {isPending ? <LikeIndicator /> : <LikeIcon />}
      </button>
    </form>
  );
}
