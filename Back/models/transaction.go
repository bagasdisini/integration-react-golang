package models

import "time"

type TransactionUser struct {
	ID      int       `json:"id" gorm:"primary_key:auto_increment"`
	Date    time.Time `json:"date" form:"date"`
	Value   string    `json:"value" form:"value" gorm:"type: varchar(255)"`
	Status  string    `json:"status" form:"status" gorm:"type: varchar(255)"`
	AdminID int       `json:"admin_id"`
	Admin   Admin     `json:"admin" gorm:"foreignKey:AdminID"`
	BuyerID int       `json:"user_id"`
	Buyer   User      `json:"user" gorm:"foreignKey:BuyerID"`
	Product string    `json:"product" form:"product" gorm:"type: varchar(255)"`
}

type TransactionAdmin struct {
	ID      int       `json:"id" gorm:"primary_key:auto_increment"`
	Date    time.Time `json:"date" form:"date"`
	Value   string    `json:"value" form:"value" gorm:"type: varchar(255)"`
	Status  string    `json:"status" form:"status" gorm:"type: varchar(255)"`
	AdminID int       `json:"admin_id"`
	Admin   Admin     `json:"admin" gorm:"foreignKey:AdminID"`
	BuyerID int       `json:"user_id"`
	Buyer   User      `json:"user" gorm:"foreignKey:BuyerID"`
	Product string    `json:"product" form:"product" gorm:"type: varchar(255)"`
}
