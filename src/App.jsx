import './App.css';
import { Header } from "./components/header/header";
import { Produto } from './pages/produto/produto';
import { NewProduto } from './pages/newProduto/newProduto';
import { Routes, Route } from "react-router-dom";
import { Footer } from './components/footer/footer';

function App() {
    return (
        <>
            <Header />
            <main>
                <Routes>
                    <Route path="/" element={<Produto />} />
                    <Route path="/newProduto" element={<NewProduto />} />
                </Routes>
            </main>

            <Footer/>
        </>
    )
}

export default App;

