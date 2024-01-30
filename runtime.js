

import OpenAI from "openai";
import fs from 'fs';

const openai = new OpenAI();

const flattened = fs.readFileSync('flattened.txt');
const content = Buffer.from(flattened).toString();

const question = "what Fit Kit is needed to use Shimano Ultegra cranks on my 68mm BSA threaded bottom bracket?";

async function main() {
  const response = await openai.chat.completions.create({
    model: "gpt-4-vision-preview",
    max_tokens: 4096,
    messages: [
      {
        role: "system",
        content: [
          { type: "text", text: content },
        ],
      },
      {
        role: "user",
        content: [
          { type: "text", text: question },
        ],
      },
    ],
  });
  console.log(response.choices[0]);
}

main();
