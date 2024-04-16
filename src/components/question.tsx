"use client"

import * as React from "react"
import { v4 as uuidv4 } from "uuid"

const Question = () => {

  // States to handle with questions
  const [inputQuestion, setInputQuestion] = React.useState<string>("")
  const [inputPoint, setInputPoint] = React.useState("")

  const [inputQuestionUpdate, setInputQuestionUpdate] = React.useState<string>("")
  const [inputPointUpdate, setInputPointUpdate] = React.useState("")
  
  const [indexes, setIndexes] = React.useState<number>(0)
  const [questions, setQuestions] = React.useState<any>([])
  const [showModal, setShowModal] = React.useState<boolean>(false)

  // States to handle with answers
  const [inputAnswer, setInputAnswer] = React.useState<string>("")
  const [answers, setAnswers] = React.useState([])
  
  const checkboxRef = React.useRef<any>(null)
  const [showSectionAnswers, setShowSectionAnswers] = React.useState<boolean>(false)


  // Get all checkbox checked as correct
  const [corrects, setCorrects] = React.useState<any>([])

  const handleModal = (index: number) => {
    setInputQuestionUpdate(questions[index].question)
    setInputPointUpdate(questions[index].point)
    setIndexes(index)
    
    setShowModal(true)
  }
  
  const handleAddQuestion = () => {
    if(inputQuestion !== null && inputQuestion !== "") {
      const uid = uuidv4()
      setQuestions([
        ...questions,
        {
          uid: uid,
          question: inputQuestion,
          answers: [],
          corrects: [],
          point: inputPoint
        }
      ])

      console.log(questions)
    }

    setInputQuestion("")
    setInputPoint("")
  }

  const handleEditQuestion = () => {
    const updateQuestion = [...questions]
    updateQuestion[indexes] = { uid: questions[indexes].uid, question: inputQuestionUpdate, answers: [], point: inputPointUpdate }
    setQuestions(updateQuestion)
    setShowModal(false)
    
    setInputQuestionUpdate("")
    setInputPointUpdate("")
  }

  const handleDeleteOption = (index: number) => {
    const removeQuestion = [...questions]
    removeQuestion.splice(index, 1)
    setQuestions(removeQuestion)
  }

  const handleShowAnswerSection = (questionUID: string) => {
    const currentSection = document.querySelector(`#section_answer_${questionUID}`)
    currentSection.classList.toggle("hidden")
  }

  const handleCreateAswers = (index: number) => {
    const uid = uuidv4()
    setAnswers([...answers, inputAnswer ])
    setInputAnswer("")
  }

  const handleSaveAnswers = (index: number, questionUID: string) => {

    if(corrects.length <= 0) {
      
      alert("Selecione uma opção correta!")
      
    } else { 
      const addAnswers = [...questions]
      addAnswers[index] = {...addAnswers[index], answers: answers, corrects: corrects }
      setQuestions(addAnswers)
      
      const currentSection = document.querySelector(`#section_answer_${questionUID}`)
      currentSection.classList.add("hidden")
      
      setInputAnswer("")
      setAnswers([])
      setCorrects([])
    }
  }
  
  const handleDefineCorrectAnswer = (value, indexQuestion) => {
    if(corrects.includes(value)) {
      setCorrects(corrects.filter(item => item !== value));
    } else {
      setCorrects([...corrects, value])
    }
  }
  
  return (
    <React.Fragment>
    {
      showModal ? (
        <div className="flex flex-col m-0 p-0 w-full h-full absolute justify-center items-center bg-slate-900/[.5] backdrop-filter backdrop-blur-lg">
          <div className="w-[800px] h-[400px] bg-slate-900 rounded-0 shadow-xl px-10 py-5">
            <div className="flex justify-end">
              <button onClick={() => setShowModal(false)}>
                <h5 className="text-[32px] text-slate-500">×</h5>
              </button>
            </div>
            <div className="">
              <label className="text-slate-300">Digite a aquestão no campo abaixo: </label>
              <textarea
                rows="3"
                value={inputQuestionUpdate}
                className="w-full border border-slate-950 text-slate-400 rounded-xl bg-slate-900 p-3"
                onChange={(event) => setInputQuestionUpdate(event.target.value)}
              /> 
            </div>
            
            <div className="flex flex-col w-full mb-5">
              <label className="text-slate-300">Pontuação: </label>
              <input
                className="w-full border border-slate-950 bg-slate-900 rounded-xl text-slate-400  p-3"
                value={inputPointUpdate}
                onChange={(event) => setInputPointUpdate(event.target.value)}
              />
            </div>
            
            <div className="flex justify-end">
              <button
                className="bg-purple-600 rounded-xl border border-purple-700 py-2 px-4 shadow text-slate-50"
                onClick={handleEditQuestion}
              >
                Atualizar Questão
              </button>
            </div>
          </div>
        </div>
      )
        : null
    }
    
    <div className="flex flex-col w-full h-full p-10">
      <div className="flex flex-col lg:grid lg:grid-cols-3 gap-10">
        <div className="flex flex-col p-10 shadow-lg bg-slate-900 rounded-xl border border-slate-800">
          <div className="flex flex-col w-full mb-5">
            <label className="text-slate-300">Digite a aquestão no campo abaixo: </label>
            <textarea
              rows="3"
              className="w-full mt-3 border border-slate-950 rounded-xl bg-slate-900 p-3 text-slate-400"
              value={inputQuestion}
              onChange={(event) => setInputQuestion(event.target.value)}
            /> 
          </div>
          <div className="flex flex-col w-full mb-5">
            <label className="text-slate-300">Pontuação: </label>
            <input
              className="w-full mt-3 border border-slate-950 rounded-xl p-3 bg-slate-900 text-slate-400"
              value={inputPoint}
              onChange={(event) => setInputPoint(event.target.value)}
            />
          </div>
          <div className="flex justify-end">
            <button
              className="bg-purple-600 rounded-xl border border-purple-700 py-2 px-4 shadow text-slate-50"
              onClick={handleAddQuestion}
            >
              Adicionar Questão
            </button>
          </div>
        </div>
        
        <div className="flex flex-col">
          <div className="flex flex-col">
            {
              questions.length > 0 ?
                questions.map((item: any, index: number) => {
                  return (
                    <div key={index} className="flex flex-col w-full mb-3 p-5 bg-slate-900 shadow text-slate-400 rounded-xl border border-slate-800">
                      <div className="">
                        <div className="p-5 bg-slate-800 rounded-t-xl">
                          <p>{item.question} <small className="italic text-green-500">({item.point} pontos)</small></p>
                        </div>
                        <div className="flex justify-end bg-slate-950 py-2 px-5 rounded-b-xl shadow">
                          <button
                            className="text-teal-600 mr-5 hover:underline"
                            onClick={() => handleModal(index)}>
                            Editar
                          </button>
                          
                          <button
                            className="text-purple-600 mr-5 hover:underline"
                            onClick={() => handleShowAnswerSection(item.uid)}>
                            Respostas
                          </button>
                          
                          <button
                            className="text-rose-600 hover:underline"
                            onClick={() => handleDeleteOption(index)}>
                            Excluir
                          </button>
                        </div>
                      </div>
                      
                      <section id={`section_answer_${item.uid}`} className="hidden flex flex-col p-5 border border-slate-950 mt-5">
                        <div className="mb-5 w-full">
                          <textarea
                            className="w-full border border-slate-950 rounded-xl bg-slate-900 p-3 text-slate-400"
                            placeholder="Digite uma resposta..."
                            value={inputAnswer}
                            onChange={(event) => setInputAnswer(event.target.value)}
                          />
                        </div>

                        <div className="flex justify-end">
                          <button
                            className="bg-purple-600 rounded-xl border border-purple-700 py-2 px-4 shadow text-slate-50"
                            onClick={() => handleCreateAswers(index)}
                          >
                            Adicionar Possibilidade
                          </button>
                        </div>

                        <div className="flex flex-col w-full mt-10">
                          <p className="mb-3">Selecione a(s) alternativa(s) correta em seguida clique em <strong>Salvar Possibilidades de Resposta</strong>: </p>
                          <ul>
                            {
                              answers.length > 0 ?
                                answers.map((asw: any, key: number) => {
                                  return (
                                    <li key={key} className={corrects.includes(key.toString()) ? "p-3 rounded-xl bg-slate-800 mb-1 border border-teal-600 cursor-pointer":  "p-3 rounded-xl mb-1 border border-slate-800 cursor-pointer"}>
                                      <label htmlFor={`item_answer_${key}`} className="cursor-pointer">
                                        <input
                                          id={`item_answer_${key}`}
                                          className="mr-3 hidden"
                                          type="checkbox"
                                          value={key}
                                          onChange={(event) => handleDefineCorrectAnswer(event.target.value, index)} />
                                        <p className={corrects.includes(key.toString()) ? "text-teal-600" : "text-slate-500"}>
                                          {corrects.includes(key.toString()) ? "✔" : ""}
                                          <span className="ml-2">{asw}</span> 
                                        </p>
                                      </label>
                                    </li>
                                  )
                                })
                                : null
                            }
                          </ul>

                          {
                            answers.length > 1 ? (
                              <div className="mt-5">
                                <button
                                  className="bg-teal-600 rounded-xl border border-teal-700 py-2 px-4 shadow text-slate-50"
                                  onClick={() => handleSaveAnswers(index, item.uid)}
                                >
                                  Salvar Respostas
                                </button>
                              </div>
                            ) : null
                          }
                          
                        </div>
                      </section>
                      
                      <div className="mt-3">
                        <ul className="border-slate-800">
                          {
                            item.answers.length > 0 ?
                              item.answers.map((answ: any, index: number) => {
                                return (
                                  <li key={index} className={item.corrects.includes(index.toString()) ? "p-3 rounded-xl bg-slate-800 mb-1 border border-teal-600":  "p-3 rounded-xl mb-1 border border-transparent"}>
                                    <input className="hidden mr-3" type="checkbox" value={index} checked={item.corrects.includes(index.toString())} />
                                    <p className={item.corrects.includes(index.toString()) ? "text-teal-600" : "text-slate-400"}>
                                      {item.corrects.includes(index.toString()) ? "✔" : ""}
                                      <span className="ml-2">{answ}</span> 
                                    </p>
                                  </li>
                                )
                              })
                              : (
                                <div className="mt-10 text-slate-500 text-center">
                                  <p>Ainda nao possibilidades de resposta.</p>
                                </div>
                              )
                          }
                        </ul>
                      </div>
                      
                      
                    </div>
                  )
                })
                :
                (
                  <div className="flex justify-center">
                    <p className="text-lg text-slate-500">Nenhuma pergunta cadastrada.</p>
                  </div>
                )
            }
          </div>
        </div>
        
        <div className="border border-slate-800 rounded-xl bg-slate-900 min-h-[500px] overflow-hidden">
          <div className="p-5 bg-slate-800">
            <h4 className="text-slate-300 text-md">Visualização do JSON</h4>
          </div>
          
          <div className="p-5 overflow-y-scroll">
            <pre className="text-slate-400">
              {
                JSON.stringify(questions, null, '\t')
              }
            </pre>
          </div>
        </div>
      </div>

    </div>
    </React.Fragment>
  )
}

export { Question }
