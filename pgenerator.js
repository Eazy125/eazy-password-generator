let randomPassword=[]
const charPool =
        {
            letters: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
            numbers: [1,2,3,4,5,6,7,8,9,0],
            specialCharacter :  ['!','@','#','$','%','%','&','*']
          }
let l;
let N;
let S;
function generateCharacters() {

    l = Math.floor((Math.random() *24)+1)
    N =  Math.floor((Math.random() *10)+1)
    S =  Math.floor((Math.random() *8)+1)
}

function generateRandomChar(){
    generateCharacters()
    let charOption;
    let charOption2;
    let charOption3;
    console.log(l)
    console.log(N)
    console.log(S)

    //generate for the first character
    if (1<=l && l<=8){
        charOption =  charPool.letters
        randomPassword.push(charOption[l]);
    }else if (8<=l && l<=16){
        charOption2 =  charPool.numbers
        randomPassword.push(charOption2[N]);
    }else if (16<=l && l<=24){
        charOption3 =  charPool.specialCharacter
        randomPassword.push(charOption3[S]);
    }

    //generate second character
    if (1<=N && N<=8){
        charOption =  charPool.letters
        randomPassword.push(charOption[l]);
    }else if (8<=N && N<=16){
        charOption2 =  charPool.numbers
        randomPassword.push(charOption2[N]);
    }else if (16<=N && N<=24){
        charOption3 =  charPool.specialCharacter
        randomPassword.push(charOption3[S]);
    }
    return randomPassword

    
}
    

generateRandomChar()
document.querySelector('.js-p-container').innerHTML =randomPassword