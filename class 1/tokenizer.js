class Tokenizer {
    encode(texts) {
       return texts.split('').map(char => char.charCodeAt(0))
    }

    decode(tokens) {
        return tokens.map(num => String.fromCharCode(Number(num))).join('');
    }
}

const enc = new Tokenizer();
const token = enc.encode('The cat sat on the mat')
console.log(token);
console.log(enc.decode(token));
