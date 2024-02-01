
import { OpenAI } from "openai";
import fs from 'fs';

var baseURL = 'https://api.openai.com/v1'
//var baseURL = 'http://localhost:3000/v1'

const instructions = `You are a subject matter expert and can answer questions using the uploaded files. Only use the data in the files. If you cannot find the answer say "I don't know."`;

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY, baseURL: baseURL });

export async function createAssistant(name, fileIds) {

  console.log(`createAssistant('${name}', '${JSON.stringify(fileIds)}')`);

  const assistant = await openai.beta.assistants.create({
    name: name,
    description: "Subject matter expert bot.",
    instructions: instructions,
    tools: [{ type: "retrieval" }],
    model: "gpt-4-1106-preview",
    file_ids: fileIds,
  });

  return assistant;
}

export async function uploadFile(fileName) {

  console.log(`addDocumentToAssistant('${fileName}')`);

  const file = await openai.files.create({
    file: fs.createReadStream(fileName),
    purpose: "assistants",
  });

  return file.id;
}
