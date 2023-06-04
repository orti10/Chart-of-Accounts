export const accountService = {
  generateRandomId,
  generateRandomBoolean,
  generateNodes,
  updateAccount,
};

function generateRandomId() {
  // Generate a random 6-character alphanumeric ID
  return Math.random().toString(36).substr(2, 6);
}

function generateRandomBoolean() {
  // Generate a random boolean value (true or false)
  return Math.random() < 0.5;
}

function generateNodes(baseName) {
  const nodes = [];
  const numElements = Math.floor(Math.random() * 4) + 2;
  for (let i = 0; i < numElements; i++) {
    const id = generateRandomId();
    const node = {
      id,
      name: `${baseName} ${id}`,
      has_children: generateRandomBoolean(),
    };
    nodes.push(node);
  }
  return nodes;
}

// Utility function to update an account within the chartOfAccounts array
function updateAccount(accounts, accountId, updatedAccount) {
  return accounts.map((account) => {
    if (account.id === accountId) {
      return updatedAccount;
    }
    if (account.accounts && account.accounts.length > 0) {
      return {
        ...account,
        accounts: updateAccount(account.accounts, accountId, updatedAccount),
      };
    }
    return account;
  });
}
