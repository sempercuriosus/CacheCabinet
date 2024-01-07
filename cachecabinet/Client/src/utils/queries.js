import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($email: String!) {
      _id
      email
  }
`;
