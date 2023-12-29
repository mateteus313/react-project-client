import { Typography, Link } from "../components/Mui.js";
import "../css/footer.css"

const Footer = (props) => {
  return (
    <div className="footer">
      <div className="footer-wrapper">
        <div className="copyright">
          <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            {...props}
          >
            {"Copyright © "}
            <Link color="inherit" href="https://github.com/mateteus313">
              React Project - Matheus
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default Footer;
