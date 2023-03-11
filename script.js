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
const displayTransactions = function (transactions, sort = false) {
  // если   sort = true, копируем  slice() сортированный массив .sort() и присваиваем переменной transacs, иначе оставляем не сортированнм
  const transacs = sort
    ? transactions.slice().sort((a, b) => (a > b ? 1 : -1))
    : transactions;

  containerTransactions.innerHTML = '';
  transacs.forEach(function (trans, index) {
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
// nickName = first letters of first and last name (userName)
// ========================================
const createNicknames = function (accs) {
  accs.forEach(
    acc =>
      (acc['nickName'] = acc.userName
        .toLowerCase()
        .split(' ')
        .map(item => item[0])
        .join(''))
  );
};

// ========================================
// displayBalance
// ========================================
const displayBalance = function (account) {
  const balance = account.transactions.reduce(
    (acc, trans) => acc + trans,
    account.transactions[0]
  );
  account.balance = balance;
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

const displayData = function () {
  function zero_first_format(value) {
    if (value < 10) {
      value = '0' + value;
    }
    return value;
  }

  const lang = navigator.language; // определяет язык браузера
  let date = new Date(); // создание нового объекта с текущей датой и временем
  let dayNumber = date.getDate(); // получение даты
  let monthName = zero_first_format(date.getMonth() + 1);
  // date.toLocaleString(lang, { month: 'long' }); // получение названия месяца
  let year = date.getFullYear(); // получение текущего года
  labelDate.textContent = `${dayNumber}.${monthName}.${year}`;
};
// ========================================
// Display transactions, balance, total
// ========================================
function updateUi(account) {
  displayData();
  // Display transactions
  displayTransactions(account.transactions);
  // Display balance
  displayBalance(account);
  //  Display total
  displayTotal(account);
}
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
  currentAccount = accounts.find(item => item.nickName == loginUsername);
  if (currentAccount.pin == Number(loginPin)) {
    // Display UI welcome message
    labelWelcome.textContent = `С возвращением, ${
      currentAccount.userName.split(' ')[0]
    }!`;
    // Clear login
    inputLoginUsername.value = '';
    inputLoginPin.value = '';
    inputLoginPin.blur();
    updateUi(currentAccount);
    containerApp.style.opacity = '100';
  }
});

// ========================================
// Transfers
// ========================================

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const transferAmount = inputTransferAmount.value;
  const recipientNickname = inputTransferTo.value;
  const recipientAccount = accounts.find(
    account => account['nickName'] === recipientNickname
  );
  // Clear inputTransfe
  inputTransferTo.value = '';
  inputTransferAmount.value = '';
  if (
    transferAmount > 0 &&
    currentAccount.balance >= transferAmount &&
    recipientAccount &&
    currentAccount &&
    currentAccount.nickName !== recipientAccount.nickName
  ) {
    currentAccount.transactions.push(-Number(transferAmount));
    recipientAccount.transactions.push(Number(transferAmount));

    updateUi(currentAccount);
  }
});

// ========================================
// delete account
// ========================================
btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  const closeUsername = inputCloseUsername.value;
  const closePin = Number(inputClosePin.value);
  inputCloseUsername.value = '';
  inputClosePin.value = '';
  if (
    currentAccount.nickName === closeUsername &&
    currentAccount.pin === closePin
  ) {
    const index = accounts.findIndex(acc => acc == currentAccount);
    console.log(accounts.splice(accounts[index], 1));
    // Display UI welcome message
    labelWelcome.textContent = `Войдите в свой аккаунт`;
    // Clear Balancem , SumIn, SumOut, SumInterest, containerTransactions, hide Ui
    currentAccount = {};
    labelBalance.textContent = `0$`;
    labelSumIn.textContent = `0$`;
    labelSumOut.textContent = `0$`;
    labelSumInterest.textContent = `0$`;
    containerTransactions.innerHTML = '';
    containerApp.style.opacity = '0';
  }
});

// ========================================
// request a loan , если депозит больше 10% от суммы запрашиваемого займа
// ========================================
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const loanAmount = Number(inputLoanAmount.value);
  // clear inputLoanAmount
  inputLoanAmount.value = '';
  // проверяем  если депозит больше 10% от суммы запрашиваемого займа
  const hasQualifyingDeposit = currentAccount.transactions.some(trans => {
    trans >= (loanAmount * 10) / 100;
  });
  if (loanAmount > 0 && hasQualifyingDeposit) {
    currentAccount.transactions.push(loanAmount);
    updateUi(currentAccount);
  }
});
// ========================================
// transactions sorting
// ========================================
let areTransactionSorted = false;

btnSort.addEventListener('click', function () {
  displayTransactions(currentAccount.transactions, !areTransactionSorted);
});
