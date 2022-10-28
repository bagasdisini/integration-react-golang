package authdto

type AuthRequest struct {
	Email    string `json:"email" validate:"required"`
	Password string `json:"password" validate:"required"`
	Role     string `json:"role" validate:"required"`
}

type AuthResponse struct {
	Email    string `json:"email"`
	Password string `json:"password"`
	FullName string `json:"fullName"`
	Token    string `json:"token"`
	Role     string `json:"role"`
}

type CheckAuthResponse struct {
	Email    string `json:"email"`
	Password string `json:"password"`
	FullName string `json:"fullName"`
	Token    string `json:"token"`
	Role     string `json:"role"`
}
