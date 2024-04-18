"use client"

import Link from "next/link"
import { IconMessage2Question, IconForms } from '@tabler/icons-react';

export default function App() {
  return (
    <main className="flex flex-col bg-slate-950 w-screen min-h-screen justify-center items-center">

      <div className="absolute w-[420px] h-[420px] bg-gradient-to-tr from-purple-600 to-teal-600 top-[48px] left-[48px] rounded-full blur-[150px]"></div>
      <div className="absolute w-[420px] h-[420px] bg-gradient-to-tr from-purple-600 to-teal-600 bottom-[48px] right-[48px] rounded-full blur-[150px]"></div>

      <div className="p-5 mb-10">
        <h1 className="text-[64px] text-purple-600 font-bold">Quizer NextJS</h1>
      </div>
      
      <div className="w-[900px] min-h-[500px] flex flex-col lg:grid lg:grid-cols-2 gap-10">

        <div className="z-10 flex flex-col p-10 justify-center items-center border border-slate-50/[.09] rounded-xl bg-slate-100/[.05] backdrop-blur-sm shadow-xl">
          <IconMessage2Question size={128} className="text-slate-600 mb-5" />
          <p className="text-slate-600 text-center mb-10">
            Quiz de demostração e teste do criador de perguntas e repostas.
          </p>
          <Link href="/quizer" className="border border-purple-700 bg-purple-600 rounded-xl py-3 px-5 w-full text-center shadow-lg">
            <span className="text-slate-200">Iniciar Demo</span>
          </Link>
        </div>

        <div className="z-10 flex flex-col p-10 justify-center items-center border border-slate-50/[.09] rounded-xl bg-slate-100/[.05] backdrop-blur-sm shadow-xl">
          <IconForms size={128} className="text-slate-600 mb-5" />
          <p className="text-slate-600 text-center mb-10">
            Crie seu QUIZ utilizando o JSON geredo pelo Next Quizer.
          </p>
          <Link href="/quizer-creator" className="border border-teal-700 bg-teal-600 rounded-xl py-3 px-5 w-full text-center shadow-lg">
            <span className="text-slate-200">Criar JSON</span>
          </Link>
        </div>
      </div>
    </main>
  )
}
