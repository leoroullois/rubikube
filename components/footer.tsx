import CSS from "../styles/footer.module.css"

const Footer = () => {
    const year = new Date().getFullYear()
    return (
        <footer className={CSS.footer}>© {year} RUBIKUBE</footer>
    )
}

export default Footer