export const GET_USERNAME = "GET_USERNAME";

export function getUsername(authUsername) {

    return {
        type: GET_USERNAME,
        payload: authUsername
    }
}
