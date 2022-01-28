/* exported Bank */
function Bank() {
  this.nextAccountNumber = 1;
  this.accounts = [];
}

Bank.prototype.openAccount = function (holder, balance) {
  if (balance <= 0 || typeof balance === 'string' || balance % 1 !== 0 || balance === undefined) {
    return null;
  } else {
    var account = new Account(this.nextAccountNumber, holder);
    account.deposit(balance);
    this.accounts.push(account);
    this.nextAccountNumber++;
    return account.number;
  }
};

Bank.prototype.getAccount = function (number) {
  for (var h = 0; h < this.accounts.length; h++) {
    if (this.accounts[h].number === number) {
      return this.accounts[h];
    }
  }
  return null;
};

Bank.prototype.getTotalAssets = function () {
  if (this.accounts.length === 0) {
    return 0;
  }
  var totalBalance = 0;
  for (var j = 0; j < this.accounts.length; j++) {
    totalBalance += this.accounts[j].getBalance();
  }
  return totalBalance;
};
