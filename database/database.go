package database

type Msg struct {
	User string
	Msg  string
	Room string
}

var MsgList []Msg = []Msg{}

func AddMsg(msg Msg) {
	MsgList = append(MsgList, msg)
}

func ReceiveMsgHistory(room string) []Msg {
	list := []Msg{}
	for _, msg := range MsgList {
		if msg.Room == room {
			list = append(list, msg)
		}
	}
	return list
}
