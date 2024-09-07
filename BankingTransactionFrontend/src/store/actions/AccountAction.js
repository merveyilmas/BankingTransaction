import AccountService from "../../services/AccountService";

export const GET_ALL_ACCOUNTS = "GET_ALL_ACCOUNTS";

let accountService = new AccountService();


export function getAllAccountsByAuthUser() {

    // const accounts = await accountService.getAllAccountsByAuthUser()
    // console.log("initial values:")
    // console.log(accounts)

    // return {
    //     type: GET_ALL_ACCOUNTS,
    //     payload: await accounts.json()
    // }

    return async (dispatch) => {
        try {
          const response = await accountService.getAllAccountsByAuthUser()
        
          dispatch({ type: 'GET_ALL_ACCOUNTS', payload: response.data });
        } catch (error) {
          dispatch({ type: 'GET_ALL_ACCOUNTS', payload: [] });
        }
      };
}
