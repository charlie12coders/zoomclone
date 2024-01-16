import { SocketProvider } from "./providers/Socket";
import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import Room from "./Pages/Room";

function App() {
  return (
    <div className="App">
      <SocketProvider>
        <Routes>
          <Route element={<HomePage />} path="/" />
          <Route element={<Room />} path="/room/:id" />
        </Routes>
      </SocketProvider>
    </div>
  );
}

export default App;
