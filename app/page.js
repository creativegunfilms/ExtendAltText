import Link from 'next/link';
import Multiple from '../comp/batchUploader';
// import InputComp from '../comp/inputComp';
import Styles from '../styles/page.module.css';

export default async function Page() {
  return (
    <div className={Styles.main}>
      <h1>Extend Alt Text</h1>
      <p>
        This is a Project based on Next-Alt-Text-Generator, it extends its
        functionality. <Link href={'https://alt-text-generator.vercel.app/'}>See Original Project. </Link>Or
        <Link href={'https://vercel.com/templates/next.js/ai-alt-text-generator'}> Deploy on Vercel. </Link> This project uses that as the backbone and extends the facilites like conversion of multiple files and generating alt text by uploading an image. This project is also open source. Here this is the link to the <Link href={'https://github.com/creativegunfilms/ExtendAltText.git'}>Github Repo</Link>.
      </p>
      <h3>How does it work?</h3>
      <li>It takes the user input as URL</li>
      <li>Or it takes multiple Images as input and uploads it to <Link href={'https://file.io/'}>File.io</Link></li>
      <li>It takes the return URL and makes an API call</li>
      <li>The backend API call requests the Vercel Alt Text Generator</li>
      <li>The Vercel Alt Text Generator uses ML modal from Salesforce called BLIP on <Link href={'https://replicate.com/'}>Replicate</Link> to generate relevant alt text for images</li>
      <li>It shows the result to the frontend</li>
      <li>Fetch request from the alt text generator deletes the File.io image which is essentially a feature of the file.io free plan</li>
      <li>No file is kept on the database</li>
      <br />
      <em>Fill free to use it in your project. Respect to the original creators.</em>
      <section className={Styles.section}>
        <Multiple />
      </section>
      <footer className={Styles.footer}>Developed by: <Link href={'https://extend-alt-text.vercel.app/ogimage'}>🔵🔴🟢</Link>  | India | 2023</footer>
    </div>
  );
}
