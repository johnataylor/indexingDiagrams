# indexingDiagrams

Code to call GPT to create text summaries of diagrams.

- index.js creates text summaries for diagrams or extracts all the data from complex tables
- for the diagram I took a screen shot of this PDF: https://www.hopetech.com/_repository/1/documents/RX4Exploded_View_2021.pdf
- for the table I used this: https://cdn.shopify.com/s/files/1/2920/2114/files/bb_fit_guide_r1.pdf?v=1632265266
- in both cases I ended out with a PNG which I include in the prompt as base64
- runtime.js illustartes how the resulting text can be used to answer questions, in this case I had previously grabbed the text generated from the table in flattened.txt
- this last step is just a short cut, a real system would have taken that text and added it to a semantic search
- note running vision analysis is a slow operation, so it makes sense to run that once and capture the results, here we capture that in words
- can we assume pictures are the norm? https://www.goodreads.com/quotes/22528-and-what-is-the-use-of-a-book-thought-alice


 
