import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setChartOfAccounts } from "../redux/actions";
import { accountService } from "../services/account.service";
import RefreshIcon from "@mui/icons-material/Refresh";
import Tooltip from "@mui/material/Tooltip";
import ListView from "./ListView";
import "./TreeView.css";

const TreeView = () => {
  const chartOfAccounts = useSelector((state) => state.chartOfAccounts);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchChartOfAccounts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Mock API response to fetch the chart of accounts data
  const fetchChartOfAccounts = () => {
    // Mock API call
    const baseName = "Account";
    const result = accountService.generateNodes(baseName);

    // Set the chart of accounts in the Redux store
    dispatch(setChartOfAccounts(result));
  };

  // Handle account expansion
  const handleExpandAccount = (accountId) => {
    // Check if the account has already been expanded
    const account = findAccount(chartOfAccounts, accountId);
    if (account && account.has_children && !account.expanded) {
      // Mock API call to fetch sub-accounts
      if (account.accounts?.length) {
        const updatedAccount = {
          ...account,
          expanded: true,
        };
        const updatedChartOfAccounts = accountService.updateAccount(
          chartOfAccounts,
          accountId,
          updatedAccount
        );
        dispatch(setChartOfAccounts(updatedChartOfAccounts));
      } else {
        const baseName = "Account";
        const subAccounts = accountService.generateNodes(baseName);
        // Update the account's expanded state
        const updatedAccount = {
          ...account,
          expanded: true,
          accounts: subAccounts,
        };
        // Create a new copy of the chartOfAccounts array
        const updatedChartOfAccounts = accountService.updateAccount(
          chartOfAccounts,
          accountId,
          updatedAccount
        );
        // Dispatch the setChartOfAccounts action with the updated array
        dispatch(setChartOfAccounts(updatedChartOfAccounts));
      }
    }
  };

  // Handle account collapse
  const handleCollapseAccount = (accountId) => {
    // Check if the account has already been expanded
    const account = findAccount(chartOfAccounts, accountId);
    if (account && account.expanded) {
      // Update the account's expanded state
      const updatedAccount = { ...account, expanded: false };
      // Create a new copy of the chartOfAccounts array
      const updatedChartOfAccounts = accountService.updateAccount(
        chartOfAccounts,
        accountId,
        updatedAccount
      );
      // Dispatch the setChartOfAccounts action with the updated array
      dispatch(setChartOfAccounts(updatedChartOfAccounts));
    }
  };

  const handleCollapseAllAccounts = () => {
    // Create a new copy of the chartOfAccounts array
    const updatedChartOfAccounts = collapseAllAccounts(chartOfAccounts);
    // Dispatch the setChartOfAccounts action with the updated array
    dispatch(setChartOfAccounts(updatedChartOfAccounts));
  };

  // Utility function to recursively collapse all accounts
  const collapseAllAccounts = (accounts) => {
    return accounts.map((account) => {
      const updatedAccount = { ...account, expanded: false };
      if (updatedAccount.accounts && updatedAccount.accounts.length > 0) {
        updatedAccount.accounts = collapseAllAccounts(updatedAccount.accounts);
      }
      return updatedAccount;
    });
  };

  // Utility function to find an account by its ID
  const findAccount = (accounts, accountId) => {
    for (const account of accounts) {
      if (account.id === accountId) {
        return account;
      }
      if (account.accounts && account.accounts.length > 0) {
        const foundAccount = findAccount(account.accounts, accountId);
        if (foundAccount) {
          return foundAccount;
        }
      }
    }
    return null;
  };
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <>
      <div className="buttonsContainer">
        <Tooltip title="Refresh" arrow>
          <RefreshIcon
            className="refreshButton"
            variant="contained"
            color="primary"
            onClick={handleRefresh}
          />
        </Tooltip>
        <button
          className="collapseAllButton"
          onClick={handleCollapseAllAccounts}
        >
          Collapse All
        </button>
      </div>

      <ListView
        handleCollapseAccount={handleCollapseAccount}
        handleExpandAccount={handleExpandAccount}
        chartOfAccounts={chartOfAccounts}
      />
    </>
  );
};

export default TreeView;
