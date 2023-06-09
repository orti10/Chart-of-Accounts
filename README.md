# Chart of Accounts

## Summary

Application that managing customer’s CoA (Chart of Accounts) - A hierarchical structure of the different accounts owned and controlled by the customer.
Each account in the COA can contain sub-accounts, making the COA a tree structure.

## Overview

- React component that reads the data from the store and renders a tree view (without using an external library for tree rendering).
- Each account in the tree that has sub-accounts (has_children=true) can be expanded.
- An account with children can also be collapsed once expanded, the data is saved (whether or not an
  account node is expanded in the corresponding node object) in the redux store.
- Each child that is expanded is given a new color in a calculated in a way to emphasize the hierarchy.
- Refresh button - In case there is no account that can expand (no children), you can easily refresh the page.
- (Because it's generate data)
- Collapse all button - Collapse all the accounts with children that expanded.

## Getting Started

1. Clone the repository to your local machine
   git clone https://github.com/orti10/Chart-of-Accounts.git
2. Install the dependencies by running `npm i` on the command line from the project directory.
3. Open the terminals, and start the frontend client - `npm start`

Dashboars with data:
![screen](https://github.com/orti10/Chart-of-Accounts/assets/44768171/003b305b-fdaa-413e-bae5-b04ac17fc317)
