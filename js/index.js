let randUser;

fetch(`http://localhost:3000/users`) // generate username
    .then(resp => resp.json())
    .then(objArray => {
        randUser = objArray[getRandomInt(0, objArray.length)];
        console.log(randUser);
    });



document.addEventListener("DOMContentLoaded", function () {

    fetch('http://localhost:3000/books')
        .then((resp) => resp.json())
        .then((obj) => {
            obj.forEach(bookObj => {
                const ul = document.querySelector('#list');
                const li = document.createElement('li');

                li.textContent = bookObj.title;
                ul.append(li);

                li.addEventListener('click', e => {
                    const panel = document.querySelector('#show-panel');
                    panel.innerHTML =
                        `<img src=${bookObj.img_url}>
                        <h3>${bookObj.title}</h3>
                        <h4>${bookObj.subtitle}</h4>
                        <p>${bookObj.description}</p>`;

                    const userListElement = document.createElement('ul') // create list of users

                    bookObj.users.forEach(user => {
                        const userList = document.createElement('li');
                        userList.textContent = user.username;
                        userListElement.append(userList);
                    })
                    panel.append(userListElement);





                    const likeButton = document.createElement('button');
                    likeButton.textContent = "LIKE";
                    likeButton.addEventListener('click', e => {


                        let updatedUsers = [...bookObj.users];


                        let numUsers = updatedUsers.length;
                        if (updatedUsers[numUsers - 1].username !== randUser.username) {
                            updatedUsers.push(randUser);
                            const newUserElement = document.createElement('li');
                            newUserElement.textContent = randUser.username;
                            userListElement.append(newUserElement);

                            console.log(updatedUsers[numUsers - 1].username)

                        }

                        //console.log(element)


                        if (updatedUsers.length !== bookObj.users.length) {


                            fetch(`http://localhost:3000/books/${bookObj.id}`, {
                                method: 'PATCH',
                                headers: {
                                    "Content-Type": "application/json",
                                    "Accept": "application/json"
                                },
                                body: JSON.stringify({ "users": updatedUsers })
                            })
                                .then((resp) => resp.json())
                                .then((obj) => {

                                    bookObj.users = updatedUsers;
                                    console.log(obj)


                                })



                        }

                    })

                    panel.append(likeButton);


                })


            })
        })

});



function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

