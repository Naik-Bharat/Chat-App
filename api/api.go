package api

import (
	"encoding/json"
	"errors"
	"log"

	"github.com/gofiber/websocket/v2"
)

type client struct {
	conn *websocket.Conn
}

type message struct {
	Name string `json:"name"`
	Data string `json:"data"`
}

// map of all clients with room nos
var clients map[string][]*client = make(map[string][]*client)

// function to delete a connection from slice of connections, returns same slice if connection not found
func deleteConection(connections []*client, connection *websocket.Conn) ([]*client, error) {
	for index, element := range connections {
		if element.conn == connection {
			return append(connections[:index], connections[index+1:]...), nil
		}
	}
	return connections, errors.New("could not find connection")
}

func HandleWebSocket(c *websocket.Conn) {
	roomId := c.Params("roomId")
	log.Println("New connection made to room no.", roomId)
	// add connection to list of connections on this room number
	clients[roomId] = append(clients[roomId], &client{c})

	var (
		msgType int
		msg     []byte
		err     error
	)

	c.SetCloseHandler(func(code int, text string) error {
		log.Println("Connection closed with status code", code)
		// remove from list of connections
		clients[roomId], err = deleteConection(clients[roomId], c)
		if err != nil {
			log.Println("Error removing connections", err)
		}
		return nil
	})

	for {
		if msgType, msg, err = c.ReadMessage(); err != nil {
			log.Printf("read: %s", err)
			break
		}
		log.Printf("recv: %s", msg)

		var decodedMessage message
		err := json.Unmarshal([]byte(msg), &decodedMessage)
		if err != nil {
			log.Println(err)
		}
		log.Println(decodedMessage.Name + " sent " + decodedMessage.Data)

		// send msg to all connections except current connecton
		for _, connection := range clients[roomId] {
			if connection.conn != c {
				if err := connection.conn.WriteMessage(msgType, msg); err != nil {
					log.Println("write:", err)
					break
				}
				log.Printf("send: %s", msg)
			}
		}
	}
}
