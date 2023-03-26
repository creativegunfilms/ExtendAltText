import Multiple from '../comp/batchUploader';
// import InputComp from '../comp/inputComp';
import Styles from '../styles/page.module.css';

export default async function Page() {
  return (
    <div className={Styles.main}>
      <h1>Extend Alt Text</h1>
      <p>
        This is a Project based on Next-Alt-Text-Generator, it extends its functionality. See Original Project. Or Deploy on Vercel. This project uses that as the backbone and extends the facilites like conversion of multiple files and generating alt text by uploading an image. This project is also open source. Here this is the link to the Github Repo.
      </p>
      <h2>How does it work?</h2>
      <li>It takes the user input as URL OR</li>
      <li>It takes multiple Images as input and uploads it to File.io</li>
      <li>It takes the return URL and makes an API call</li>
      <li>The backend API call requests the Vercel Alt Text Generator</li>
      <li>The Vercel Alt Text Generator uses ML modal from Salesforce called BLIP on Replicate to generate relevant alt text for images</li>
      <li>Fetch request from the alt text generator deletes the File.io image which is essentially a feature of the file.io free plan</li>
      <li>No file is kept on the database</li>
      <section className={Styles.section}>
        {/* <InputComp /> */}
        <Multiple />
      </section>
      <footer className={Styles.footer}>Developed by: 🔵🔴🟢  | India | 2023</footer>
    </div>
  );
}
