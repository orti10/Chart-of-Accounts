import React from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import "./ListView.css";

const ListView = ({
  handleCollapseAccount,
  handleExpandAccount,
  chartOfAccounts,
}) => {
  const renderListView = (accounts, parentNumber = "", level = 0) => {
    return (
      <ul>
        {accounts.map((account, index) => {
          const organNumber = parentNumber
            ? `${parentNumber}.${index + 1}`
            : `${index + 1}`;

          // Calculate the background color based on the level
          const backgroundColor = `hsl(${level * 30}, 90%, 90%)`;
          // Apply the background color to the list item
          const listItemStyle = {
            backgroundColor,
            fontWeight: account.expanded ? "bold" : "normal",
            marginBottom: "4px",
          };
          return (
            <li key={account.id}>
              <List className="listContainer" style={listItemStyle}>
                {account.has_children ? (
                  <ListItemButton
                    onClick={() => {
                      account.expanded
                        ? handleCollapseAccount(account.id)
                        : handleExpandAccount(account.id);
                    }}
                  >
                    <ListItemText
                      primary={`${organNumber}. ${account.name}`}
                      primaryTypographyProps={{ style: listItemStyle }}
                    />
                    {account.expanded ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                ) : (
                  <ListItemButton>
                    <ListItemText primary={`${organNumber}. ${account.name}`} />
                  </ListItemButton>
                )}
              </List>
              {account.expanded &&
                renderListView(account.accounts, organNumber, level + 1)}
            </li>
          );
        })}
      </ul>
    );
  };

  return renderListView(chartOfAccounts);
};

export default ListView;
