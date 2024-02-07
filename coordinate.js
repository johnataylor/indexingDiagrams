
import { loadPdfDocument, createPngFromPageOfPdf } from './pdfProcessing.js';
import { findCoordinatesOfPictureInPage } from './imageProcessing.js';

const fullPathToPdf = 'c:\\data\\Yamaha_Kodiak_450.pdf';
const pathForFiles = 'c:\\data\\cache';
const pageNumber = 91;

const pdfDocument = await loadPdfDocument(fullPathToPdf)

const fileName = `coordinate${pageNumber}`;
const fullPathToPng = `${pathForFiles}\\${fileName}.png`;

await createPngFromPageOfPdf(pdfDocument, pageNumber, fullPathToPng);

// this is a work in progress - meaning it doesn't quite work

const result = await findCoordinatesOfPictureInPage(fullPathToPng);

console.log(result);