import { Typography, Link } from "../components/Mui.js"

const Footer = (props) => {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="https://github.com/mateteus313">
          React Project - Matheus
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
}

export default Footer;