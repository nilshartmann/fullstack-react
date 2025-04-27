import LikesButton from "@/components/LikesButton";

type LikesWidgetProps = {
  articleId: string;
  currentLikes: number;
};

export function LikesWidget({ articleId, currentLikes }: LikesWidgetProps) {
  const handleSubmit = async () => {
    console.log("LIKE FORM SUBMIT", articleId);
  };

  return (
    <form className={"inline-block"}>
      <LikesButton likes={currentLikes} />
    </form>
  );
}
