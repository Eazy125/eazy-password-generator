const charPool =
        {
            letters: ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'],
            numbers: [1,2,3,4,5,6,7,8,9,0],
            specialCharacter :  ['!','@','#','$','%','%','&','*']
          }

//this function generates a random number 
 let lowerCase;
 let upperCase;
 let numb;
 let symbol;


let numChar;
function generateRandomNumber(){
    const N =  Math.floor((Math.random() *10));
   numChar = charPool.numbers[N]; 
}
//this function generates uppercase letters
let upplettChar;
function genRandLetterUppercase(){
    const L = Math.floor((Math.random() *26));
    upplettChar = charPool.letters[L].toUpperCase();
   
}
//this function generates a random letter
let lettChar;
function generateRandomLetter(){
    const L = Math.floor((Math.random() *26));
    lettChar = charPool.letters[L];
     
}
//this function generates a random symbol
let symChar;
function generateRandomSymbol(){
    const S =  Math.floor((Math.random() *8));
    symChar = charPool.specialCharacter[S];   
}
//format of generated password letter/number/symbol
let randomPassword=''
function generatePassword(){
    if(symbol.checked && upperCase.checked && lowerCase.checked && numb.checked){
        for (i= 0;i<2;i++){
            generateRandomLetter()
            randomPassword +=  lettChar
             genRandLetterUppercase()
             randomPassword += upplettChar
             generateRandomNumber()
             randomPassword += numChar
        } 
        for (i=0;i<2;i++){
            generateRandomSymbol()
            randomPassword += symChar
            
        }   
    }
   else if(symbol.checked && upperCase.checked && lowerCase.checked){
        for (i= 0;i<3;i++){
            generateRandomSymbol()
        randomPassword += symChar 
             genRandLetterUppercase()
             randomPassword += upplettChar
        } 
        for (i=0;i<2;i++){
            generateRandomLetter()
            randomPassword +=  lettChar
        }   
    }
    else if(numb.checked && upperCase.checked && lowerCase.checked){
        for (i= 0;i<3;i++){
            generateRandomNumber()
            randomPassword += numChar 
             genRandLetterUppercase()
             randomPassword += upplettChar
        } 
        for (i=0;i<2;i++){
            generateRandomLetter()
            randomPassword +=  lettChar
        }   
    }
    else if(numb.checked && symbol.checked && lowerCase.checked){
        for (i= 0;i<3;i++){
            generateRandomSymbol()
        randomPassword += symChar 
            generateRandomNumber()
            randomPassword += numChar 
        } 
        for (i=0;i<2;i++){
            generateRandomLetter()
            randomPassword +=  lettChar
        }   
    }
    else if(numb.checked && symbol.checked && upperCase.checked){
        for (i= 0;i<3;i++){
            generateRandomSymbol()
        randomPassword += symChar 
            generateRandomNumber()
            randomPassword += numChar 
        } 
        for (i=0;i<2;i++){
            genRandLetterUppercase()
            randomPassword += upplettChar
        }   
    }
    else if(numb.checked && symbol.checked){
        for (i= 0;i<4;i++){
            generateRandomSymbol()
        randomPassword += symChar 
            generateRandomNumber()
            randomPassword += numChar 
        }    
    }
    else if(upperCase.checked && numb.checked){
        for (i= 0;i<4;i++){
            genRandLetterUppercase()
            randomPassword += upplettChar 
            generateRandomNumber()
            randomPassword += numChar 
        }    
    }
   else if(upperCase.checked && symbol.checked){
        for (i= 0;i<4;i++){
            genRandLetterUppercase()
            randomPassword += upplettChar 
        generateRandomSymbol()
        randomPassword += symChar
        }    
    }
   else if(lowerCase.checked && symbol.checked){
        for (i= 0;i<4;i++){
        generateRandomLetter()
        randomPassword += lettChar
        generateRandomSymbol()
        randomPassword += symChar
        }    
    }
    else if(lowerCase.checked && numb.checked){
        for (i= 0;i<4;i++){
        generateRandomLetter()
        randomPassword += lettChar
        generateRandomNumber()
            randomPassword += numChar 
        }    
    }
     else if(lowerCase.checked && upperCase.checked){
            for (i= 0;i<4;i++){
            generateRandomLetter()
            randomPassword += lettChar
             genRandLetterUppercase()
                    randomPassword += upplettChar  
            }    
        }
    else if ( lowerCase.checked){
        for (i= 0;i<8;i++){
        generateRandomLetter()
        randomPassword += lettChar
        }
    }
    else if (upperCase.checked){
        for (i= 0;i<8;i++){
                genRandLetterUppercase()
                randomPassword += upplettChar  
        }    
    } 
    else if(numb.checked){
        for (i= 0;i<8;i++){
            generateRandomNumber()
            randomPassword += numChar
        }
    } 
    else if (symbol.checked){
        for (i= 0;i<8;i++){
        generateRandomSymbol()
        randomPassword += symChar
        }   
    }
}
function clearPassword(){
    randomPassword = ''
}
let hidden ='hidden'
function generateHTML(){
       let pgeneratorHTML = `
    <div class="password">
            <h2 class="js-p-container">${randomPassword}</h2>
    </div>

            
            <div class="select-option">
           
            
             <div class="ops"><label><input type="checkbox" id="uppcaseCB" >
                 uppercase  letters
            </label><br>
            <label><input type="checkbox" id="lowcaseCB">
                lowercase  letters
            </label></div>
            <div class="ops">
            <label><input type="checkbox" id="numCB">
                  numbers
            </label><br>
            <label ><input type="checkbox" id="symbolCB">
                  symbols
            </label>
            </div>
            </div><div class="generatep">
            <p class="hidden" ${hidden} > please select an option</p>
           <button id="button">GENERATE PASSWORD</button>
            </div>
    `;
     upperCase = document.getElementById('uppcaseCB');
     lowerCase = document.getElementById('lowcaseCB');
     numb = document.getElementById('numCB');
    symbol = document.getElementById('symbolCB');
    document.querySelector('.js-password-generator').innerHTML= pgeneratorHTML;
    gpButton = document.getElementById('button') 
    gpButton.addEventListener('click',()=>{
        
        generateHTML()
        clearPassword()
        generatePassword()
        if (!(numb.checked||symbol.checked||upperCase.checked||lowerCase.checked)){
            hidden = ''
        }else if((numb.checked||symbol.checked||upperCase.checked||lowerCase.checked)){
            hidden = 'hidden'
        }
        generateHTML()
   ss      
   
})
    
}

generateHTML()