
import { loadPdfDocument, createPngFromPageOfPdf } from './pdfProcessing.js';
import { createTextFromPng } from './imageProcessing.js';
import { uploadFile, createAssistant } from './assistants.js';

// the pipeline

const assistantName = 'atv expert';
const fullPathToPdf = 'c:\\data\\Yamaha_Kodiak_450.pdf';
const pathForFiles = 'c:\\data\\cache';
const beginPageNumber = 10;
const endPageNumber = 15;

const pdfDocument = await loadPdfDocument(fullPathToPdf);

const fileIds = [];

for (let pageNumber=beginPageNumber; pageNumber<endPageNumber; pageNumber++) {

  const fileName = `page${pageNumber}`;
  const fullPathToPng = `${pathForFiles}\\${fileName}.png`;
  const fullPathToTxt = `${pathForFiles}\\${fileName}.txt`;

  await createPngFromPageOfPdf(pdfDocument, pageNumber, fullPathToPng);
  await createTextFromPng(fullPathToPng, fullPathToTxt);

  const fileId = await uploadFile(fullPathToTxt);

  fileIds.push(fileId);
}

const assistant = await createAssistant(assistantName, fileIds);

console.log(`new assistant created with id '${assistant.id}'`);

