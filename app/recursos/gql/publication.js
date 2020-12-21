import {gql} from '@apollo/client';

export const PUBLISH = gql`
	mutation publish($file: Upload, $comments: String) {
		publish(file: $file, comments: $comments) {
			status
			urlFile
		}
	}
`;
export const PUBLISHMOVIL = gql`
	mutation publishMovil($file: Upload, $comments: String) {
		publishMovil(file: $file, comments: $comments) {
			status
			urlFile
		}
	}
`;


export const GET_PUBLICATIONS = gql`
	query getPublicactions($id: ID!) {
		getPublications(id: $id) {
			id
			idUser
			file
			typeFile
			createAt
			comments
			state
		}
	}
`;

export const GET_PUBLICATIONS_FOLLOWEDS_FRIENDS = gql`
	query gePublicationsFollersFriend {
		getPublicationsFollersFriends {
			id
			idUser {
				id
				name
				avatar
			}
			file
			typeFile
			createAt
			comments
		}
	}
`;
export const DELETE_PUBLICATION = gql`
	mutation deletePublish($id: ID!) {
		deletePublish(id: $id)
	}
`;
