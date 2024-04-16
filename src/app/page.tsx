"use client"

import { Question } from "@/components/question"
import { QuestionForm } from "@/components/question-form"

export default function App() {
  return (
    <main className="flex flex-col bg-slate-950 w-screen min-h-screen justify-center items-center">
      <Question />
    </main>
  )
}
