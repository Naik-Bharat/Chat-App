package config

import (
	"log"
	"os"
	"strconv"
	"sync"

	"github.com/joho/godotenv"
)

type Config struct {
	Port         int
	AllowOrigins string
	NameLimit    int
	RoomIDLimit  int
	MessageLimit int
}

var (
	cfg  *Config
	once sync.Once
)

func lookUp(key string) string {
	value, flag := os.LookupEnv(key)
	if !flag {
		log.Fatal(key, "not found in .env")
	}
	return value
}

func LoadConfig() *Config {
	once.Do(func() {
		log.Println("Loading env variables")
		err := godotenv.Load()
		if err != nil {
			log.Fatal(err)
		}

		port, err := strconv.Atoi(lookUp("PORT"))
		if err != nil {
			log.Fatal("Can't convert port to int")
		}

		allowOirigins := lookUp("ALLOW_ORIGINS")

		roomIDLimit, err := strconv.Atoi(lookUp("ROOMID_LIMIT"))
		if err != nil {
			log.Fatal("Can't convert port to int")
		}

		nameLimit, err := strconv.Atoi(lookUp("PORT"))
		if err != nil {
			log.Fatal("Can't convert port to int")
		}

		cfg = &Config{
			Port:         port,
			AllowOrigins: allowOirigins,
			NameLimit:    nameLimit,
			RoomIDLimit:  roomIDLimit,
		}
	})

	return cfg
}
