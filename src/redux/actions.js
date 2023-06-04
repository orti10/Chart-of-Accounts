export const setChartOfAccounts = (data) => {
  return {
    type: "SET_CHART_OF_ACCOUNTS",
    payload: data,
  };
};

export const expandAccount = (accountId) => {
  return {
    type: "EXPAND_ACCOUNT",
    payload: accountId,
  };
};

export const collapseAccount = (accountId) => {
  return {
    type: "COLLAPSE_ACCOUNT",
    payload: accountId,
  };
};
