import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import { ThemeProvider } from "@/components/ThemeProvider";
import Agents from "./pages/Agents";
import AgentDetail from "./pages/AgentDetail";

export default function App() {
  return (
    <Provider store={store}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Router>
          <Routes>
            <Route path="/" element={<Agents />} />
            <Route path="/agents/:id" element={<AgentDetail />}></Route>
            <Route path="*" element={<h1>Not Found</h1>} />
          </Routes>
        </Router>
      </ThemeProvider>
    </Provider>
  )
}