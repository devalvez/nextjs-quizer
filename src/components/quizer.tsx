"use client"

import * as React from "react"
import { IconCircleCheck } from '@tabler/icons-react';

export type QuizerProps = {
  quizerJson: object
}

const Quizer = ({ quizerJson }) => {
  const [currentQuestion, setCurrentQuestion] = React.useState<number>(0)
  const [choose, setChoose] = React.useState<string>("")
  const [chooseGroup, setChooseGroup] = React.useState<any>([])
  const [pattern, setPattern] = React.useState([])

  const [showResult, setShowResult] = React.useState<boolean>(false)
  
  const handlePreviewQuestion = () => {
    if(currentQuestion - 1 <= 1) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }
  
  const handleNextQuestion = (index: number, answerType: string, correctAnswer) => {
    if(answerType === "text" || answerType === "radio") {
      if(choose !== "" && choose !== null) {
        setPattern([...pattern,  { question: index, choose: choose, correctAnswer: quizerJson[index].correctAnswer, point: quizerJson[index].point} ])
        setChoose("")
        setCurrentQuestion(currentQuestion + 1)
      } else {
        alert("Selecione uma opção.")
      }
    } else if(answerType) {
      setPattern([...pattern,  { question: index, choose: chooseGroup, correctAnswer: quizerJson[index].correctAnswer, point: quizerJson[index].point } ])
      setChooseGroup([])
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const handleChoose = (value: any, answerType: any) => {
    if(answerType === "checkbox") {

      if(chooseGroup.includes(value)) {
        setChooseGroup(chooseGroup.filter(item => item !== value));
      } else {
        setChooseGroup([...chooseGroup, value])
      }
    } else {      
      setChoose(value)
    }
  }
  
  if(currentQuestion + 1 > quizerJson.length) {
    let points = 0
    if (showResult) {
      return (
        <div className="border border-slate-800 p-10 shadow-lg rounded-xl bg-slate-900">
          {
            pattern.map((item: any, index: number) => {
              { item.choose === item.correctAnswer ? points = points + parseInt(item.point) :  points = points + 0 }
              return (
                <div className="text-slate-50">
                  {item.question + 1} - { item.choose === item.correctAnswer ? <span className='text-teal-600'>Acertou</span> : <span className='text-rose-600'>Errou</span> } 
                </div>
              )
            })
          }
          <p className="text-slate-300 mt-10">Total de pontos: <span className="text-teal-600">{points}</span></p>
        </div>
      )
    }
      
    return (
      <div className="flex flex-col gap-10 justify-center items-center p-10">
        <div className="flex flex-col justify-center items-center min-w-[600px] border border-slate-800 p-10 rounded-xl text-slate-300 p-10 bg-slate-900">
          <IconCircleCheck size={128} className="text-teal-600" />

          <h2 className="text-slate-100 text-3xl mb-5">Parabéns</h2>
          <p className="text-slate-400 mb-10">Você chegou ao fim de do QUIZ DEMO <br /> Clique em finalizar para ver o resultado.</p>

          <button
            className="bg-purple-600 rounded-xl border border-purple-700 py-3 px-5 text-slate-300 w-full shadow-lg"
            onClick={() => setShowResult(true)}
          >
            Ver Resultado
          </button>
          
        </div>    
      </div>
    )
  }
  
  return (
    <div className="flex flex-col justify-center items-center p-10">
      <div className="min-w-[600px] border border-slate-800 p-10 rounded-xl text-slate-300 p-10 shadow-lg bg-slate-900">
        <div className="mb-10">
          <p className="text-slate-300 mb-5">
            {quizerJson[currentQuestion].question}
          </p>

          {
            quizerJson[currentQuestion].answerType === "text" ? (
              <textarea
                className="w-full  border border-slate-800 bg-slate-900 p-3 rounded-xl text-slate-400"
                placeholder="Digite aqui sua resposta..."
                onChange={(event) => handleChoose(event.target.value, quizerJson[currentQuestion].answerType)}
              />
            )
              :
              quizerJson[currentQuestion].answers.length > 0 ?
                quizerJson[currentQuestion].answers.map((item: any, index: number) => {
                  return (
                    <label
                      key={index}
                      className={choose === index.toString() || chooseGroup.includes(index.toString()) ? "flex flex-row border border-teal-600 p-3 rounded-xl mb-1 items-center text-teal-600" : "flex flex-row border border-slate-800 p-3 rounded-xl mb-1 items-center text-slate-500" }
                      htmlFor={`answer_${quizerJson[currentQuestion].uid}_${index}`}
                    >

                      {
                        quizerJson[currentQuestion].answerType === "checkbox" ? (
                          <input
                            className="mr-2 hidden"
                            type="checkbox"
                            id={`answer_${quizerJson[currentQuestion].uid}_${index}`}
                            value={index}
                            checked={chooseGroup.includes(index.toString())}
                            onChange={(event) => handleChoose(event.target.value, quizerJson[currentQuestion].answerType) }
                          />
                        ) : quizerJson[currentQuestion].answerType === "radio" ? (
                          <input
                            className="mr-2 hidden"
                            type="radio"
                            id={`answer_${quizerJson[currentQuestion].uid}_${index}`}
                            name={`answer_${quizerJson[currentQuestion].uid}`}
                            value={index}
                            onChange={(event) => handleChoose(event.target.value, quizerJson[currentQuestion].answerType) }
                          />
                        ) : null
                      }
                      
                      {
                        choose === index.toString() ? (
                          <IconCircleCheck size={18} className="mr-1" />
                        )
                          : null
                      }
                      {item}
                    </label>
                  )
                })
                : null
          }
        </div>

        <div className="flex flex-row gap-5">
          {
            currentQuestion < quizerJson.length ? (
              <button
                className="bg-purple-600 rounded-xl border border-purple-700 py-3 px-5 text-slate-300 w-full shadow-lg"
                onClick={() => handleNextQuestion(currentQuestion, quizerJson[currentQuestion].answerType) }
              >
                Próximo
              </button>
            )
              : null
          }
          
        </div>
      </div>
    </div>
  )
}


export { Quizer }
