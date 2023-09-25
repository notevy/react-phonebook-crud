import axios from "axios";

export const login = () => {
    location.href = "https://test-login.softrig.com/connect/authorize?client_id=fdda41a2-409b-48ee-a733-c027770f401d&redirect_uri=https://phonebook-crud.no/redirect&response_type=code&prompt=login&scope=AppFramework profile openid offline_access&state='<optional-state>'";
}

const getToken = async (code : string) => {
    const result = await axios.post('https://test-login.softrig.com/connect/token"', {
            client_id: 'fdda41a2-409b-48ee-a733-c027770f401d',
            code: code,
            grant_type: 'authorization_code',
            client_secret: 'test',
            redirect_uri: 'https://phonebook-crud.no/redirect'
        })
    console.log(result);
}