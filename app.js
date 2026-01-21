const signInBtn = document.getElementById("sign-in");
const signUpBtn = document.getElementById("sign-up");

signInBtn.addEventListener("click", () => {
    location.href = "/sign-in/";
});

signUpBtn.addEventListener("click", () => {
    location.href = "/sign-up/";
});
