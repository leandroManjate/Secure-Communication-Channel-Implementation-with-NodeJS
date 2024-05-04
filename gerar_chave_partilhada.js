const crypto = require('crypto');
const fs = require('fs');

// a curva elíptica que vamos usar
const curveType='secp521r1';

// Gerar o meu par de chaves de curva elíptica
const my = crypto.createECDH(curveType);
const myKey = my.generateKeys();

console.log("\nA minha chave privada EC:\t",my.getPrivateKey().toString('hex'));
console.log("\nA minha chave pública EC:\t",myKey.toString('hex'))

//ler chave publica do professor
const teacherPublicKey = fs.readFileSync('chave_publica_EC_professor.bin');

console.log("\nA chave pública do professor:\t",teacherPublicKey.toString('hex'));

// gerar a chave secreta partilhada, usando a minha chave privada e a chave pública do professor
const sharedSecret = my.computeSecret(teacherPublicKey);

console.log("\nA chave secreta partilhada gerada é:\t",sharedSecret.toString('hex'))
