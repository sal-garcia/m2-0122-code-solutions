/* exported Account */

function Account(number, holder) {
  this.number = number;
  this.holder = holder;
  this.transactions = [];
}

Account.prototype.deposit = function (amount) {
  if (amount <= 0 || isNaN(amount) || typeof amount === 'string' || amount % 1 !== 0) {
    return false;
  } else {
    var trans = new Transaction('deposit', amount);
    this.transactions.push(trans);
    return true;
  }
};

Account.prototype.withdraw = function (amount) {
  if (amount <= 0 || isNaN(amount) || typeof amount === 'string' || amount % 1 !== 0) {
    return false;
  } else {
    var trans = new Transaction('withdrawal', amount);
    this.transactions.push(trans);
    return true;
  }
};

Account.prototype.getBalance = function () {
  var balance = 0;
  for (var i = 0; i < this.transactions.length; i++) {
    if (this.transactions[i].type === 'deposit') {
      balance += this.transactions[i].amount;
    }
    if (this.transactions[i].type === 'withdrawal') {
      balance -= this.transactions[i].amount;
    }
  }
  return balance;
};
