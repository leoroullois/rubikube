import CSS from "../styles/navbar.module.css"

const Navbar = () => {
    return (
    <nav className={CSS.nav}>
        <a href="/">RUBIKUBE</a>
        <div className={CSS.links}>
        <a href="/">Accueil</a>
        <a href="/algo">Page Algo</a>
        <a href="/jouer">Page jouer</a>
        </div>
    </nav>)
}
export default Navbar