import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<h1>Home</h1>} />
          <Route path="/agents/:id" element={<h1>Detail Page</h1>}></Route>
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </Router>
    </Provider>
  )
}