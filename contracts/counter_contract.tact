contract CounterContract {
    id: Int as uint32;
    value: Int as int64;

    init(id:  Int) {
        self.id = id;
        self.value = 0;
    }

    receive(msg: Increment) {
        self.value += msg.amount;
    }

    get fun value(): Int {
        return self.value;
    }
}

message Increment  {
    amount: Int as int32;
}