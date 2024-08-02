export type AuthenticationResponse = {
    access_token: string
    refresh_token: string
}

export type UserResponse = {
    id: string
    name: string
    email: string
    phone: string | null
    is_email_verified: boolean
    created_at: string
    updated_at: string
}