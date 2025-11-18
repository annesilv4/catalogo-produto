import './App.css';
import { Header } from "./components/header/header";
import { Produto } from './components/produto/produto';
import { NewProduto } from './components/newProduto/newProduto';
import { Routes, Route } from "react-router-dom";

function App() {
    return (
        <main>
            <Header />

            <Routes>
                <Route path="/" element={<Produto />} />
                <Route path="/newProduto" element={<NewProduto />} />
            </Routes>
        </main>
    )
}

export default App;

