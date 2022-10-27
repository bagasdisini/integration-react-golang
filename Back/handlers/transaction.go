package handlers

import (
	dto "backend/dto/result"
	transactiondto "backend/dto/transaction"
	"backend/models"
	"backend/repositories"
	"encoding/json"
	"net/http"
	"strconv"
	"time"

	"github.com/go-playground/validator/v10"
	"github.com/golang-jwt/jwt/v4"
	"github.com/gorilla/mux"
)

type handlerTransaction struct {
	TransactionRepository repositories.TransactionRepository
}

func HandlerTransaction(TransactionRepository repositories.TransactionRepository) *handlerTransaction {
	return &handlerTransaction{TransactionRepository}
}

func (h *handlerTransaction) ShowTransaction(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	roleInfo := r.Context().Value("authInfo").(jwt.MapClaims)
	roleStr := string(roleInfo["role"].(string))

	if roleStr == "user" {
		transaction, err := h.TransactionRepository.ShowTransactionUser()
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			response := dto.ErrorResult{Status: http.StatusBadRequest, Message: err.Error()}
			json.NewEncoder(w).Encode(response)
			return
		}

		w.WriteHeader(http.StatusOK)
		response := dto.SuccessResult{Status: http.StatusOK, Data: transaction}
		json.NewEncoder(w).Encode(response)
	}

	if roleStr == "admin" {
		transaction, err := h.TransactionRepository.ShowTransactionAdmin()
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			response := dto.ErrorResult{Status: http.StatusBadRequest, Message: err.Error()}
			json.NewEncoder(w).Encode(response)
			return
		}

		w.WriteHeader(http.StatusOK)
		response := dto.SuccessResult{Status: http.StatusOK, Data: transaction}
		json.NewEncoder(w).Encode(response)
	}
}

func (h *handlerTransaction) GetTransactionByID(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	id, _ := strconv.Atoi(mux.Vars(r)["id"])
	roleInfo := r.Context().Value("authInfo").(jwt.MapClaims)
	roleStr := string(roleInfo["role"].(string))

	if roleStr == "user" {
		var transaction models.TransactionUser
		transaction, err := h.TransactionRepository.GetTransactionByIDUser(id)
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			response := dto.ErrorResult{Status: http.StatusBadRequest, Message: err.Error()}
			json.NewEncoder(w).Encode(response)
			return
		}

		w.WriteHeader(http.StatusOK)
		response := dto.SuccessResult{Status: http.StatusOK, Data: transaction}
		json.NewEncoder(w).Encode(response)
	}

	if roleStr == "admin" {
		var transaction models.TransactionAdmin
		transaction, err := h.TransactionRepository.GetTransactionByIDAdmin(id)
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			response := dto.ErrorResult{Status: http.StatusBadRequest, Message: err.Error()}
			json.NewEncoder(w).Encode(response)
			return
		}

		w.WriteHeader(http.StatusOK)
		response := dto.SuccessResult{Status: http.StatusOK, Data: transaction}
		json.NewEncoder(w).Encode(response)
	}
}

func (h *handlerTransaction) CreateTransaction(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	roleInfo := r.Context().Value("authInfo").(jwt.MapClaims)
	infoId := int(roleInfo["id"].(float64))
	roleStr := string(roleInfo["role"].(string))
	currentTime := time.Now()

	if roleStr == "user" {
		request := new(transactiondto.CreateTransactionRequest)
		if err := json.NewDecoder(r.Body).Decode(&request); err != nil {
			w.WriteHeader(http.StatusBadRequest)
			response := dto.ErrorResult{Status: http.StatusBadRequest, Message: err.Error()}
			json.NewEncoder(w).Encode(response)
			return
		}

		transaction := models.TransactionUser{
			Date:    currentTime,
			Value:   request.Value,
			Product: request.Product,
			Status:  "Pending",
			BuyerID: infoId,
			AdminID: request.AdminID,
		}

		validation := validator.New()
		err := validation.Struct(request)
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			response := dto.ErrorResult{Status: http.StatusInternalServerError, Message: err.Error()}
			json.NewEncoder(w).Encode(response)
			return
		}

		transaction, err = h.TransactionRepository.CreateTransactionUser(transaction)
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			response := dto.ErrorResult{Status: http.StatusInternalServerError, Message: err.Error()}
			json.NewEncoder(w).Encode(response)
			return
		}

		transaction, _ = h.TransactionRepository.GetTransactionByIDUser(transaction.ID)

		w.WriteHeader(http.StatusOK)
		response := dto.SuccessResult{Status: http.StatusOK, Data: transaction}
		json.NewEncoder(w).Encode(response)
	}

	if roleStr == "admin" {
		request := new(transactiondto.CreateTransactionRequest)
		if err := json.NewDecoder(r.Body).Decode(&request); err != nil {
			w.WriteHeader(http.StatusBadRequest)
			response := dto.ErrorResult{Status: http.StatusBadRequest, Message: err.Error()}
			json.NewEncoder(w).Encode(response)
			return
		}

		transaction := models.TransactionAdmin{
			Date:    currentTime,
			Value:   request.Value,
			Product: request.Product,
			Status:  "Pending",
			BuyerID: request.BuyerID,
			AdminID: infoId,
		}

		validation := validator.New()
		err := validation.Struct(request)
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			response := dto.ErrorResult{Status: http.StatusInternalServerError, Message: err.Error()}
			json.NewEncoder(w).Encode(response)
			return
		}

		transaction, err = h.TransactionRepository.CreateTransactionAdmin(transaction)
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			response := dto.ErrorResult{Status: http.StatusInternalServerError, Message: err.Error()}
			json.NewEncoder(w).Encode(response)
			return
		}

		transaction, _ = h.TransactionRepository.GetTransactionByIDAdmin(transaction.ID)

		w.WriteHeader(http.StatusOK)
		response := dto.SuccessResult{Status: http.StatusOK, Data: transaction}
		json.NewEncoder(w).Encode(response)
	}
}

