package handlers

import (
	dto "backend/dto/result"
	usersdto "backend/dto/users"
	"backend/models"
	"backend/pkg/bcrypt"
	"backend/repositories"
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/golang-jwt/jwt/v4"
	"github.com/gorilla/mux"
)

type handler struct {
	UserRepository repositories.UserRepository
}

func HandlerUser(UserRepository repositories.UserRepository) *handler {
	return &handler{UserRepository}
}

func (h *handler) ShowUsers(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	roleInfo := r.Context().Value("authInfo").(jwt.MapClaims)
	roleStr := string(roleInfo["role"].(string))

	if roleStr == "user" {
		users, err := h.UserRepository.ShowUsers()
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			json.NewEncoder(w).Encode(err.Error())
		}

		for i, p := range users {
			users[i].Image = "http://localhost:5000/uploads/" + p.Image
		}

		w.WriteHeader(http.StatusOK)
		response := dto.SuccessResult{Status: http.StatusOK, Data: users}
		json.NewEncoder(w).Encode(response)
	}

	if roleStr == "admin" {
		users, err := h.UserRepository.ShowAdmins()
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			json.NewEncoder(w).Encode(err.Error())
		}

		for i, p := range users {
			users[i].Image = "http://localhost:5000/uploads/" + p.Image
		}

		w.WriteHeader(http.StatusOK)
		response := dto.SuccessResult{Status: http.StatusOK, Data: users}
		json.NewEncoder(w).Encode(response)
	}
}

func (h *handler) GetUserByID(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	id, _ := strconv.Atoi(mux.Vars(r)["id"])
	roleInfo := r.Context().Value("authInfo").(jwt.MapClaims)
	roleStr := string(roleInfo["role"].(string))

	if roleStr == "user" {
		user, err := h.UserRepository.GetUserByIDUser(id)
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			response := dto.ErrorResult{Status: http.StatusBadRequest, Message: err.Error()}
			json.NewEncoder(w).Encode(response)
			return
		}

		if user.ID == 0 {
			w.WriteHeader(http.StatusNotFound)
			response := dto.ErrorResult{Status: http.StatusNotFound, Message: "ID: " + strconv.Itoa(id) + " not found!"}
			json.NewEncoder(w).Encode(response)
			return
		}

		user.Image = "http://localhost:5000/uploads/" + user.Image

		w.WriteHeader(http.StatusOK)
		response := dto.SuccessResult{Status: http.StatusOK, Data: user}
		json.NewEncoder(w).Encode(response)
	}

	if roleStr == "admin" {
		user, err := h.UserRepository.GetUserByIDAdmin(id)
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			response := dto.ErrorResult{Status: http.StatusBadRequest, Message: err.Error()}
			json.NewEncoder(w).Encode(response)
			return
		}

		if user.ID == 0 {
			w.WriteHeader(http.StatusNotFound)
			response := dto.ErrorResult{Status: http.StatusNotFound, Message: "ID: " + strconv.Itoa(id) + " not found!"}
			json.NewEncoder(w).Encode(response)
			return
		}

		user.Image = "http://localhost:5000/uploads/" + user.Image

		w.WriteHeader(http.StatusOK)
		response := dto.SuccessResult{Status: http.StatusOK, Data: user}
		json.NewEncoder(w).Encode(response)
	}
}

func (h *handler) UpdateUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	roleInfo := r.Context().Value("authInfo").(jwt.MapClaims)
	roleStr := string(roleInfo["role"].(string))

	if roleStr == "user" {
		request := new(usersdto.UpdateUserRequest)
		if err := json.NewDecoder(r.Body).Decode(&request); err != nil {
			w.WriteHeader(http.StatusBadRequest)
			response := dto.ErrorResult{Status: http.StatusBadRequest, Message: err.Error()}
			json.NewEncoder(w).Encode(response)
			return
		}

		id, _ := strconv.Atoi(mux.Vars(r)["id"])

		user := models.User{}

		user.ID = id

		if request.FullName != "" {
			user.FullName = request.FullName
		}

		if request.Email != "" {
			user.Email = request.Email
		}

		if request.Password != "" {
			password, err := bcrypt.HashingPassword(request.Password)
			if err != nil {
				w.WriteHeader(http.StatusInternalServerError)
				response := dto.ErrorResult{Status: http.StatusInternalServerError, Message: err.Error()}
				json.NewEncoder(w).Encode(response)
			}
			user.Password = password
		}

		if request.Phone != "" {
			user.Phone = request.Phone
		}

		if request.Location != "" {
			user.Location = request.Location
		}

		if request.Gender != "" {
			user.Gender = request.Gender
		}

		data, err := h.UserRepository.UpdateUser(user, id)
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
		request := new(usersdto.UpdateUserRequest)
		if err := json.NewDecoder(r.Body).Decode(&request); err != nil {
			w.WriteHeader(http.StatusBadRequest)
			response := dto.ErrorResult{Status: http.StatusBadRequest, Message: err.Error()}
			json.NewEncoder(w).Encode(response)
			return
		}

		id, _ := strconv.Atoi(mux.Vars(r)["id"])

		user := models.Admin{}

		user.ID = id

		if request.FullName != "" {
			user.FullName = request.FullName
		}

		if request.Email != "" {
			user.Email = request.Email
		}

		if request.Password != "" {
			password, err := bcrypt.HashingPassword(request.Password)
			if err != nil {
				w.WriteHeader(http.StatusInternalServerError)
				response := dto.ErrorResult{Status: http.StatusInternalServerError, Message: err.Error()}
				json.NewEncoder(w).Encode(response)
			}
			user.Password = password
		}

		if request.Phone != "" {
			user.Phone = request.Phone
		}

		if request.Location != "" {
			user.Location = request.Location
		}

		if request.Gender != "" {
			user.Gender = request.Gender
		}

		data, err := h.UserRepository.UpdateAdmin(user, id)
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

func (h *handler) DeleteUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	id, _ := strconv.Atoi(mux.Vars(r)["id"])
	roleInfo := r.Context().Value("authInfo").(jwt.MapClaims)
	roleStr := string(roleInfo["role"].(string))

	if roleStr == "user" {
		user, err := h.UserRepository.GetUserByIDUser(id)
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			response := dto.ErrorResult{Status: http.StatusBadRequest, Message: err.Error()}
			json.NewEncoder(w).Encode(response)
			return
		}

		data, err := h.UserRepository.DeleteUser(user, id)
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
		user, err := h.UserRepository.GetUserByIDAdmin(id)
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			response := dto.ErrorResult{Status: http.StatusBadRequest, Message: err.Error()}
			json.NewEncoder(w).Encode(response)
			return
		}

		data, err := h.UserRepository.DeleteAdmin(user, id)
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
