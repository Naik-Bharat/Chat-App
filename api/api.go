package api

import (
	"log"

	"github.com/Naik-Bharat/chat-app/database"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/websocket/v2"
)

type client struct {
	conn *websocket.Conn
}

// // map of all clients with room nos
// var clients map[int]*client
var clients []*client

func HandleWebSocket(c *websocket.Conn) {
	clients = append(clients, &client{c})
	log.Println(c.Locals("allowed"))
	log.Println(c.Params("id"))

	var (
		msgType int
		msg     []byte
		err     error
	)

	c.SetCloseHandler(func(code int, text string) error {
		log.Println("Connection closed with status code", code)
		// remove from list of connections
		return nil
	})

	for {
		if msgType, msg, err = c.ReadMessage(); err != nil {
			log.Printf("read: %s", err)
			break
		}
		log.Printf("recv: %s", msg)
		log.Println(clients)

		msg = []byte("test")
		if err := c.WriteMessage(msgType, msg); err != nil {
			log.Println("write:", err)
			break
		}
		log.Printf("send: %s", msg)
	}
}

// clients := map[[]byte][]

// func Send(c *fiber.Ctx) error {
// 	body := new(database.Msg)
// 	err := c.BodyParser(body)
// 	if err != nil {
// 		c.Status(fiber.StatusBadRequest).SendString(err.Error())
// 		return err
// 	}
// 	if len(body.User) > 20 || len(body.User) == 0 {
// 		return c.Status(fiber.StatusBadRequest).SendString("UserName cannot be greater than 20 or empty")
// 	}
// 	if len(body.Msg) > 1000 || len(body.Msg) == 0 {
// 		return c.Status(fiber.StatusBadRequest).SendString("Message cannot be greater than 1000 or empty")
// 	}
// 	if len(body.Room) > 20 || len(body.Room) == 0 {
// 		return c.Status(fiber.StatusBadRequest).SendString("Room Name cannot be greater than 20 or empty")
// 	}
// 	msg := database.Msg{
// 		User: body.User,
// 		Msg:  body.Msg,
// 		Room: body.Room,
// 	}
// 	database.AddMsg(msg)
// 	return c.JSON(msg)
// }

func GetMsgHistory(c *fiber.Ctx) error {
	body := new(struct {
		Room string
	})
	err := c.BodyParser(body)
	if err != nil {
		c.Status(fiber.StatusBadRequest).SendString(err.Error())
		return err
	}
	if len(body.Room) > 20 {
		return c.Status(fiber.StatusBadRequest).SendString("Room Name cannot be greater than 20")
	}
	msgList := database.ReceiveMsgHistory(body.Room)
	return c.JSON(msgList)
}
