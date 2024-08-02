const apiErrorsCatalog = {
    'Email already registered.': 'Email utilizado já está cadastrado.',
    'Value error, Passwords do not match.': 'As senhas devem ser iguais.',
    'Email or password is invalid.': 'Email ou senha inválidos',
}

export class FetchError extends Error { }

export const parseFetchError = (data: any) => {
    let errorMsg = '';
    if (Array.isArray(data.detail)) {
        for (const detail of data.detail) {
            if (typeof detail.msg === 'string') {
                if (detail.msg in apiErrorsCatalog) {
                    const msg = apiErrorsCatalog[detail.msg as keyof typeof apiErrorsCatalog];
                    errorMsg += `${msg}\n`;
                }
            }
        }
    } else {
        if (typeof data.detail == 'string' && data.detail in apiErrorsCatalog) {
            const msg = apiErrorsCatalog[data.detail as keyof typeof apiErrorsCatalog];
            errorMsg += `${msg}\n`;
        }
    }
    if (errorMsg.length === 0) {
        errorMsg = 'Ocorreu um erro não identificado.';
    }
    throw new FetchError(errorMsg);
}