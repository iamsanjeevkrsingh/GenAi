const { encoding_for_model } = require('@dqbd/tiktoken');

const enc = encoding_for_model('gpt-4o');
const text = "The cat sat on the mat";
const tokens = enc.encode(text);
console.log("Tokens:", tokens);


const byteArray = enc.decode([ 976, 9059, 10139, 402, 290, 2450 ]);
const decodedText = new TextDecoder().decode(byteArray);
console.log("Decoded Text:", decodedText);


enc.free();