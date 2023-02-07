package main

import (
	"github.com/Naik-Bharat/chat-app/api"
	"github.com/gofiber/fiber/v2"
)

func main() {
	app := fiber.New()
	app.Post("/api/send", api.Send)
	app.Post("/api/receive", api.GetMsgHistory)
	app.Listen(":8080")
}
