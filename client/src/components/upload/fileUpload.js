import { useEffect, useState } from "react";
import axios from "axios";
// import { pdfjs } from "react-pdf";
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import TextField from '@mui/material/TextField';
import { Button, Input, Typography } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SendIcon from '@mui/icons-material/Send';
// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//   "pdfjs-dist/build/pdf.worker.min.js",
//   import.meta.url
// ).toString();

function App() {
    const backLink = process.env.REACT_APP_BACK_LINK;
  const [title, setTitle] = useState("");
  const [file, setFile] = useState("");
  const [allImage, setAllImage] = useState(null);
  const [professors, setProfessors] = useState([]);
  const [selectedProfId, setSelectedProfId] = useState('');
//   const [pdfFile, setPdfFile] = useState(null);

function formatDateToDatetime(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
  
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }
  
  const currentDate = new Date(); // Create a Date object with the current date and time
  const currentDatetime = formatDateToDatetime(currentDate);


useEffect(() => {
    async function fetchProfessors() {
      try {
        const response = await axios.get('http://localhost:4000/prof/professeurs');
        setProfessors(response.data); // Assuming response.data is an array of professors with names and IDs
      } catch (error) {
        console.error('Error fetching professors:', error);
        // Handle error or display error message
      }
    }

    fetchProfessors();
  }, []);

  const handleSelectChange = (e) => {
    setSelectedProfId(e.target.value);
  };

//   useEffect(() => {
//     getPdf();
//   }, []);
//   const getPdf = async () => {
//     console.log("in get pdf")
//     const result = await axios.get("http://localhost:4000/FilesManagement/get-files");
//     console.log(result.data.data);
//     setAllImage(result.data.data);
//   };

  const submitImage = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("file", file);
    formData.append("professeurId", selectedProfId);
    console.log(title, file);

    const result = await axios.post(
      "http://localhost:4000/FilesManagement/upload-files",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    console.log(result);
    if (result.data.status == "ok") {
        const res = await axios.post(backLink+'/notifs/add-notification', { "prof": selectedProfId , "title": "Nouveau document envoyé", "message": "Nous tenons à vous informer que vous avez recu un nouveau document. Merci !", "date": currentDatetime});
      setTitle("")
      setFile("")
      alert("Uploaded Successfully!!!");
    //   getPdf();
    }
  };
  const showPdf = (pdf) => {
    const pdfUrl = `http://localhost:4000/files/${pdf}`;
  window.open(pdfUrl, '_blank');
  };
  return (
    <div className="App">
      <form className="formStyle" onSubmit={submitImage}>
        
      <FormControl fullWidth>
  <InputLabel id="select-professor-label">Selectionner un professeur</InputLabel>
  <Select
    labelId="select-professor-label"
    id="select-professor"
    value={selectedProfId}
    onChange={handleSelectChange}
    label="Select Professor"
    required
  >
    <MenuItem value="">Selectionner un professeur</MenuItem>
    {professors.map((prof) => (
      <MenuItem key={prof._id} value={prof._id}>
        {prof.nom}
      </MenuItem>
    ))}
  </Select>
</FormControl>
        <br />
        <div>&nbsp;</div>
        <TextField
        id="outlined-basic" label="Ajouter un titre" variant="outlined"
          type="text"
          className="form-control"
          value={title}
          required
          fullWidth
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <div>&nbsp;</div>
        {/* <input
          type="file"
          class="form-control"
          accept="application/pdf"
          required
          onChange={(e) => setFile(e.target.files[0])}
        /> */}

<div>
  <label htmlFor="upload-file">
    <Input
    
      id="upload-file"
      type="file"
      inputProps={{ accept: 'application/pdf' }}
      onChange={(e) => setFile(e.target.files[0])}
      style={{ display: 'none' }}
    />
    <Button
      variant="outlined"
      component="span"
      startIcon={<CloudUploadIcon />}
    >
      Choisir un fichier
    </Button>
  </label>
  {file && (
    <Typography variant="body1" gutterBottom>
      fichier choisi: {file.name}
    </Typography>
  )}
</div>
        <br />
        {/* <button class="btn btn-primary" type="submit">
          Valider
        </button> */}
        <Button variant="contained" endIcon={<SendIcon />} type="submit">
  Envoyer
</Button>
      </form>
      <div className="uploaded">
        <div className="output-div">
          {allImage == null
            ? ""
            : allImage.map((data) => {
                return (
                  <div className="inner-div">
                    <h6>Title: {data.title}</h6>
                    <button
                      className="btn btn-primary"
                      onClick={() => showPdf(data.pdf)}
                    >
                      Show Pdf
                    </button>
                  </div>
                );
              })}
        </div>
      </div>
      {/* <PdfComp pdfFile={pdfFile}/> */}
    </div>
  );
}

export default App;