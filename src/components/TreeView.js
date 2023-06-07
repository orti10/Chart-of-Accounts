import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  setChartOfAccounts,
  expandAccount,
  collapseAccount,
} from "../redux/actions";
import { accountService } from "../services/account.service";
import RefreshIcon from "@mui/icons-material/Refresh";
import Tooltip from "@mui/material/Tooltip";
import ListView from "./ListView";
import "./TreeView.css";

const TreeView = ({ chartOfAccounts, dispatch }) => {
  useEffect(() => {
    fetchChartOfAccounts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchChartOfAccounts = async () => {
    // Simulate an API call to fetch the chart of accounts data
    const baseName = "Account";
    const result = await accountService.generateNodes(baseName);
    dispatch(setChartOfAccounts(result));
  };

  // Handle account expansion
  const handleExpandAccount = (accountId) => {
    const account = findAccount(chartOfAccounts, accountId);
    if (account && account.has_children && !account.expanded) {
      if (account.accounts && account.accounts.length) {
        // Dispatch the expandAccount action with the accountId
        dispatch(expandAccount(accountId));
      } else {
        const baseName = "Account";
        const subAccounts = accountService.generateNodes(baseName);
        const updatedAccount = {
          ...account,
          expanded: true,
          accounts: subAccounts,
        };
        const updatedChartOfAccounts = accountService.updateAccount(
          chartOfAccounts,
          accountId,
          updatedAccount
        );
        dispatch(setChartOfAccounts(updatedChartOfAccounts));
      }
    }
  };

  // Handle account collapse
  const handleCollapseAccount = (accountId) => {
    const account = findAccount(chartOfAccounts, accountId);
    if (account && account.expanded) {
      // Dispatch the collapseAccount action with the accountId
      dispatch(collapseAccount(accountId));
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

const mapStateToProps = (state) => {
  return {
    chartOfAccounts: state.chartOfAccounts,
  };
};

export default connect(mapStateToProps)(TreeView);
