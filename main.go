package main

import (
	"strconv"

	"github.com/Naik-Bharat/chat-app/api"
	"github.com/Naik-Bharat/chat-app/config"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/websocket/v2"
)

func main() {
	app := fiber.New()

	app.Use("/ws", func(c *fiber.Ctx) error {
		if websocket.IsWebSocketUpgrade(c) {
			c.Locals("allowed", true)
			return c.Next()
		}
		return fiber.ErrUpgradeRequired
	})

	app.Get("/ws/:roomId", websocket.New(api.HandleWebSocket))

	app.Use(cors.New())

	app.Use(cors.New(cors.Config{
		AllowOrigins: config.LoadConfig().AllowOrigins,
	}))

	app.Listen(":" + strconv.Itoa(config.LoadConfig().Port))
}
