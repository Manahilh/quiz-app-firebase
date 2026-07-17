import { useEffect, useState } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from './firebase'
import Signup from './pages/signup'
import Login from './pages/login'
import Home from './pages/home'
import './App.css'

const questions = [
  { q: 'How many elements are in the periodic table?', o1: '118', o2: '115', o3: '120', ans: '118' },
  { q: 'Which planet is closest to the sun?', o1: 'Venus', o2: 'Mercury', o3: 'Mars', ans: 'Mercury' },
  { q: 'How many bones do we have in an ear?', o1: '5', o2: '2', o3: '3', ans: '3' },
  { q: 'What is the chemical element with the symbol Fe?', o1: 'Iron', o2: 'Gold', o3: 'Silver', ans: 'Iron' },
  { q: 'What is the smallest unit of matter?', o1: 'Molecule', o2: 'Atom', o3: 'Electron', ans: 'Atom' },
  { q: 'What is the process by which a liquid changes into a gas?', o1: 'Freezing', o2: 'Condensation', o3: 'Evaporation', ans: 'Evaporation' },
  { q: 'Which planet has the most moons?', o1: 'Jupiter', o2: 'Saturn', o3: 'Uranus', ans: 'Saturn' },
  { q: 'Where is the strongest human muscle located?', o1: 'Jaw', o2: 'Leg', o3: 'Heart', ans: 'Jaw' },
  { q: 'Which is the only body part that is fully grown from birth?', o1: 'Ears', o2: 'Nose', o3: 'Eyes', ans: 'Eyes' },
  { q: 'What is the outermost layer of the Earth’s atmosphere called?', o1: 'Stratosphere', o2: 'Exosphere', o3: 'Mesosphere', ans: 'Exosphere' },
  { q: 'What is the process by which plants convert sunlight to energy?', o1: 'Photosynthesis', o2: 'Respiration', o3: 'Osmosis', ans: 'Photosynthesis' },
  { q: 'What scientific theory proposed that Earth revolves around the sun?', o1: 'Evolution', o2: 'Heliocentrism', o3: 'Big Bang', ans: 'Heliocentrism' }
]

function QuizPage() {
  const [index, setIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(240)
  const [selectedOption, setSelectedOption] = useState('')

  const navigate = useNavigate()
  const currentQuestion = questions[index]

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTimeLeft((previousTime) => {
        if (previousTime <= 1) {
          window.clearInterval(timer)
          window.alert("Time's Up!")
          setIndex(0)
          setScore(0)
          setSelectedOption('')
          return 240
        }
        return previousTime - 1
      })
    }, 1000)

    return () => window.clearInterval(timer)
  }, [])

  const formatTime = (value) => {
    const mins = Math.floor(value / 60)
    const secs = value % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleNextQuestion = () => {
    if (!selectedOption) return

    const selectedText = currentQuestion[`o${selectedOption}`]
    const isCorrect = selectedText === currentQuestion.ans

    if (isCorrect) {
      setScore((previousScore) => previousScore + 1)
    }

    if (index + 1 < questions.length) {
      setIndex((previousIndex) => previousIndex + 1)
      setSelectedOption('')
    } else {
      window.alert(`Quiz Finished! Score: ${score + (isCorrect ? 1 : 0)}`)
      setIndex(0)
      setScore(0)
      setSelectedOption('')
      setTimeLeft(240)
    }
  }

  const handleLogout = async () => {
    try {
      await signOut(auth)
      navigate('/login')
    } catch (error) {
      window.alert(error.message)
    }
  }

  return (
    <div className="app-shell">
      <div className="app-card quiz-section">
        <div className="quiz-topbar">
          <span className="badge">Question {index + 1}/{questions.length}</span>
          <span className="timer">⏱ {formatTime(timeLeft)}</span>
        </div>

        <h2>{currentQuestion.q}</h2>

        <div className="options-list">
          <label className="option-item">
            <input className="options" type="radio" name="quiz" value="1" checked={selectedOption === '1'} onChange={() => setSelectedOption('1')} />
            <span>{currentQuestion.o1}</span>
          </label>

          <label className="option-item">
            <input className="options" type="radio" name="quiz" value="2" checked={selectedOption === '2'} onChange={() => setSelectedOption('2')} />
            <span>{currentQuestion.o2}</span>
          </label>

          <label className="option-item">
            <input className="options" type="radio" name="quiz" value="3" checked={selectedOption === '3'} onChange={() => setSelectedOption('3')} />
            <span>{currentQuestion.o3}</span>
          </label>
        </div>

        <div className="quiz-actions">
          <button className="primary-btn" onClick={handleNextQuestion}>Next</button>
          <button className="secondary-btn" onClick={handleLogout}>Logout</button>
          <span className="score">Score: {score}</span>
        </div>
      </div>
    </div>
  )
}

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  if (loading) {
    return (
      <div className="app-shell">
        <div className="app-card">Loading...</div>
      </div>
    )
  }

  return (
    <Routes>
      <Route path="/" element={user ? <Navigate to="/quiz" replace /> : <Login />} />
      <Route path="/login" element={user ? <Navigate to="/quiz" replace /> : <Login />} />
      <Route path="/signup" element={user ? <Navigate to="/quiz" replace /> : <Signup />} />
      <Route path="/quiz" element={user ? <QuizPage /> : <Navigate to="/login" replace />} />
      <Route path="/home" element={user ? <Home /> : <Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to={user ? "/quiz" : "/login"} replace />} />
    </Routes>
  )
}

export default App
