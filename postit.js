/* Post It JavaScript */

const secretKey = "PostItSecretKey2026";
let user = null;


/* Save user data */
function saveUser() {

    user = {
        fullname: document.getElementById("fullname").value,
        birthday: document.getElementById("birthday").value,
        yearlevel: document.getElementById("yearlevel").value,
        gender: document.getElementById("gender").value,
        username: document.getElementById("username").value,
        password: document.getElementById("password").value
    };


    /* Check all fields */
    if (
        user.fullname === "" ||
        user.birthday === "" ||
        user.yearlevel === "" ||
        user.gender === "" ||
        user.username === "" ||
        user.password === ""
    ) {
        document.getElementById("message").textContent =
            "Please complete all fields.";

        return;
    }


    /* Hide user section */
    document.getElementById("userSection").style.display = "none";


    /* Show post section */
    document.getElementById("postSection").style.display = "block";


    document.getElementById("message").textContent =
        "You can now create a post.";
}


/* Add a new post */
function addPost() {

    const post = document.getElementById("post").value;


    /* Check caption */
    if (post === "") {
        document.getElementById("message").textContent =
            "Please enter a caption.";

        return;
    }


    /* Get current date */
    const date = new Date().toLocaleString();


    /* Prepare post data */
    const data = {
        username: user.username,
        post: post,
        date: date
    };


    /* Convert data to text */
    const text = JSON.stringify(data);


    /* Encrypt post data */
    const encrypted = CryptoJS.AES.encrypt(
        text,
        secretKey
    ).toString();


    /* Create post element */
    const postBox = document.createElement("div");

    postBox.className = "post-card";


    /* Display post data */
    postBox.innerHTML = `
        <div class="original-title">
            ORIGINAL POST
        </div>

        <div class="original-content">
            <b>User:</b> ${user.username}<br><br>
            <b>Post:</b> ${post}<br><br>
            <b>Date:</b> ${date}
        </div>

        <div class="encrypted-title">
            ENCRYPTED
        </div>

        <div class="encrypted-content">
            ${encrypted}
        </div>
    `;


    /* Add post to thread */
    document.getElementById("posts").prepend(postBox);


    /* Clear caption */
    document.getElementById("post").value = "";


    /* Show success message */
    document.getElementById("message").textContent =
        "Post added successfully.";
}
