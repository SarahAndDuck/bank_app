'use strict';
// https://app.diagrams.net/?src=about
// Simply Bank App

const account1 = {
  userName: 'Cecil Ireland',
  transactions: [500, 250, -300, 5000, -850, -110, -170, 1100],
  interest: 1.5,
  pin: 1111,
};

const account2 = {
  userName: 'Amani Salt',
  transactions: [2000, 6400, -1350, -70, -210, -2000, 5500, -30],
  interest: 1.3,
  pin: 2222,
};

const account3 = {
  userName: 'Corey Martinez',
  transactions: [900, -200, 280, 300, -200, 150, 1400, -400],
  interest: 0.8,
  pin: 3333,
};

const account4 = {
  userName: 'Kamile Searle',
  transactions: [530, 1300, 500, 40, 190],
  interest: 1,
  pin: 4444,
};

const account5 = {
  userName: 'Oliver Avila',
  transactions: [630, 800, 300, 50, 120],
  interest: 1.1,
  pin: 5555,
};

const accounts = [account1, account2, account3, account4, account5];

// Elements
const getElement = function (selector) {
  return document.querySelector(selector);
};
const labelWelcome = getElement('.welcome');
const labelDate = getElement('.date');
const labelBalance = getElement('.balance__value');
const labelSumIn = getElement('.total__value--in');
const labelSumOut = getElement('.total__value--out');
const labelSumInterest = getElement('.total__value--interest');
const labelTimer = getElement('.timer');

const containerApp = getElement('.app');
const containerTransactions = getElement('.transactions');

const btnLogin = getElement('.login__btn');
const btnTransfer = getElement('.form__btn--transfer');
const btnLoan = getElement('.form__btn--loan');
const btnClose = getElement('.form__btn--close');
const btnSort = getElement('.btn--sort');

const inputLoginUsername = getElement('.login__input--user');
const inputLoginPin = getElement('.login__input--pin');
const inputTransferTo = getElement('.form__input--to');
const inputTransferAmount = getElement('.form__input--amount');
const inputLoanAmount = getElement('.form__input--loan-amount');
const inputCloseUsername = getElement('.form__input--user');
const inputClosePin = getElement('.form__input--pin');
