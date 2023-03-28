'use cleint'
import Link from 'next/link';
import Styles from '../styles/page.module.css';
const Footer = ()=>{
    return (
        <footer className={Styles.footer}>Developed by: <Link href={`https://extend-alt-text.vercel.app/ogimage?=${Math.floor(Math.random() * 1083)}`}>🔵🔴🟢</Link>  | India | 2023</footer>
    )

}
export default Footer;