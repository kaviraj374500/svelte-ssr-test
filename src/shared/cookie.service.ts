class CookieService {
    getCookie(name: string): string | null {
        if (!name || typeof document === 'undefined') { // Check if document is defined
            return null;
        }
        const nameEQ = name + '=';
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') { c = c.substring(1, c.length); }
            if (c.indexOf(nameEQ) === 0) {
                return c.substring(nameEQ.length, c.length);
            }
        }
        return null;
    }
    
    deleteCookie(name: string): void {
        this.setCookie(name, '');
    }

    setCookie(name: string, value: string): void {
        if (typeof document === 'undefined') { // Check if document is defined
            return;
        }
        let expires = '';
        try {
            let parsedValue = JSON.parse(value);
            if (parsedValue && parsedValue.customerAccessToken && parsedValue.customerAccessToken.expiresAt) {
                let date = new Date(parsedValue.customerAccessToken.expiresAt);
                expires = "; expires=" + date.toUTCString();
            }
        } catch (e) {
            // console.error('Invalid JSON string:', value);
        }
        document.cookie = name + "=" + value + expires + "; path=/";
    }
}

export default new CookieService();