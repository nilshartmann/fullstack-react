"use client";
import MinusButton from "@/components/MinusButton";
import PlusButton from "@/components/PlusButton";
import { useReadingSpeed } from "@/components/ReadingSpeedProvider";

export default function ReadingSpeedChooser() {
  const readingSpeed = useReadingSpeed();

  // todo
  // useReadingSpeed();
  // ctx.update(-50)
  // disabled ctx.readingSpeed <= 50

  return (
    <div className={"flex gap-x-2 font-normal"}>
      <MinusButton onClick={() => readingSpeed.update(-50)} />
      Reading speed{" "}
      <span className={"font-bold"}>{readingSpeed.readingSpeed}</span> wpm
      <PlusButton onClick={() => readingSpeed.update(50)} />
    </div>
  );
}
