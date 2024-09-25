"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

const questions = [
  "Do you feel physically able to do this activity?",
  "Do you feel like you know how to do this or have the skills you need?",
  "Do you have everything you need to make this change, like the right tools or environment?",
  "Do you have support from friends, family, or others to help you do this?",
  "Do you believe this change is important for you and that it fits with your values or goals?",
  "Do you feel motivated or have a natural drive to do this, or does it feel more like a struggle?"
]

const questionImages = [
  "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=500&h=500&fit=crop",
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&h=500&fit=crop",
  "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=500&h=500&fit=crop",
  "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=500&h=500&fit=crop",
  "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=500&h=500&fit=crop",
  "https://images.unsplash.com/photo-1492681290082-e932832941e6?w=500&h=500&fit=crop"
]

const supportOptions = [
  ["Physical Exercises or Movement Suggestions", "Adapting the Task", "Breaking It Down into Steps"],
  ["Clear & Simple Instructions", "Learning Resources", "Practical Tips", "Practicing Together"],
  ["Help Finding Resources", "Making Your Environment Easier"],
  ["Working Out Who Can Support You", "Connecting with Supportive Groups", "Accountability buddy"],
  ["Talking About Your Goals", "Setting Personal Goals", "Looking at Benefits", "Sharing Helpful Information"],
  ["Creating Small Daily Habits", "Rewarding Yourself", "Talking About Emotional Barriers", "Imagining Success"]
]

const supportOptionImages = [
  [
    "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop",
    "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=200&h=200&fit=crop",
    "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=200&h=200&fit=crop"
  ],
  [
    "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=200&h=200&fit=crop",
    "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=200&h=200&fit=crop",
    "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=200&h=200&fit=crop",
    "https://images.unsplash.com/photo-1531498860502-7c67cf02f657?w=200&h=200&fit=crop"
  ],
  [
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=200&h=200&fit=crop",
    "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?w=200&h=200&fit=crop"
  ],
  [
    "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=200&h=200&fit=crop",
    "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=200&h=200&fit=crop",
    "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=200&h=200&fit=crop"
  ],
  [
    "https://images.unsplash.com/photo-1527689368864-3a821dbccc34?w=200&h=200&fit=crop",
    "https://images.unsplash.com/photo-1493612276216-ee3925520721?w=200&h=200&fit=crop",
    "https://images.unsplash.com/photo-1531379410502-63bfe8cdaf6f?w=200&h=200&fit=crop",
    "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=200&h=200&fit=crop"
  ],
  [
    "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=200&h=200&fit=crop",
    "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=200&h=200&fit=crop",
    "https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=200&h=200&fit=crop",
    "https://images.unsplash.com/photo-1533227268428-f9ed0900fb3b?w=200&h=200&fit=crop"
  ]
]

