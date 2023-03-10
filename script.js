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

// ======================================
// displayTransactions
// ======================================
const displayTransactions = function (transactions) {
  containerTransactions.innerHTML = '';
  transactions.forEach(function (trans, index) {
    const transType = trans > 0 ? 'deposit' : 'withdrawal';
    const transactionRow = `<div class="transactions__row">
<div class="transactions__type transactions__type--${transType}">
  ${index + 1} ${transType == 'deposit' ? 'ДЕПОЗИТ' : 'ВЫВОД СРЕДСТВ'}
</div>

<div class="transactions__value">${trans}$</div>

 </div>`;
    containerTransactions.insertAdjacentHTML('afterbegin', transactionRow);
  });
};

// ========================================
// createNicknames
// nickNames = first letters of first and last name (userName)
// ========================================
const createNicknames = function (accs) {
  accs.forEach(
    acc =>
      (acc['nickNames'] = acc.userName
        .toLowerCase()
        .split(' ')
        .map(item => item[0])
        .join(''))
  );
};

// ========================================
// displayBalance
// ========================================
const displayBalance = function (transactions) {
  const balance = transactions.reduce(
    (acc, trans) => acc + trans,
    transactions[0]
  );
  console.log(balance);
  labelBalance.textContent = `${balance}$`;
};

// ========================================
// displayTotal
// ========================================
const displayTotal = function ({ transactions, interest }) {
  const depositesTotal = `${transactions
    .filter(item => item > 0)
    .reduce((acc, item) => acc + Math.abs(item), 0)}$`;
  labelSumIn.textContent = depositesTotal;

  const withdrawalsTotal = `${transactions
    .filter(item => item < 0)
    .reduce((acc, item) => acc + Math.abs(item), 0)}$`;
  labelSumOut.textContent = withdrawalsTotal;

  const interestTotal = `${transactions
    .filter(item => item > 0)
    .map(item => (item * interest) / 100)
    .filter(item => item > 5)
    .reduce((acc, item) => acc + item, 0)}$`;
  labelSumInterest.textContent = interestTotal;
};

// ========================================
// login
// ========================================
createNicknames(accounts);
console.log(accounts);
let currentAccount;

btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  const loginUsername = inputLoginUsername.value;
  const loginPin = inputLoginPin.value;
  currentAccount = accounts.find(item => item.nickNames == loginUsername);
  if (currentAccount.pin == Number(loginPin)) {
    // Display UI welcome message
    labelWelcome.textContent = `С возвращением, ${
      currentAccount.userName.split(' ')[0]
    }!`;
    // Clear login
    inputLoginUsername.value = '';
    inputLoginPin.value = '';
    inputLoginPin.blur();
    // Display transactions
    displayTransactions(currentAccount.transactions);
    // Display balance
    displayBalance(currentAccount.transactions);
    //  Display total
    displayTotal(currentAccount);
    containerApp.style.opacity = '100';
  }
});
