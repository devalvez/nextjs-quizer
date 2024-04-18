import { Quizer } from "@/components/quizer"

import demo from "../../quizer-files/demo.json"

export default function QuizDemo() {
  return (
    <div className="flex flex-col w-full min-h-screen justify-center items-center bg-slate-950">
      <Quizer quizerJson={demo} />
    </div>
  )
}
