import {gql} from '@apollo/client';
export const FOLLOW = gql`
	mutation follow($id: ID!) {
		follow(id:$id)
	}
`;