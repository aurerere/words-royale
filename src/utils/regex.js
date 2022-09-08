export function validName(str)
{
    let re = /^[a-zA-Z\-_.\d]{4,20}$/;
    return re.test(str);
}

export function validChar(str)
{
    let re = /^[a-zA-Z\-_.\d]$/;
    return re.test(str);
}