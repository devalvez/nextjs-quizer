"use client"

import * as React from "react"
import { v4 as uuidv4 } from "uuid"

const QuizerForm = () => {

  const [inputQuestion, setInputQuestion] = React.useState<string>("")
  const [inputPoints, setInputPoints] = React.useState<number>(0)
  const [questions, setQuestions] = React.useState<any>([])

  const [showModal, setShowModal] = React.useState<boolean>(false)
  const [showModalAnswer, setShowModalAnswer] = React.useState<boolean>(false)

  const [indexes, setIndexes] = React.useState<number>(0)
  const [inputUpdateQuestion, setInputUpdateQuestion] = React.useState<string>("")
  const [inputUpdatePoints, setInputUpdatePoints] = React.useState<number>(0)

  const [answerType, setAnswerType] = React.useState<string>("radio")
  const [inputAnswer, setInputAnswer] = React.useState<string>("")
  const [answers, setAnswers] = React.useState<any>([])

  const [inputCorrect, setInputCorrect] = React.useState<string>("")
  const [corrects, setCorrects] = React.useState<any>([])

  const [updateAnswer, setUpdateAnswer] = React.useState<any>()

  const handleAddQuestion = () => {
    if (inputQuestion !== "") {
      const uid = uuidv4()
      setQuestions([
        ...questions,
        {
          uid: uid,
          question: inputQuestion,
          answerType: null,
          answers: [],
          point: inputPoints
        }
      ])

      setInputQuestion("")
      setInputPoints(0)
    } else {
      alert("Digite uma pergunta antes.")
    }
  }

  const handleOpenModal = (indexQuestion: number) => {
    setShowModal(true)
    
    setIndexes(indexQuestion)
    setInputUpdateQuestion(questions[indexQuestion].question)
    setInputUpdatePoints(questions[indexQuestion].point)
  }

  const handleUpdateQuestion = () => {
    const updateQuestion = [...questions]
    updateQuestion[indexes] = {
      ...updateQuestion[indexes],

      uid: updateQuestion[indexes].uid,
      question: inputUpdateQuestion,
      answerType: updateQuestion[indexes].answerType,
      answers: updateQuestion[indexes].answers,
      point: inputUpdatePoints,
    }

    setQuestions(updateQuestion)

    setInputUpdateQuestion("")
    setInputUpdatePoints(0)
    setShowModal(false)
  }

  const handleDeleteOption = (index: number) => {
    const removeQuestion = [...questions]
    removeQuestion.splice(index, 1)
    setQuestions(removeQuestion)
  }

  const handleToggleAnswerSection = (sectionAnswer: string) => {
    document.querySelector(`#${sectionAnswer}`)?.classList.toggle("hidden")
  }
  
  const handleAddAnswer = () => {
    if(answerType === "text" || answerType === "radio") {
      if(inputAnswer !== "" && inputAnswer !== null) {
        setAnswers([...answers, inputAnswer])
        setInputAnswer("")
      } else {
        alert("Digite uma opção.")
      }
    } else {
      if(answerType === "checkbox") {
        if(!answers.includes(inputAnswer)) {
          setAnswers([...answers, inputAnswer])
          setInputAnswer("")
        } else {
          alert("A alteranativa informada já existe.")
        }
      }
    }
  }

  const handleSaveAnswer = (indexQuestion: number, sectionAnswer: string) => {
    const addAnswers = [...questions]

    if(answerType !== "" && answerType === "radio") {
      if(inputCorrect !== "") {
        addAnswers[indexQuestion] = { ...addAnswers[indexQuestion], answerType: answerType,  answers: answers, correctAnswer: inputCorrect }
        setQuestions(addAnswers)
        
        setInputCorrect("")
        setAnswers([])
        
        handleToggleAnswerSection(sectionAnswer)
      } else {
        alert("Defina um alternativa como correta.")
      }
    }
    
    if(answerType !== "" && answerType === "checkbox") {
      addAnswers[indexQuestion] = { ...addAnswers[indexQuestion], answerType: answerType,  answers: answers, correctAnswer: corrects }
      setQuestions(addAnswers)

      handleToggleAnswerSection(sectionAnswer)
      
      setAnswers([])
    }

    if(answerType === "text") {
      addAnswers[indexQuestion] = { ...addAnswers[indexQuestion], answerType: answerType, answers: answers, correctAnswer: inputCorrect }
      setQuestions(addAnswers)
      
      handleToggleAnswerSection(sectionAnswer)
    }
  }

  const  handleDefineCorrectAnswers = (checkboxValue) => {
    if(corrects.includes(checkboxValue)) {
      setCorrects(corrects.filter(item => item !== checkboxValue)) 
    } else {
      setCorrects([...corrects, checkboxValue])
    }
  }

  const handleModalAnswerEdit = (indexQuestion: number, answerToEdit: number) => {
    setInputUpdateAnswer(questions[indexQuestion].answers[answerToEdit])
  }
  
  const handleUpdateAnswerModal = (indexQuestion: number, answerToEdit: any) => {
    const updateAnswer = [...questions]
    if(inputUpdateAnswer !== "") {
      if(updateAnswer[indexQuestion].answerType === "text") {
        updateAnswer[indexQuestion] = { ...updateAnswer[indexQuestion], correctAnswer: null }
      }
    }

    if(updateAnswer[indexQuestion].answerType === "radio") {
      if(inputUpdateAnswer !== "") {
        updateAnswer[indexQuestion] = { ...updateAnswer[indexQuestion].answers[answerToEdit], answers: inputUpdateAnswer }
      }
    }
  }

  const handleDeleteAnswer = (indexQuestion: any, indexAnswer: any) => {
    setUpdateAnswer(questions[indexQuestion].answers)
    
    setTimeout(() => {
      setUpdateAnswer(updateAnswer => updateAnswer.filter((item, index) => index !== indexAnswer))
    }, 300)
    
    if(questions[indexQuestion].answerType === "radio") {
      if(updateAnswer.length > 2) { 
        const removeAnswer = [...questions]
        removeAnswer[indexQuestion] = { ...removeAnswer[indexQuestion], answers: updateAnswer }
      } else {
        alert("Esse tipo de resposta não pode conter menos de 2 opções")
      }
    }

  }

  
  return (
    <React.Fragment>
    {
      showModal ? (
        <div className="flex flex-col justify-center items-center bg-slate-900/[.5] absolute w-screen h-screen backdrop-blur">
          <div className="rounded-xl border border-slate-800 bg-slate-900 overflow-hidden shadow-xl shadow-purple-900/[.3] w-[500px] min-h-[400px] max-h-[800px]">
            <div className="w-full p-3 bg-slate-800 relative">
              <h4 className="text-slate-300">Editar Pergunta</h4>

              <button className="text-slate-600 absolute top-[5px] right-[16px] hover:text-slate-100"
                onClick={() => setShowModal(false)}>
                <span className="text-3xl">×</span>
              </button>
            </div>

            <div className="p-5">

              <div className="mb-5 flex flex-col">
                <label
                  className="text-slate-300 mb-3"
                  htmlFor="question">Pergunta:</label>
                <textarea
                  className="p-3 bg-slate-900 border border-slate-950 rounded-xl text-slate-400 focus:outline-purple-600"
                  placeholder="Digite aqui a pergunta"
                  value={inputUpdateQuestion}
                  onChange={(event: any) => setInputUpdateQuestion(event.target.value)}
                />
              </div>
              
              <div className="mb-5 flex flex-col">
                <label
                  className="text-slate-300 mb-3"
                  htmlFor="question">Pontuação da pergunta:</label>
                <input
                  type="number"
                  className="p-3 bg-slate-900 border border-slate-950 rounded-xl text-slate-400 focus:outline-purple-600"
                  placeholder="Pontuação da pergunta"
                  value={inputUpdatePoints}
                  onChange={(event: any) => setInputUpdatePoints(event.target.value)}
                />
              </div>

              <div className="mb-3 flex justify-end">
                <button
                  className="py-2 px-4 bg-purple-600 hover:bg-purple-700 border-purple-700 hover:border-purple-800 text-slate-200 rounded-xl shadow-md"
                  onClick={handleUpdateQuestion}>
                  Atualizar Pergunta
                </button>
              </div>
            </div>

          </div>
        </div>

      ) : null
    }
    
    <div className="w-full p-10">
      <div className="w-full flex flex-col lg:grid lg:grid-cols-3 gap-10">

        <div className="w-full border border-slate-800 rounded-xl overflow-hidden shadow bg-slate-900">
          <div className="w-full py-3 px-5 bg-slate-800 mb-5">
            <h4 className="text-slate-200 text-lg">Pergunta</h4>
            <p className="text-slate-500">Crie a pergunta de defina a sua pontuação.</p>
          </div>
          <div className="flex flex-col p-5">

            <div className="mb-5 flex flex-col">
              <label
                className="text-slate-300 mb-3"
                htmlFor="question">Pergunta:</label>
              <textarea
                className="p-3 bg-slate-900 border border-slate-950 rounded-xl text-slate-400 focus:outline-purple-600"
            placeholder="Digite aqui a pergunta"
            value={inputQuestion}
            onChange={(event: any) => setInputQuestion(event.target.value)}
          />
        </div>

        <div className="mb-5 flex flex-col">
          <label
            className="text-slate-300 mb-3"
            htmlFor="question">Pontuação da pergunta:</label>
          <input
            type="number"
            className="p-3 bg-slate-900 border border-slate-950 rounded-xl text-slate-400 focus:outline-purple-600"
            placeholder="Pontuação da pergunta"
            value={inputPoints}
            onChange={(event: any) => setInputPoints(event.target.value)}
          />
        </div>

        <div className="mb-3 flex justify-end">
          <button
            className="py-2 px-4 bg-purple-600 hover:bg-purple-700 border-purple-700 hover:border-purple-800 text-slate-200 rounded-xl shadow-md"
            onClick={handleAddQuestion}>
            Adicionar Pergunta
          </button>
        </div>
      </div>
    </div>

    <div className="w-full border border-slate-800 rounded-xl overflow-hidden shadow bg-slate-900">
    <div className="w-full py-3 px-5 bg-slate-800">
      <h4 className="text-slate-200 text-lg">Respostas</h4>
      <p className="text-slate-500">Crie as possibilidades de respostas e determine qual é a correta.</p>
    </div>
    <div className="flex flex-col p-5">
    {
      questions.map((item: any, index: number) => {
        return (

          <div key={index} className="border border-slate-800 rounded-xl overflow-hidden shadow-lg mb-5 bg-slate-900">
            <div>
              <div className="bg-slate-800 text-slate-200 p-3">
                <p>{item.question} <small className="text-green-500">({item.point} pontos)</small></p>
              </div>
              <div className="py-3 px-5 flex justify-end bg-slate-950">
                <button
                  className="text-sm text-teal-600 hover:underline mr-5"
                  onClick={() => handleOpenModal(index)}>
                  Editar
                </button>
                <button
                  className="text-sm text-purple-600 hover:underline mr-5"
                  onClick={() => handleToggleAnswerSection(`section_answers_${item.uid}`)}>
                  +Respostas
                </button>

                <button
                  className="text-sm text-rose-600 hover:underline mr-5"
                  onClick={() => handleDeleteOption(index)}>
                  Deletar
                </button>
              </div>
            </div>

            <div className="w-full p-5">
                <div key={index} className="flex flex-col w-full">
                  <ul>
                    {
                      item.answers.length > 0 && item.answerType === "radio" ?
                        item.answers.map((answer: any, answerIndex: number) => {
                          return (
                            <li key={answerIndex}>
                              <div className={item.correctAnswer === answerIndex.toString() ? "flex border border-teal-600 rounded-xl p-3 mb-1 text-teal-600" : "flex border border-slate-800 rounded-xl p-3 mb-1 text-slate-500"}>
                                <label className="ml-2">
                                  <input className="hidden" type="checkbox" value={answerIndex} checked={item.answers.includes(answerIndex.toString())} />
                                  <small className="mr-2">{ item.correctAnswer === answerIndex.toString() ? "✔" : "" }</small>
                                  { answer}
                                </label>
                              </div>                              
                            </li>
                          )
                        })
                        : item.answers.length > 0 && item.answerType === "checkbox" ?
                          item.answers.map((answer: any, answerIndex: number) => {
                            return (
                              <li key={answerIndex} className={item.correctAnswer[answerIndex] === answerIndex.toString() ? "flex border border-teal-600 rounded-xl p-3 mb-1 text-teal-600" : "flex border border-slate-800 rounded-xl p-3 mb-1 text-slate-500"}>
                                <label className="ml-2">
                                  <input className="hidden" type="checkbox" value={answerIndex} checked={item.answers.includes(answerIndex.toString())} />
                                  <small className="mr-2">{ item.correctAnswer[answerIndex] === answerIndex.toString() ? "✔" : "" }</small>
                                  { answer }
                                </label> 
                              </li>
                            )
                          })
                        : item.answers !== null > 0 && item.answerType === "text" ? (
                          <li>
                            <p className="w-full border border-rose-600 p-3 rounded-xl text-rose-600">A avaliação para esse tipo de pergunta é feita de forma manual.</p>
                          </li>
                        )
                          : null
                    }
                  </ul>
                </div>
              </div>
            
            <div className="p-5 hidden" id={`section_answers_${item.uid}`}>
              <p className="text-slate-500 mb-5">Digite no formulário abaixo a opção de resposta e clique em <strong>Adicionar Resposta</strong></p>
              <div className="flex flex-col">
                <div className="flex flex-col w-full mb-5">
                  <label
                    className="text-slate-300 mb-3"                            
                    htmlFor={`answer_type_${item.uid}`}>Selecione o tipo de resposta</label>
                  
                  <select
                    className="p-3 bg-slate-900 border border-slate-950 rounded-xl text-slate-400 focus:outline-purple-600"
                    id={`answer_type_${item.uid}`}
                    onChange={(event) => setAnswerType(event.target.value)}
                  >
                    <option value="text">Dissertativo</option>
                    <option value="radio" selected>Seleção Única</option>
                    <option value="checkbox">Multipla Escolha</option>
                  </select>
                </div>

              </div>

              {
                answerType !== "" && answerType === "checkbox" ? (
                  <div>

                    {
                      answers.length > 0 ?
                        answers.map((answer: any, answerIndex: number) => {
                          return (
                              <div key={answerIndex} className="flex flex-col w-full">
                                <ul className="">
                                  <li className="flex border border-slate-800 rounded-xl p-3 mb-3">
                                    <input
                                      type="checkbox"
                                      value={answerIndex}
                                      onChange={(event) => handleDefineCorrectAnswers(event.target.value)}
                                    />
                                    <p className="text-slate-300 ml-2">{answer}</p>
                                  </li>
                                </ul>
                              </div>
                            )
                        })
                        : null
                    }
                    
                    <div className="flex flex-col">
                      <div className="mb-5 flex flex-col">
                        <label
                          className="text-slate-300 mb-3"
                          htmlFor={`answer_${item.uid}`}>Digite uma resposta: </label>
                        <input
                          type="text"
                          id={`answer_${item.uid}`}
                          className="p-3 bg-slate-900 border border-slate-950 rounded-xl text-slate-400 focus:outline-purple-600"
                          placeholder="Digite aqui a resposta"
                          value={inputAnswer}
                          onChange={(event) => setInputAnswer(event.target.value)}
                        />
                      </div>
                      
                      <div className="mb-5 flex justify-end">
                        <button
                          className="py-2 px-4 bg-purple-600 hover:bg-purple-700 border-purple-700 hover:border-purple-800 text-slate-200 rounded-xl shadow-md"
                          onClick={() => handleAddAnswer()}>
                          Adicionar Opção
                        </button>
                      </div>

                      {
                      answers.length > 2 ? (
                        <div className="flex">
                          <button
                            className="w-full py-2 px-4 bg-teal-600 hover:bg-teal-700 border-teal-700 hover:border-teal-800 text-slate-200 rounded-xl shadow-md"
                            onClick={() => handleSaveAnswer(index, `section_answers_${item.uid}`)}>
                            Guardar Definições
                          </button>
                        </div>
                      ) : null
                    }

                    </div>
                  </div>
                )
                  : answerType !== null && answerType === "radio" ? (
                    <div>

                      {
                        answers.length > 0 ?
                          answers.map((answer: any, answerIndex: number) => {
                            return  (
                              <div className="flex flex-col w-full">
                                <ul className="mb-1">
                                  <li className="flex border border-slate-800 rounded-xl p-3 mb-3">
                                    <input
                                      name={`item_answer_${item.uid}`}
                                      id={`item_answer_${item.uid}_${answerIndex}`}
                                      type="radio"
                                      value={answerIndex}
                                      onChange={(event) => setInputCorrect(event.target.value)}
                                    />
                                    <p className="text-slate-300 ml-2">{answer}</p>
                                  </li>
                                </ul>
                              </div>
                            )
                          })
                          : null
                      }
                      
                      <div className="flex flex-col">                                
                        <div className="mb-5 flex flex-col">
                          <label
                            className="text-slate-300 mb-3"
                            htmlFor={`answer_${item.uid}`}>Digite uma resposta: </label>
                          <input
                            type="text"
                            id={`answer_${item.uid}`}
                            className="p-3 bg-slate-900 border border-slate-950 rounded-xl text-slate-400 focus:outline-purple-600"
                            placeholder="Digite aqui a resposta"
                            value={inputAnswer}
                            onChange={(event) => setInputAnswer(event.target.value)}
                          />
                        </div>
                        
                        <div className="mb-5 flex justify-end">
                          <button
                            className="py-2 px-4 bg-purple-600 hover:bg-purple-700 border-purple-700 hover:border-purple-800 text-slate-200 rounded-xl shadow-md"
                            onClick={() => handleAddAnswer()}>
                            Adicionar Opção
                          </button>
                        </div>
                      </div>

                    {
                      answers.length >= 2 ? (
                        <div className="flex">
                          <button
                            className="w-full py-2 px-4 bg-teal-600 hover:bg-teal-700 border-teal-700 hover:border-teal-800 text-slate-200 rounded-xl shadow-md"
                            onClick={() => handleSaveAnswer(index, `section_answers_${item.uid}`)}>
                            Guardar Definições
                          </button>
                        </div>
                      ) : null
                    }
                    
                    </div>
                    
                  ) : answerType !== null && answerType === "text" ? (
                    
                    <div className="flex flex-col">
                      <p className="w-full border border-rose-600 p-3 rounded-xl text-rose-600 mb-5">A avaliação para esse tipo de pergunta é feita de forma manual.</p>

                      <div className="flex">
                        <button
                          className="w-full py-2 px-4 bg-teal-600 hover:bg-teal-700 border-teal-700 hover:border-teal-800 text-slate-200 rounded-xl shadow-md"
                          onClick={() => handleSaveAnswer(index, `section_answers_${item.uid}`)}>
                          Guardar Definições
                        </button>
                      </div>
                    </div>
                  ) : null

                
              }
 
            </div>
          </div>
        )
      })
    }
    </div>
    </div>

    <div className="w-full border border-slate-800 rounded-xl overflow-hidden shadow bg-slate-900">
      <div className="w-full py-3 px-5 bg-slate-800">
        <h4 className="text-slate-200 text-lg">Visualizador JSON</h4>
        <p className="text-slate-500">Visualize a estrutura JSON do questionário.</p>
      </div>
      <div className="flex flex-col h-full p-5 overflow-scroll">
        <pre className="text-slate-400">

          {JSON.stringify(questions, null, '\t')}

        </pre>
      </div>
    </div>
    </div>
    </div>
    
    </React.Fragment>
  )
}

export { QuizerForm }
