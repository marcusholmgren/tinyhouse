import {gql} from "@apollo/client";

export const LOG_IN = gql`
  mutation LogIn($input: LogInInput) {
    logIn(login: $input) {
      id
      token
      avatar
      hasWallet
      didRequest
    }
  }
`;