// Regular expression for validating email based on RFC 3696
const emailRegex =
    /^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~.-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~.-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;

export function validateEmailRFC3696(email: string): boolean {
    // Additional length checks as per the standard
    if (email.length > 320) return false; // Max length of an email address
    const [localPart, domainPart] = email.split('@');
    if (!localPart || !domainPart) return false;
    if (localPart.length > 64 || domainPart.length > 255) return false;

    return emailRegex.test(email);
}
