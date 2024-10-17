import { Routes, Route, Navigate } from "react-router-dom";
import PublicLayout from "./components/layout/PublicLayout";
import Home from "./screens/home/Home";
import Sign from "./screens/Sign";
import LoadingPage from "./screens/LoadingPage/LoadingPage";
import CarouselPage from "./screens/Carousel/CarouselPage";
import SinglePost from "./screens/SinglePost";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<PublicLayout />}>
        <Route path="/" element={<Navigate to="/latest" replace={true} />} />

        <Route path=":category" element={<Home />} />
        <Route path="news/:category/:id" element={<SinglePost />} />
      </Route>
      <Route path="sign" element={<Sign />} />
      <Route path="loading" element={<LoadingPage />} />
      <Route>
        <Route path="Carousel" element={<CarouselPage />} />
      </Route>
    </Routes>
  );
}

export default App;
