package repositories

import (
	"backend/models"

	"gorm.io/gorm"
)

type AuthRepository interface {
	RegisterUser(user models.User) (models.User, error)
	RegisterAdmin(admin models.Admin) (models.Admin, error)
	LoginUser(email string) (models.User, error)
	LoginAdmin(email string) (models.Admin, error)
}

func RepositoryAuth(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) RegisterUser(user models.User) (models.User, error) {
	err := r.db.Create(&user).Error

	return user, err
}

func (r *repository) RegisterAdmin(admin models.Admin) (models.Admin, error) {
	err := r.db.Create(&admin).Error

	return admin, err
}

func (r *repository) LoginUser(email string) (models.User, error) {
	var user models.User
	err := r.db.First(&user, "email=?", email).Error

	return user, err
}

func (r *repository) LoginAdmin(email string) (models.Admin, error) {
	var admin models.Admin
	err := r.db.First(&admin, "email=?", email).Error

	return admin, err
}
