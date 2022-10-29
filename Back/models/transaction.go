package models

import "time"

type TransactionUser struct {
	ID      int       `json:"id" gorm:"primary_key:auto_increment"`
	Value   int       `json:"value" form:"value" gorm:"type: varchar(255)"`
	Status  string    `json:"status" form:"status" gorm:"type: varchar(255)"`
	AdminID int       `json:"admin_id"`
	Product string    `json:"product" form:"product" gorm:"type: varchar(255)"`
	Date    time.Time `json:"-"`
}
