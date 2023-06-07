const initialState = {
  chartOfAccounts: [],
};

const expandAccount = (data, accountId) => {
  return data.map((account) => {
    if (account.id === accountId && account.has_children) {
      return { ...account, expanded: true };
    } else if (account.accounts && account.accounts.length > 0) {
      return {
        ...account,
        accounts: expandAccount(account.accounts, accountId),
      };
    }
    return account;
  });
};

const collapseAccount = (data, accountId) => {
  return data.map((account) => {
    if (account.id === accountId && account.has_children) {
      return { ...account, expanded: false };
    } else if (account.accounts && account.accounts.length > 0) {
      return {
        ...account,
        accounts: collapseAccount(account.accounts, accountId),
      };
    }
    return account;
  });
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_CHART_OF_ACCOUNTS":
      return { ...state, chartOfAccounts: action.payload };
    case "EXPAND_ACCOUNT":
      return {
        ...state,
        chartOfAccounts: expandAccount(state.chartOfAccounts, action.payload),
      };
    case "COLLAPSE_ACCOUNT":
      return {
        ...state,
        chartOfAccounts: collapseAccount(state.chartOfAccounts, action.payload),
      };
    default:
      return state;
  }
};

export default rootReducer;