export default function EnhancedSelfManagementApp() {
  const [stage, setStage] = useState(0)
  const [goal, setGoal] = useState("")
  const [selectedOptions, setSelectedOptions] = useState<Array<{ text: string; image: string }>>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [currentOptions, setCurrentOptions] = useState<Array<{ text: string; image: string }>>([])

  useEffect(() => {
    if (stage === 0) {
      const timer = setTimeout(() => setStage(1), 5000)
      return () => clearTimeout(timer)
    }
  }, [stage])

  const handleNextStage = () => {
    if (stage === 1) {
      setStage(2) // Go to loading stage
      setTimeout(() => setStage(4), 1000) // Automatically go to first question after 1 second
    } else if (stage === 4) {
      setStage(5) // Go to support options after answering question
    } else if (stage === 5) {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prevIndex => prevIndex + 1)
        setStage(4) // Go back to question stage for the next question
        setCurrentOptions([]) // Reset current options for the next question
      } else {
        setStage(6) // Go to summary if all questions are answered
      }
    } else {
      setStage(prevStage => prevStage + 1)
    }
  }

  const handleOptionSelect = (option: string, image: string) => {
    setCurrentOptions(prevOptions => {
      const existingOption = prevOptions.find(o => o.text === option)
      if (existingOption) {
        return prevOptions.filter(o => o.text !== option)
      } else {
        return [...prevOptions, { text: option, image }]
      }
    })
  }

  const handleOptionConfirm = () => {
    setSelectedOptions(prevOptions => [...prevOptions, ...currentOptions])
    handleNextStage()
  }

  const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex flex-col items-center justify-center p-4 overflow-hidden">
      <AnimatePresence mode="wait">
        {stage === 0 && (
          <motion.div
            key="splash"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="text-center"
          >
            <motion.h1 
              className="text-6xl font-bold mb-4 text-white"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              Self-Management App
            </motion.h1>
            <motion.p 
              className="text-2xl text-white"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              Closed-ended model
            </motion.p>
            <motion.div
              className="mt-8"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.5, duration: 0.5 }}
            >
              <div className="w-16 h-16 border-t-4 border-white rounded-full animate-spin"></div>
            </motion.div>
          </motion.div>
        )}

        {stage === 1 && (
          <motion.div
            key="input"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md bg-white rounded-lg shadow-lg p-8"
          >
            <h2 className="text-3xl font-bold text-purple-600 mb-4">WHAT'S STOPPING ME?</h2>
            <p className="mb-4 text-gray-700">What are some things in your life that you're thinking about changing or improving?</p>
            <textarea
              className="w-full p-2 border rounded focus:ring-2 focus:ring-purple-300 focus:border-transparent transition"
              rows={5}
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              placeholder="Type here"
            />
            <motion.button
              className="mt-4 px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-semibold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNextStage}
            >
              NEXT
            </motion.button>
          </motion.div>
        )}

        {stage === 2 && (
          <motion.div
            key="processing"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
            className="text-center text-white"
          >
            <p className="text-2xl mb-4">Processing...</p>
            <div className="w-16 h-16 border-t-4 border-white rounded-full animate-spin mx-auto"></div>
          </motion.div>
        )}

        {stage === 4 && (
          <motion.div
            key={`question-${currentQuestionIndex}`}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md bg-white rounded-lg shadow-lg p-8"
          >
            <h2 className="text-3xl font-bold text-purple-600 mb-4">WHAT'S STOPPING ME?</h2>
            <p className="mb-4 text-gray-700">{questions[currentQuestionIndex]}</p>
            <div className="mb-4 h-40 bg-gradient-to-br from-blue-200 to-blue-400 rounded-lg flex items-center justify-center overflow-hidden">
              <Image
                src={questionImages[currentQuestionIndex]}
                alt={`Question ${currentQuestionIndex + 1}`}
                width={200}
                height={200}
                className="object-cover"
              />
            </div>
            <div className="flex justify-center space-x-4">
              <motion.button
                className="px-6 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full font-semibold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNextStage}
              >
                No
              </motion.button>
              <motion.button
                className="px-6 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full font-semibold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNextStage}
              >
                Yes
              </motion.button>
            </div>
            <div className="mt-6 bg-gray-200 h-2 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-purple-500"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </motion.div>
        )}

        {stage === 5 && (
          <motion.div
            key="options"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md bg-white rounded-lg shadow-lg p-8"
          >
            <h2 className="text-3xl font-bold text-purple-600 mb-4">WHAT'S STOPPING ME?</h2>
            <p className="mb-4 text-gray-700">Tell us if you think any of the support we can provide would be useful to you:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
              {supportOptions[currentQuestionIndex].map((option, index) => (
                <motion.div
                  key={index}
                  className={`bg-gradient-to-br ${
                    currentOptions.some(o => o.text === option) ? 'from-purple-200 to-pink-200 ring-2 ring-purple-500' : 'from-purple-100 to-pink-100'
                  } p-4 rounded-lg shadow cursor-pointer flex flex-col items-center`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleOptionSelect(option, supportOptionImages[currentQuestionIndex][index])}
                >
                  <Image
                    src={supportOptionImages[currentQuestionIndex][index]}
                    alt={option}
                    width={80}
                    height={80}
                    className="mb-2 rounded-lg"
                  />
                  <p className="text-sm text-center text-gray-700">{option}</p>
                </motion.div>
              ))}
            </div>
            <motion.button
              className="mt-6 px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-semibold w-full"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleOptionConfirm}
            >
              Confirm Selection
            </motion.button>
          </motion.div>
        )}

        {stage === 6 && (
          <motion.div
            key="summary"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md bg-white rounded-lg shadow-lg p-8"
          >
            <h2 className="text-3xl font-bold text-purple-600 mb-4">WHAT'S STOPPING ME?</h2>
            <p className="mb-4 text-gray-700">You said you wanted to change your life by:</p>
            <p className="font-bold mb-4 text-purple-700">{goal}</p>
            <p className="mb-4 text-gray-700">To do this, you've indicated that you could benefit from:</p>
            <ul className="space-y-2">
              {selectedOptions.map((option, index) => (
                <motion.li 
                  key={index} 
                  className="flex items-center bg-gradient-to-r from-purple-100 to-pink-100 p-2 rounded-lg shadow"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Image
                    src={option.image}
                    alt={option.text}
                    width={40}
                    height={40}
                    className="mr-2 rounded-full"
                  />
                  <span className="text-gray-700">{option.text}</span>
                </motion.li>
              ))}
            </ul>
            <motion.button
              className="mt-6 px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-semibold w-full"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setStage(0)}
            >
              Finish
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
