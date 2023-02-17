window.addEventListener('DOMContentLoaded', async (event) => {
    try{
        const users = document.getElementById('users');
        const response = await axios.get('http://13.232.161.154:3000/user/getuser');
        // console.log(response.data.data);
        if(response.status === 200)
        {
            users.innerHTML = '';
            for(let i=0;i<response.data.data.length;i++)
            {
                showUserOnScreen(response.data.data[i]);
            }
        }
    }
    catch(err){
        console.log(err);
    }
});

async function addDetails(event){
    try{
            event.preventDefault();

        const name =  event.target.name.value;
        const email =  event.target.email.value;
        const userDetails = {
            name,
            email
        };
        
        console.log(userDetails);
        const response = await axios.post('http://13.232.161.154:3000/user/postuser', userDetails);
        // console.log(response);
        if(response.status === 200){
            showUserOnScreen(response.data.data);

            document.getElementById('name').value = '';
            document.getElementById('email').value = '';
        }
        else{
            throw new Error('Something Went wrong');
        }
    }
    catch(err) {
        console.log(err);
    }
}

async function deleteUser(userId) {
    try{
        const response = await axios.delete(`http://13.232.161.154:3000/user/deleteuser/${userId}`);
        // console.log(response);
        if(response.status === 200)
        {
            console.log('User Successfully deleted');
            removeUserFromScreen(userId);
        }
        else
        {
            throw new error('Something went wrong');
        }
    }
    catch(err){
        console.log(err);
    }
}

function editUserDetails(userId,nm,eml)
{
    document.getElementById('name').value = nm;
    document.getElementById('email').value = eml;

    deleteUser(userId);
}

function showUserOnScreen(user){
    const parentElement = document.getElementById('users');
    const childHtml = `<li id=${user._id}>${user.name} - ${user.email}
                       <button onclick = editUserDetails("${user._id}","${user.name}","${user.email}")>Edit User</button>
                       <button onclick = deleteUser("${user._id}")>Delete User</button>
                       </li>`
    parentElement.innerHTML += childHtml;                   
}

function removeUserFromScreen(userId)
{
    const parentElement = document.getElementById('users');
    const childElement = document.getElementById(userId);
    if(childElement)
    {
        parentElement.removeChild(childElement);
    }
}

