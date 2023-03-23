'use strict';
// https://app.diagrams.net/?src=about
// Simply Bank App

const account1 = {
  userName: 'Cecil Ireland',
  transactions: [500, 250, -300, 5000, -850, -110, -170, 1100],
  interest: 1.5,
  pin: 1111,
  transactionsDates: [
    '2020-10-02T14:43:31.074Z',
    '2020-10-29T11:24:19.761Z',
    '2020-11-15T10:45:23.907Z',
    '2021-01-22T12:17:46.255Z',
    '2021-02-12T15:14:06.486Z',
    '2021-03-09T11:42:26.371Z',
    '2021-10-09T07:43:59.331Z',
    '2021-10-11T15:21:20.814Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account2 = {
  userName: 'Amani Salt',
  transactions: [2000, 6400, -1350, -70, -210, -2000, 5500, -30],
  interest: 1.3,
  pin: 2222,
  transactionsDates: [
    '2020-10-02T14:43:31.074Z',
    '2020-10-29T11:24:19.761Z',
    '2020-11-15T10:45:23.907Z',
    '2021-01-22T12:17:46.255Z',
    '2021-02-12T15:14:06.486Z',
    '2021-03-09T11:42:26.371Z',
    '2021-05-21T07:43:59.331Z',
    '2021-06-22T15:21:20.814Z',
  ],
  currency: 'UAH',
  locale: 'uk-UA',
};

const account3 = {
  userName: 'Corey Martinez',
  transactions: [900, -200, 280, 300, -200, 150, 1400, -400],
  interest: 0.8,
  pin: 3333,
  transactionsDates: [
    '2020-10-02T14:43:31.074Z',
    '2020-10-29T11:24:19.761Z',
    '2020-11-15T10:45:23.907Z',
    '2021-01-22T12:17:46.255Z',
    '2021-02-12T15:14:06.486Z',
    '2021-03-09T11:42:26.371Z',
    '2021-05-21T07:43:59.331Z',
    '2021-06-22T15:21:20.814Z',
  ],
  currency: 'RUB',
  locale: 'ru-RU',
};

const account4 = {
  userName: 'Kamile Searle',
  transactions: [530, 1300, 500, 40, 190],
  interest: 1,
  pin: 4444,
  transactionsDates: [
    '2020-10-02T14:43:31.074Z',
    '2020-10-29T11:24:19.761Z',
    '2020-11-15T10:45:23.907Z',
    '2021-01-22T12:17:46.255Z',
    '2021-02-12T15:14:06.486Z',
  ],
  // currency: 'CAD',
  currency: 'EUR',
  locale: 'fr-CA',
};

const account5 = {
  userName: 'Oliver Avila',
  transactions: [630, 800, 300, 50, 120],
  interest: 1.1,
  pin: 5555,
  transactionsDates: [
    '2020-10-02T14:43:31.074Z',
    '2020-10-29T11:24:19.761Z',
    '2020-11-15T10:45:23.907Z',
    '2021-01-22T12:17:46.255Z',
    '2021-02-12T15:14:06.486Z',
  ],
  currency: 'USD',
  locale: 'en-US',
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
// displayDataInFormat
// ======================================
const displayDataInFormat = function (date) {
  // const operationDate = new Date(date);

  //  dataOperation =
  //   dateOperation.getDate() > 9
  //     ? `${dateOperation.getDate()}`
  //     : `0${dateOperation.getDate()}`;

  // const monthOperation =
  //   dateOperation.getMonth() > 8
  //     ? `${dateOperation.getMonth() + 1}`
  //     : `0${dateOperation.getMonth() + 1}`;
  const operationDate = new Date(date);
  const dateOperation = `${operationDate.getDate()}`.padStart(2, '0');
  console.log('dateOperation = ', dateOperation);
  const monthOperation = `${operationDate.getMonth() + 1}`.padStart(2, '0');
  const hoursOperation = `${operationDate.getHours()}`.padStart(2, '0');
  const minutesOperation = `${operationDate.getMinutes()}`.padStart(2, '0');
  const secondsOperation = `${operationDate.getSeconds()}`.padStart(2, '0');

  return [
    `${dateOperation}-${monthOperation}-${operationDate.getFullYear()}`,
    `${hoursOperation}:${minutesOperation}:${secondsOperation}`,
  ];
};
// ======================================
// displayTransactions
// ======================================
const displayTransactions = function (
  transactions,
  transactionsDates,
  sort = false
) {
  // если   sort = true, копируем  slice() сортированный массив .sort() и присваиваем переменной transacs, иначе оставляем не сортированнм
  const transacs = sort
    ? transactions.slice().sort((a, b) => (a > b ? 1 : -1))
    : transactions;

  containerTransactions.innerHTML = '';
  transacs.forEach(function (trans, index) {
    // получаем текущие дата время
    const [transactionsData, transactionsTime] = displayDataInFormat(
      transactionsDates[index]
    );
    const transType = trans > 0 ? 'deposit' : 'withdrawal';
    const transactionRow = `<div class="transactions__row">
<div class="transactions__type transactions__type--${transType}">
  ${index + 1} ${
      transType == 'deposit' ? 'ДЕПОЗИТ' : 'ВЫВОД СРЕДСТВ'
    } от ${transactionsData} ${transactionsTime}
</div>

<div class="transactions__value">${trans.toFixed(2)}$</div>

 </div>`;
    containerTransactions.insertAdjacentHTML('afterbegin', transactionRow);
  });
  // nodelist переносим в массив
  [...document.querySelectorAll('.transactions__row')].forEach((row, index) =>
    index % 2
      ? (row.style.backgroundColor = '#aeb4b7')
      : (row.style.backgroundColor = '')
  );
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
  labelBalance.textContent = `${balance.toFixed(2)}$`;
};

// ========================================
// displayTotal
// ========================================
const displayTotal = function ({ transactions, interest }) {
  const depositesTotal = `${transactions
    .filter(item => item > 0)
    .reduce((acc, item) => acc + Math.abs(item), 0)
    .toFixed(2)}$`;
  labelSumIn.textContent = depositesTotal;

  const withdrawalsTotal = `${transactions
    .filter(item => item < 0)
    .reduce((acc, item) => acc + Math.abs(item), 0)
    .toFixed(2)}$`;
  labelSumOut.textContent = withdrawalsTotal;

  const interestTotal = `${transactions
    .filter(item => item > 0)
    .map(item => (item * interest) / 100)
    .filter(item => item > 5)
    .reduce((acc, item) => acc + item, 0)
    .toFixed(2)}$`;
  labelSumInterest.textContent = interestTotal;
};

// ========================================
// Display transactions, balance, total
// ========================================
function updateUi(account) {
  // получаем текущие дата время
  const [nowData] = displayDataInFormat(new Date());
  labelDate.textContent = `${nowData}`;
  // Display transactions
  displayTransactions(account.transactions, account.transactionsDates);
  // Display balance
  displayBalance(account);
  //  Display total
  displayTotal(account);
}

createNicknames(accounts);
console.log(accounts);
let currentAccount;

// ========================================
// Always logged in
// ========================================
currentAccount = accounts[0];
updateUi(currentAccount);
containerApp.style.opacity = '100';

// ========================================
// login
// ========================================
btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  const loginUsername = inputLoginUsername.value;
  const loginPin = inputLoginPin.value;
  currentAccount = accounts.find(item => item.nickName == loginUsername);
  if (currentAccount.pin == +loginPin) {
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
    currentAccount.transactions.push(-transferAmount);
    recipientAccount.transactions.push(+transferAmount);
    currentAccount.transactionsDates.push(new Date().toISOString());
    recipientAccount.transactionsDates.push(new Date().toISOString());

    updateUi(currentAccount);
  }
});

// ========================================
// delete account
// ========================================
btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  const closeUsername = inputCloseUsername.value;
  const closePin = +inputClosePin.value;
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
  const loanAmount = Math.floor(inputLoanAmount.value);
  console.log(typeof loanAmount);
  // clear inputLoanAmount
  inputLoanAmount.value = '';
  // проверяем  есть ли депозит больше 10% от суммы запрашиваемого займа
  const hasQualifyingDeposit = currentAccount.transactions.some(
    trans => trans >= (loanAmount * 10) / 100
  );

  if (loanAmount > 0 && hasQualifyingDeposit) {
    currentAccount.transactions.push(loanAmount);
    currentAccount.transactionsDates.push(new Date().toISOString());
    updateUi(currentAccount);
  }
});
// ========================================
// transactions sorting
// ========================================
let areTransactionSorted = false;

btnSort.addEventListener('click', function () {
  displayTransactions(
    currentAccount.transactions,
    currentAccount.transactionsDates,
    !areTransactionSorted
  );
});
