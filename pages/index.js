import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

export default function Home() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [file, setFile] = useState(null);
  const [fileContent, setFileContent] = useState('');
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [entriesCount, setEntriesCount] = useState(1)


  const handleNameChange = (e) => {
    setName(e.target.value);
    // checkButtonEnabled();
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    // checkButtonEnabled();
  };

  // const handleFileChange = (e) => {
  //   const selectedFile = e.target.files[0];
  //   setFile(selectedFile);
  //   // checkButtonEnabled();

  //   const reader = new FileReader();
  //   reader.onload = function (event) {
  //     const fileContent = event.target.result;
  //     setFileContent(fileContent);
  //   };
  //   reader.readAsText(selectedFile);
  // };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    const reader = new FileReader();
    reader.onload = function (event) {
      const fileContent = event.target.result;
      setFileContent(fileContent);

      // Attempt to parse the JSON content
      try {
        const parsedData = JSON.parse(fileContent);
        console.log(parsedData)


        // If JSON is valid, enable the submit button
        setIsButtonEnabled(name.length >= 2 && email && parsedData);
      } catch (error) {
        alert('Error parsing JSON', error);
        setIsButtonEnabled(false);
      }
    };
    reader.readAsText(selectedFile);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    setEntriesCount(entriesCount + 1)
    Swal.fire({
      title: 'Success',
      text: `${entriesCount} entries successfully submitted`,
      icon: 'success',
      confirmButtonText: 'Go to My Entries',
      iconColor: "blue",
      cancelButtonText: "Cancel",
      cancelButtonColor: "rgba(48, 98, 200, 0.5)",
      showCancelButton: true,
      focusCancel: true

    })
    setName("")
    setEmail("")
    setFile(null)
    setFileContent("")
    setIsButtonEnabled(false)

  };

  useEffect(() => {
    // Use the useEffect hook to observe changes in name, email, and file
    if (name.length >= 2 && email && file) {
      setIsButtonEnabled(true);
    } else {
      setIsButtonEnabled(false);
    }
  }, [name, email, file]);

  return (
    <div className={styles.myformsection}>
      <Head>
        <title>Form App</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap" rel="stylesheet" />
      </Head>


      <main>
        <div className={styles.header}>
          <span className={styles.leftarrow}><img src='/LeftArrow.svg' alt='arrow-icon' /></span><span className={styles.submittext}>Submit Form</span>
        </div>
        <form onSubmit={handleSubmit} >
          <div className={styles.formgroup}>
            <label className={styles.label}>Full Name</label>
            <input type="text" value={name} onChange={handleNameChange} placeholder="Full Name" className={styles.inputfeild} />
          </div>

          <div className={styles.formgroup}>
            <label className={styles.label}>Email</label>
            <span>
              <span className={styles.emailicon}><img src='/Email.svg' alt='email-icon' /></span>
              <input type="email" value={email} onChange={handleEmailChange} placeholder="Email" className={styles.inputfeild} id='input' />
            </span>
          </div>

          <div className={styles.formgroup}>
            <label className={styles.label}>Upload JSON File</label>
            <div className={styles.filesection}>
              <label className={styles.filelabel}>
                <input type="file" accept=".json" onChange={handleFileChange} className={styles.fileinputfeild} />
                <div><img src='/File.svg' alt='file-icon' /></div>
                <div className="browse-text">Browse File</div>
              </label>
            </div>


            <div className={styles.filecontents}>
              <label className={styles.filecontentslabel}>File Contents:</label>
              <textarea
                value={fileContent}
                rows="8"
                readOnly
                className={styles.textarea}
              ></textarea>
            </div>

          </div>

          <div className={styles.submitbtnsection}>
            <button type="submit" disabled={!isButtonEnabled} className={`${styles.submitbtn} ${isButtonEnabled ? styles.selected : ""} `}>
              Submit
            </button>
          </div>
        </form>
      </main>

    </div>
  );
}
