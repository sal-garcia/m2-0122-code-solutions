let count = 3;
const intervalStorage = setInterval(blast, 1000);
function blast(e) {
  if (count >= 1) {
    console.log(count--);
  } else {
    console.log('Blast off!');
    clearInterval(intervalStorage);
  }
}
