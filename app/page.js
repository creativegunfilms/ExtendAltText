import Multiple from '../comp/batchUploader';
import InputComp from '../comp/inputComp';
import styles from '../styles/globals.css';

export default async function Page() {
  return (
    <div className={styles.mainC}>
      <h2>
        This is a Project based on Next-Alt-Text-Generator, it extends its
        functionality.
      </h2>
      <section>
      <InputComp />
      <hr></hr>
      <Multiple />
      </section>
    </div>
  );
}
