import {useEffect, useState} from "react";

export function ProfileEdit({userId}) {
    const [userData, setUserData] = useState({});

    useEffect(() => {
        // setUserData({});
        const abortController = new AbortController();

        async function loadUser() {
            try {
                const response = await fetch(
                    `https://jsonplaceholder.typicode.com/users/${userId}`,
                    { signal: abortController.signal }
                );
                const userFromAPI = await response.json();
                setUserData(userFromAPI);
            } catch (error) {
                if (error.name === "AbortError") {
                    // Ignore `AbortError`
                    console.log("Aborted", userId);
                } else {
                    throw error;
                }
            }
        }

        loadUser().then(r => {});

        return () => abortController.abort();
    }, [userId]);

    useEffect(() => {
        if(userData.name) {
            document.title = `${userData.name} Edit Profile`
        } else {
            document.title = `Edit Profile`
        }
    }, [userData])

    const changeHandler = (event) => (
        setUserData({
            ...userData,
            [event.target.name]: event.target.value
        })
    )

    const submitHandler = async (event) => {
        event.preventDefault();
        console.log(userData)
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userData.id}`, {
            method: 'PUT',
            body: JSON.stringify(userData),
            headers: {
                "Content-type": "application/json;charset=UTF-8"
            }
        })
        const savedData = await response.json();
        console.log('data saved' + savedData);
    }

    return (userData.name)? (
        <>
            <form onSubmit={submitHandler}>
                <label htmlFor="name">
                    Enter name:
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={userData.name}
                        onChange={changeHandler}
                    />
                </label>
                <label htmlFor="email">
                    Enter email:
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={userData.email}
                        onChange={changeHandler}
                    />
                </label>
                <button type="submit">Submit</button>
            </form>
        </>
    ) : <p>Loading...</p>
}
