const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:3001'
export const fileuploadserv = {
    folderupload,
    sharefolder,
    listfiles
};
const headers = {
    'Accept': 'application/json'
};
function folderupload(myfolder)
{
    console.log("its folder in fileuploadserv"+myfolder);
    return fetch('http://localhost:3001/folderupload', {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {...headers, 'Content-Type': 'application/json'},
        body: JSON.stringify({myfolder})
    }).then((response) => response.json()).then((responseJson) => {
            return responseJson;
    }).catch(error => {
        console.log("This is error");
        return error;
    });
}
function sharefolder(mysharedfolder,sharedemail)
{
    console.log("its sharedfolder in fileuploadserv"+mysharedfolder,sharedemail);
    return fetch(`${api}/sharefolder`, {
        method: 'POST',
        mode:'cors',
        credentials:'include',
        headers: { ...headers,'Content-Type': 'application/json' },
        body: JSON.stringify({mysharedfolder,sharedemail})
    }).then(res => {
        return res.status;
    }).catch(error => {
        console.log("This is error");
        return error;
    });
}
export const getImages = () =>
    fetch(`${api}/files/`)
        .then(res => res.json())
        .catch(error => {
            console.log("This is error.");
            return error;
        });

export const uploadFile = (payload,mypic) =>

    fetch(`${api}/files/upload`, {
        method: 'POST',
        credentials:'include',
        mode:'cors',
        body: payload
    }).then(res => {
        return res.status;
    }).catch(error => {
            console.log("This is error");
            return error;
        });

function listfiles() {
    return fetch(`${api}/listfiles`, {
        method: 'POST',
        credentials: 'include',
        mode: 'cors'
    }).then((response) => response.json()).then((responseJson) => {
        console.log("hii its response JSon" + responseJson);
        return responseJson;
    }).catch(error => {
        console.log("This is error");
        return error;
    });
}
   export const starfile = (payload) =>
   fetch(`${api}/starfile`, {
        method: 'POST',
        credentials:'include',
        mode:'cors',
        body: payload
    }).then(res => {
        return res.status;
    }).catch(error => {
            console.log("This is error");
            return error;
        });
export const sharefile = (payload,sharing_email) =>
   fetch(`${api}/sharefile`, {
        method: 'POST',
        credentials:'include',
        mode:'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ payload,sharing_email})
    }).then((response) => response.json()).then((responseJson) => {
                return responseJson;
    }).catch(error => {
            console.log("This is error");
            return error;
        });

    export const deletefile= (file)=>
    fetch(`${api}/deletefile`, {
        method: 'POST',
        credentials:'include',
        mode:'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ file})
    }).then((response) => response.json()).then((responseJson) => {
                return responseJson;
    }).catch(error => {
            console.log("This is error");
            return error;
        });