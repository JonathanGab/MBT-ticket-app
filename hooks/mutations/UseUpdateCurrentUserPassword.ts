import { gql } from '@apollo/client';

export const UPDATE_CURRENT_USER_PASSWORD = gql`
  mutation Mutation(
    $updateCurrentUserPasswordId: ID!
    $currentPassword: String
    $newPassword: String
  ) {
    updateCurrentUserPassword(
      id: $updateCurrentUserPasswordId
      currentPassword: $currentPassword
      newPassword: $newPassword
    ) {
      id
    }
  }
`;
