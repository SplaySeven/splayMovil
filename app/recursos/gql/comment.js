import {gql} from '@apollo/client';

export const ADD_COMMENT = gql`
	mutation addComment($input: commentInput) {
		addComment(input: $input) {
			idPublication
			comment
			createAt
		}
	}
`;

export const GET_COMMENTS = gql`
	query getComments($idPublication: ID!) {
		getComments(idPublication: $idPublication) {
			idUser {
				id
				name
				avatar
			}
			comment
			createAt
		}
	}
`;

export const COUNT_COMMENTS = gql`
	query countComments($idPublication: ID!) {
		countComments(idPublication: $idPublication)
	}
`;
