# indexingDiagrams

Illustration of how to use GPT4V at indexing time in search.

## Setup

- as usual set your OpenAI key in the OPENAI_API_KEY environment variable
- create folders c:\data and c:\data\cache
- put your test file in c:\data
- execute 'node pipeline.js'
- edit the pipleine.js script if you want to play with different ranges of pages

## What is going on here?

- the 'pipeline' loads the PDF doc
- then in a loop...
- for each page it internally renders that to a canvas and saves it as a PNG file
- then it calls the GPT4-Vision model to turn that PNG into a detailed text file
- then it uploads the text file to OpenIA
- finally creating an Assistant with the list of files
- now go to the OpenAI Assistants protal and you can query the set of pages as you like

## Commentary

- start top down, hopefully the 'pipeline.js' code is pretty easy to follow
- the 'chunking' is extremely primitive - basically per page
- (my example was the ATV manual which is pretty much a picture per page anyhow)
- the conversion from PNG to TXT use the GPT4 vision model
- this step is slow (like multiple seconds per page slow) so I put a file exists check in - if you edit the 'prompt" delete the cache folder
