// Нехай даний масив масивів ([[1,"first"], [3,"third"]]).
// Створіть колекцію Map з цього масиву (по суті, вона співставляє значенням чисел їх порідковий числівник).
// Отримайте кількість елементів.
// Додати та видалити елемент.
// Здійсніть пошук за ключом.
// Перевірити, чи є в мапі числівник для числа 2.
// Отримайте список ключів та значень окремо.

const array = [
  [1, "first"],
  [3, "third"],
];

// Створіть колекцію Map з цього масиву (по суті, вона співставляє значенням чисел їх порідковий числівник).

const map1 = new Map(array);

// console.log(map1);

// Отримайте кількість елементів.

// console.log(map1.size);

// Додати та видалити елемент.

// console.log(map1.set(4, "four"));

// map1.delete(4);
// console.log(map1);
// Здійсніть пошук за ключом.

// console.log(map1.get(3));

// Перевірити, чи є в мапі числівник для числа 2.

// console.log(map1.has(2));

// Отримайте список ключів та значень окремо.

// console.log(map1.keys());
// console.log(map1.values());
// console.log(map1.entries());

// *Написати функцію, яка перероблятиме текст з числами
// "This year I will enter the 1 grade. I have two brothers. I am the 3 child of my parents."
//  на текст з порядковими числівниками за допомогою мапи вище:
// "This year I will enter the first grade. I have two brothers. I am the third child of my parents."

const numerals = new Map();

numerals.set("1", "first").set("2", "two").set("3", "third");

const phrase =
  "This year I will enter the 1 grade. I have two brothers. I am the 3 child of my parents.";
console.log(phrase);

function numbersToSrting(numeralsPhrase) {
  return numeralsPhrase
    .split("")
    .map((word) => (numerals.has(word) ? numerals.get(word) : word))
    .join("");
}

const chnangedPhare = numbersToSrting(phrase);

console.log(chnangedPhare);
