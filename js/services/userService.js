const API_URL = "http://localhost:3001/users";

export async function getUsers(){
    try {
        const response = await fetch(API_URL);

        if(!response.ok){
            throw new Error("Fail to fetch users");
        }

        const users = await response.json();
        
        return users;
    } catch (error) {
        console.log("Error: ", error);
        return [];
    }
}