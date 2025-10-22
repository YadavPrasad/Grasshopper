import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage.tsx'
import QuizForm from './pages/QuizForm.tsx'
import QuizPage from './pages/QuizPage.tsx'

function App() {
 return(
   <BrowserRouter>
      <Routes>
         <Route path="/" element={<LandingPage/>}/>
         <Route path="/QuizForm" element={<QuizForm/>}/>
         <Route path="/quiz" element={<QuizPage />} />
      </Routes>
   </BrowserRouter>
 )
}

export default App
