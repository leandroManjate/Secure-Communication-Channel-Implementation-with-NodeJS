const crypto = require ("crypto");
const fs = require('fs');
const {X509Certificate} = require('crypto')



try {
    // ler a mensagem que vamos autenticar
    const data = fs.readFileSync('mensagem_professor.txt','utf-8');
    console.log('\nVou verificar a assinatura digital RSA do texto: ',data);
    
    // ler a assinatura digital RSA
    const signature = fs.readFileSync('assinatura_digital_rsa.bin');
    
    // para autenticar uma assinatura digital RSA precisamos da...
    // chave publica RSA certificada de quem criou a assinatura digital
    // as chaves públicas são distribuídas através de certificados digitais
    // existe um ficheiro com o certificado digital do professor que tem a chave pública
    // este ficheiro deve existir e estar no formato PEM
    const x509 = new X509Certificate(fs.readFileSync('certificado_digital_do_professor.pem'));

    // extrair o sujeito, para termos a certeza que é o certificado certo
    const Subject = x509.subject
    
    // extrair a chave pública RSA
    const RSApublicKey = x509.publicKey.export({type:"pkcs1",format:"pem"})

    // mostrar o resultado
    console.log("\nSubject: " + Subject)
    console.log('\nPublic Key: ' + RSApublicKey)


    // este bloco de código vai verificar se a assinatura digital é válida
    const verify = crypto.createVerify('SHA256');
    verify.update(data);
    verify.end();

    const validation = verify.verify(RSApublicKey, signature);
    
    if (validation) {
        console.log("\nA mensagem é autêntica, a assinatura digital é válida")
    }
    else {
        console.log("\nCuidado, a mensagem não é autêntica, a assinatura digital é inválida")
    }
    
}
 catch (err) {
    console.error(err);
 }  