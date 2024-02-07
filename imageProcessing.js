
import OpenAI from "openai";
import fs from 'fs';

const openai = new OpenAI();

function toBase64(filePath) {
    const img = fs.readFileSync(filePath);
    return 'data:image/png;base64,' + Buffer.from(img).toString('base64');
}

export async function createTextFromPng(pngFileName, txtFileName) {

  console.log(`createTextFromPng('${pngFileName}', '${txtFileName}')`);

  const exists = fs.existsSync(txtFileName);

  if (!exists) {

    const instructions = "Describe this image in detail. If the image appears to be a table, list all the contents in your description such that any relationships within the content implied by the tabular arrangement are retained. Extract any terms that would be useful in a search engine.";

    const message = {
      role: "user",
      content: [
        { type: "text", text: instructions },
        { type: "image_url", image_url: { url: toBase64(pngFileName) } },
      ],
    };

    const response = await openai.chat.completions.create({
      model: "gpt-4-vision-preview",
      max_tokens: 4096,
      messages: [ message ],
    });

    fs.writeFileSync(txtFileName, response.choices[0].message.content)
  }
}

export async function findCoordinatesOfPictureInPage(pngFileName) {

  console.log(`findCoordinatesOfPictureInPage('${pngFileName}')`);

  const instructions = "This is an image taken from the page of a PDF. If this contains a diagrams determine the coordinates for each of those diagrams.";

  const message = {
    role: "user",
    content: [
      { type: "text", text: instructions },
      { type: "image_url", image_url: { url: toBase64(pngFileName), detail: "high" } },
    ],
  };

  const response = await openai.chat.completions.create({
    model: "gpt-4-vision-preview",
    max_tokens: 4096,
    messages: [ message ],
  });

  return response.choices[0].message.content;
}
