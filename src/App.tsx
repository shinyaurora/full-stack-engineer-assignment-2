import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/agents/:id" element={<h1>Detail Page</h1>}></Route>
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </Router>
  )
}