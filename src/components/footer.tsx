import scss from "@scss/footer.module.scss";

const Footer = () => {
   const year = new Date().getFullYear();
   return <footer className={scss.footer}>© {year} RUBIKUBE</footer>;
};

export default Footer;
