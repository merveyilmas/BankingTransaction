const SessionInfo = Object.freeze({

    TOKEN: sessionStorage.getItem("token"),
    USER_NAME: sessionStorage.getItem("username")
});

export default SessionInfo;