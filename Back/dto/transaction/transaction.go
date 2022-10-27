package transactiondto

type CreateTransactionRequest struct {
	Value   string `json:"value" validate:"required"`
	Product string `json:"product" validate:"required"`
	BuyerID int    `json:"user_id"`
	AdminID int    `json:"admin_id"`
}

type UpdateTransactionRequest struct {
	Value   string `json:"value"`
	Product string `json:"product"`
	BuyerID int    `json:"user_id"`
	AdminID int    `json:"admin_id"`
}

type TransactionResponse struct {
	ID      int    `json:"id"`
	Date    string `json:"date"`
	Value   string `json:"value"`
	Status  string `json:"status"`
	BuyerID int    `json:"user_id"`
	AdminID int    `json:"admin_id"`
	Product string `json:"product"`
}
