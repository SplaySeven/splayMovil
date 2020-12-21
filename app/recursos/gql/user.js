import {gql} from '@apollo/client';

export const NEW_ACCOUNT = gql`
	mutation newUser($input: UserInput) {
		newUser(input: $input) {
			id
			email
			name
			lastname
			birthdayDay
			birthdayMonth
			birthdayYear
			country
			city
			latitude
			longitude
			gender
			type
			uidFirebase
		}
	}
`;

export const AUTHENTICATE_USER = gql`
	mutation authenticateUser($input: authenticateInput) {
		authenticateUser(input: $input) {
			token
		}
	}
`;

export const GET_USER = gql`
	query getUser($id: ID, $email: String, $uidFirebase: String) {
		getUser(id: $id, email: $email, uidFirebase: $uidFirebase) {
			id
			email
			phone
			name
			lastname
			gender
			birthdayDay
			birthdayMonth
			birthdayYear
			country
			city
			latitude
			longitude
			avatar
			picture
			active
			confirmed
			created
			type
			connected
		}
	}
`;

export const UPDATE_AVATAR = gql`
	mutation updateAvatar($file: Upload) {
		updateAvatar(file: $file) {
			status
			urlAvatar
		}
	}
`;
export const UPDATE_PICTURE = gql`
	mutation updatePicture($file: Upload) {
		updatePicture(file: $file) {
			status
			urlPicture
		}
	}
`;
export const SEARCH = gql`
	query search($search: String) {
		search(search: $search) {
			name
			lastname
			id
			avatar
		}
	}
`;
export const DELETE_AVATAR = gql`
	mutation deleteAvatar {
		deleteAvatar
	}
`;

export const DELETE_PICTURE = gql`
	mutation deletePicture {
		deletePicture
	}
`;

export const ISUSER_FIREBASE = gql`
	query isUserFirebase($uidFirebase: String!) {
		isUserFirebase(uidFirebase: $uidFirebase)
	}
`;

export const USER_CONNECTD = gql`
	mutation connecteUser($connected: String) {
		connectedUser(connected: $connected)
	}
`;

export const GETUSER_CONNECT = gql`
	query getUserConnect($connected: String) {
		getUserConnect(connected: $connected) {
			id
			avatar
			name
		}
	}
`;
