

import OpenAI from "openai";
import fs from 'fs';

const openai = new OpenAI();

function toBase64(filePath) {
    const img = fs.readFileSync(filePath);
    return 'data:image/png;base64,' + Buffer.from(img).toString('base64');
}

//var instructions = "Describe this image in detail.";
//var path = "C:\\private\\data\\rx4m.png";

var instructions = "Flatten and enumerate all the information held in this table.";
var path = "C:\\private\\data\\compatibility.png";

async function main() {
  const response = await openai.chat.completions.create({
    model: "gpt-4-vision-preview",
    max_tokens: 4096,
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: instructions },
          {
            type: "image_url",
            image_url: {
              "url": toBase64(path),
            },
          },
        ],
      },
    ],
  });
  console.log(response.choices[0]);
}

main();
