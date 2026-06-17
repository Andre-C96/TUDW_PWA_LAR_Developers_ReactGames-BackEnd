const validateEmail = (email) => {
    if (!email || typeof email !== 'string' || email.trim() === '') {
        return {
            status: 400,
            success: false,
            message: 'The email field is required and must be a valid string.'
        };
    }

    const cleanEmail = email.trim().toLowerCase();

    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!regexEmail.test(cleanEmail)) {
        return {
            status: 400,
            success: false,
            message: 'The email field must be a valid email address.'
        };
    }

    return {
        status: 200,
        success: true,
        message: 'The email is valid.',
        emailCleaned: cleanEmail 
    }; 
};

module.exports = {
    validateEmail
};