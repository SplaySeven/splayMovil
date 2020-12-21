import {gql} from '@apollo/client';

export const IS_FRIEND = gql`
	query isFriend($id: ID!) {
		isFriend(id: $id)
	}
`;
export const FRIEND = gql`
	mutation friend($id: ID!) {
		friend(id: $id)
	}
`;

export const UN_FRIEND = gql`
	mutation unFriend($id: ID!) {
		unFriend(id: $id)
	}
`;
export const GET_FRIENDS = gql`
	query getFriends($id: ID!) {
		getFriends(id: $id) {
			id
			email
			name
			avatar
		}
	}
`;
export const GET_NOTFRIEND = gql`
	query getNotFriends {
		getNotFriends {
			id
			name
			lastname
			avatar
			country
		}
	}
`;
