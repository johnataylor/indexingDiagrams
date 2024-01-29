

import OpenAI from "openai";
import fs from 'fs';

const openai = new OpenAI();

function toBase64(filePath) {
    const img = fs.readFileSync(filePath);
    return 'data:image/png;base64,' + Buffer.from(img).toString('base64');
}

var rx4m = "C:\\private\\data\\rx4m.png";

async function main() {
  const response = await openai.chat.completions.create({
    model: "gpt-4-vision-preview",
    max_tokens: 4096,
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: "Describe this image in detail." },
          {
            type: "image_url",
            image_url: {
              "url": toBase64(rx4m),
            },
          },
        ],
      },
    ],
  });
  console.log(response.choices[0]);
}

main();
