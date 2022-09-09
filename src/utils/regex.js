export function validName(str)
{
    let re = /^[a-zA-Z\-_.\d]{4,20}$/;
    return re.test(str);
}

export function validLetter(str)
{
    let re = /^[a-zA-Z]$/;
    return re.test(str);
}