func (h *handlerTransaction) UpdateTransaction(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	roleInfo := r.Context().Value("authInfo").(jwt.MapClaims)
	roleStr := string(roleInfo["role"].(string))

	if roleStr == "user" {
		request := new(transactiondto.UpdateTransactionRequest)
		if err := json.NewDecoder(r.Body).Decode(&request); err != nil {
			w.WriteHeader(http.StatusBadRequest)
			response := dto.ErrorResult{Status: http.StatusBadRequest, Message: err.Error()}
			json.NewEncoder(w).Encode(response)
			return
		}

		transaction := models.TransactionUser{}

		id, _ := strconv.Atoi(mux.Vars(r)["id"])

		if request.Value != "" {
			transaction.Status = request.Value
		}

		if request.Product != "" {
			transaction.Product = request.Product
		}

		data, err := h.TransactionRepository.UpdateTransactionUser(transaction, id)
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			response := dto.ErrorResult{Status: http.StatusInternalServerError, Message: err.Error()}
			json.NewEncoder(w).Encode(response)
			return
		}

		w.WriteHeader(http.StatusOK)
		response := dto.SuccessResult{Status: http.StatusOK, Data: data}
		json.NewEncoder(w).Encode(response)
	}

	if roleStr == "admin" {
		request := new(transactiondto.UpdateTransactionRequest)
		if err := json.NewDecoder(r.Body).Decode(&request); err != nil {
			w.WriteHeader(http.StatusBadRequest)
			response := dto.ErrorResult{Status: http.StatusBadRequest, Message: err.Error()}
			json.NewEncoder(w).Encode(response)
			return
		}

		transaction := models.TransactionAdmin{}

		id, _ := strconv.Atoi(mux.Vars(r)["id"])

		if request.Value != "" {
			transaction.Status = request.Value
		}

		if request.Product != "" {
			transaction.Product = request.Product
		}

		data, err := h.TransactionRepository.UpdateTransactionAdmin(transaction, id)
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			response := dto.ErrorResult{Status: http.StatusInternalServerError, Message: err.Error()}
			json.NewEncoder(w).Encode(response)
			return
		}

		w.WriteHeader(http.StatusOK)
		response := dto.SuccessResult{Status: http.StatusOK, Data: data}
		json.NewEncoder(w).Encode(response)
	}
}

func (h *handlerTransaction) DeleteTransaction(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	id, _ := strconv.Atoi(mux.Vars(r)["id"])
	roleInfo := r.Context().Value("authInfo").(jwt.MapClaims)
	roleStr := string(roleInfo["role"].(string))

	if roleStr == "user" {
		transaction, err := h.TransactionRepository.GetTransactionByIDUser(id)
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			response := dto.ErrorResult{Status: http.StatusBadRequest, Message: err.Error()}
			json.NewEncoder(w).Encode(response)
			return
		}

		data, err := h.TransactionRepository.DeleteTransactionUser(transaction, id)
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			response := dto.ErrorResult{Status: http.StatusInternalServerError, Message: err.Error()}
			json.NewEncoder(w).Encode(response)
			return
		}

		w.WriteHeader(http.StatusOK)
		response := dto.SuccessResult{Status: http.StatusOK, Data: data}
		json.NewEncoder(w).Encode(response)
	}

	if roleStr == "admin" {
		transaction, err := h.TransactionRepository.GetTransactionByIDAdmin(id)
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			response := dto.ErrorResult{Status: http.StatusBadRequest, Message: err.Error()}
			json.NewEncoder(w).Encode(response)
			return
		}

		data, err := h.TransactionRepository.DeleteTransactionAdmin(transaction, id)
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			response := dto.ErrorResult{Status: http.StatusInternalServerError, Message: err.Error()}
			json.NewEncoder(w).Encode(response)
			return
		}

		w.WriteHeader(http.StatusOK)
		response := dto.SuccessResult{Status: http.StatusOK, Data: data}
		json.NewEncoder(w).Encode(response)
	}
}
