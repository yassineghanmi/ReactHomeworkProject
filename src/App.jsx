import { Suspense, lazy } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { NavigationBar } from "./components/NavigationBar";
import { EventForm } from "./components/EventForm";
import { Container } from "react-bootstrap";
import { EventDetails } from "./components/EventDetails";
import { FormEvent } from "./components/FormEvent";
import { fetchEvents } from "./redux/slices/eventSlice";
import { useDispatch } from "react-redux";
const Events = lazy(() => import("./components/Events"));

function App() {
  const dispatch = useDispatch();

  return (
    <Container fluid>
      <NavigationBar />
      <Suspense fallback={<p>Chargement</p>}>
        <Routes>
          <Route path="/">
            <Route
              index
              element={<Events />}
              loader={dispatch(fetchEvents())}
            />
            <Route path=":id" element={<EventDetails />} />

            <Route path="add" element={<EventForm action="add" />} />
            <Route path="addForm" element={<FormEvent />} />
            <Route path="update/:id" element={<EventForm action="update" />} />
          </Route>
          <Route path="*" element={<img src="/images/404.png" />} />
        </Routes>
      </Suspense>
    </Container>
  );
}

export default App;
