import "@stdlib/deploy";

contract FirstContract with Deployable {
    // State variable to store the counter value
    counter: Int as uint32;
    
    // Initialize counter with 0
    init() {
        self.counter = 0;
    }

    // Get the current counter value
    get fun counter(): Int {
        return self.counter;
    }

    // Increment the counter
    receive("increment") {
        self.counter = self.counter + 1;
    }

    // Add a specific amount to the counter
    receive("add") {
        self.counter = self.counter + 5;
    }
}
