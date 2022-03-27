export function get(request){


    return {
        status: 404,
        headers: {"Content-Type": "application/json; charset=utf-8"},
        body: { variable: "get function", token: "snbajdskjhfsskkee437hdfjkkjdf" }

    }
}

export async function post({request}){
    const bodyd = await request.text()
    console.log(bodyd)
    return {
        status: 200
    }
}