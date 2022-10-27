package repositories

import (
	"backend/models"

	"gorm.io/gorm"
)

type TransactionRepository interface {
	ShowTransactionUser() ([]models.TransactionUser, error)
	ShowTransactionAdmin() ([]models.TransactionAdmin, error)
	GetTransactionByIDUser(ID int) (models.TransactionUser, error)
	GetTransactionByIDAdmin(ID int) (models.TransactionAdmin, error)
	CreateTransactionUser(transaction models.TransactionUser) (models.TransactionUser, error)
	CreateTransactionAdmin(transaction models.TransactionAdmin) (models.TransactionAdmin, error)
	UpdateTransactionUser(transaction models.TransactionUser, ID int) (models.TransactionUser, error)
	UpdateTransactionAdmin(transaction models.TransactionAdmin, ID int) (models.TransactionAdmin, error)
	DeleteTransactionUser(transaction models.TransactionUser, ID int) (models.TransactionUser, error)
	DeleteTransactionAdmin(transaction models.TransactionAdmin, ID int) (models.TransactionAdmin, error)
}

func RepositoryTransaction(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) ShowTransactionUser() ([]models.TransactionUser, error) {
	var transactions []models.TransactionUser
	err := r.db.Preload("Buyer").Find(&transactions).Error

	return transactions, err
}

func (r *repository) ShowTransactionAdmin() ([]models.TransactionAdmin, error) {
	var transactions []models.TransactionAdmin
	err := r.db.Preload("Admin").Find(&transactions).Error

	return transactions, err
}

func (r *repository) GetTransactionByIDUser(ID int) (models.TransactionUser, error) {
	var transactions models.TransactionUser
	err := r.db.Preload("Buyer").First(&transactions, ID).Error

	return transactions, err
}

func (r *repository) GetTransactionByIDAdmin(ID int) (models.TransactionAdmin, error) {
	var transactions models.TransactionAdmin
	err := r.db.Preload("Admin").First(&transactions, ID).Error

	return transactions, err
}

func (r *repository) CreateTransactionUser(transaction models.TransactionUser) (models.TransactionUser, error) {
	err := r.db.Create(&transaction).Error

	return transaction, err
}

func (r *repository) CreateTransactionAdmin(transaction models.TransactionAdmin) (models.TransactionAdmin, error) {
	err := r.db.Create(&transaction).Error

	return transaction, err
}

func (r *repository) UpdateTransactionUser(transaction models.TransactionUser, ID int) (models.TransactionUser, error) {
	err := r.db.Model(&transaction).Where("id=?", ID).Updates(&transaction).Error

	return transaction, err
}

func (r *repository) UpdateTransactionAdmin(transaction models.TransactionAdmin, ID int) (models.TransactionAdmin, error) {
	err := r.db.Model(&transaction).Where("id=?", ID).Updates(&transaction).Error

	return transaction, err
}

func (r *repository) DeleteTransactionUser(transaction models.TransactionUser, ID int) (models.TransactionUser, error) {
	err := r.db.Delete(&transaction).Error

	return transaction, err
}

func (r *repository) DeleteTransactionAdmin(transaction models.TransactionAdmin, ID int) (models.TransactionAdmin, error) {
	err := r.db.Delete(&transaction).Error

	return transaction, err
}
