import {gql} from '@apollo/client';

export const USER_QUERY = gql`
  query Users($offset: Int!, $limit: Int!) {
    users(pageInfo: {offset: $offset, limit: $limit}) {
      nodes {
        name
        email
        id
      }
      pageInfo {
        hasNextPage
      }
    }
  }
`;

export interface UsersQuery {
  users: UserNodes;
  pageInfo: PageInfoItem;
}

interface PageInfoItem {
  hasNextPage: boolean;
}

interface UserNodes {
  nodes: UserNodesItem[];
  pageInfo: PageInfoItem;
}

export interface UserNodesItem {
  name: string;
  email: string;
  id: string;
}
export interface UserQueryVariables {
  offset: number;
  limit: number;
}
