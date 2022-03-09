/*
    Autor: Luanderlandy F. da Silva
    Descrição: Classe para lidar com verificações de senhas.
    Plataformas: React Native (6.0.0), Ionic Angular (6.17.1) e NodeJS (16.14.0)
*/

class PasswordVerifier {
    static assertSize(senha, tam=8){
        /* Verifica se uma senha está no tamanho desejado (padrão: 8 caracteres). */
        if(senha.length<tam){
            throw new PasswordError(`Password Length Error: ${senha.length} characters only`);
        }
        return true;
    }

    static hasNumbers(senha, quantNums=1){
        /* Verifica se uma senha contem caracteres numéricos */
        const numeros = [...Array(10).keys()];
        
        numeros.forEach(n => {
            if(senha.indexOf(n)!=-1){
                quantNums -= senha.split(n).length-1;
            }
        });
    
        if(quantNums>0) // Não contem números
            throw new PasswordError("Password Missing Number(s)");
        return true; // contem numeros
    }

    static hasUpperCase(senha, quantMaiuscula=1){
        /* Verifica se uma senha contem letras maiusculas */
        senha.split('').every(senhaChar => {
            let senhaCharCode = senhaChar.charCodeAt(0);
    
            // Checa se os caracteres da senha são maiúsculos
            if(senhaCharCode>=65 && senhaCharCode <= 90){
                quantMaiuscula--;
            }
    
            if(quantMaiuscula <= 0) // Sai do loop se a quantidade de letras maiúsculas desejadas forem encontradas.
                return false;
            return true;
        });
    
        // Retorna true se a senha tiver a quant. de letras maiúsculas desejadas
        if(quantMaiuscula > 0) 
            throw new PasswordError("Password Missing UpperCase Letter(s)");
        return true;
    }

    static hasSpecialChar(senha, quantCharEspeciais=1){
        /* Verifica se uma senha contem caracteres especiais */
        const asciiTableRange = [...Array(127).keys()];
        let specialCharsRange = [];
        
        // Gera um array de valores com todos os intervalos de números abaixo (que correspondem aos intervalos de caracteres esp. na tabela ASCII).
        [[33,47],[58,64],[91,96],[123,126]].forEach(range=>{ 
            specialCharsRange = specialCharsRange.concat( asciiTableRange.filter(c => c>=range[0] && c<=range[1]) );
        });
    
        // lista de caracteres especiais
        const specialChars = specialCharsRange.map(c => String.fromCharCode(c));
    
        senha.split('').every((senhaChar)=>{
            if(specialChars.includes(senhaChar)){
                quantCharEspeciais -= specialChars.filter(sc => sc==senhaChar).length;
            }
    
            if(quantCharEspeciais <= 0) return false;
            return true;
        });
    
        if(quantCharEspeciais>0) // Não contem chars. especiais
            throw new PasswordError("Password Missing Special Character(s)");
        return true; // contem chars. especiais
    }
}

// Error Class Handler
function PasswordError(msg=""){
    this.name = "PasswordError";
    this.message = "[ ! ] "+msg;
    this.stack = (new SyntaxError()).stack
}

PasswordError.prototype = SyntaxError.prototype;

// EXPORTS:
exports.PasswordVerifier = PasswordVerifier;
exports.PasswordError = PasswordError;