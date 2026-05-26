
let Day= "monday ";

console.log(Day.length);
console.log(Day.toUpperCase());
console.log(Day.toLowerCase());
console.log(Day.includes("day"));
console.log(Day.slice(0,3));
console.log(Day.trim());

let quote = Day + "is funday in a week day";
console.log(quote);

// howmany times the word "day" is present in the quote

let count = 0;

let value= quote.indexOf("day");

while(value !=-1){

    count++;
    value = quote.indexOf("day", value+1);
}
console.log(count);
