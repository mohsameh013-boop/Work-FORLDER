function handleAuth() {
    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const messageArea = document.getElementById('messageArea');

    const username = usernameInput.value;
    const email = emailInput.value;
    const password = passwordInput.value;

    
    if (!username || !email || !password) {
        showMessage("Please fil all Inputs (Name,Email,Password)", "error");
        return;
    }

    
    const storedUserDataString = localStorage.getItem('userData');
    
    if (storedUserDataString) {
        
        const storedUserData = JSON.parse(storedUserDataString);

        
        if (storedUserData.username === username && 
            storedUserData.email === email && 
            storedUserData.password === password) {
            
            showMessage("Success Please Wait a Little Pit", "success");
            
            setTimeout(() => {
                window.location.href = 'welcome.html';
            }, 1500);
        } else {
            showMessage("Error on Inputs Information (Name,Email,Password)", "error");
        }

    } else {
        
        const userData = {
            username: username,
            email: email,
            password: password
        };
       
        localStorage.setItem('userData', JSON.stringify(userData));
        showMessage("Success Please Wait a Little Pit", "success");
        

        setTimeout(() => {
            window.location.href = 'welcome.html';
        }, 1500);
    }
}


function showMessage(msg, type) {
    const messageArea = document.getElementById('messageArea');
    messageArea.textContent = msg;
    messageArea.className = `message ${type}`;
    messageArea.style.display = 'block';
}