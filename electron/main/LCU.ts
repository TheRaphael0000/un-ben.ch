import LCUConnector from 'lcu-connector'
const events = require('events')

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

class LCU {
    connector: any;
    events: any;
    connection_infos: any;

    constructor() {
        this.connector = new LCUConnector()
        this.events = new events.EventEmitter()

        this.connection_infos = null
        this.connector.on('connect', (connection_infos) => {
            this.connection_infos = connection_infos
            console.log(this.connection_infos)
            this.events.emit("connected")
        })

        this.connector.on("disconnect", () => {
            console.log("Client closed")
            this.connection_infos = null
            this.events.emit("disconnected")
        })
        this.connector.start()
    }

    fetch(method, type, url) {
        if (this.connection_infos == null)
            return null

        let endpoint = `${this.connection_infos.protocol}://${this.connection_infos.address}:${this.connection_infos.port}`
        let headers = new Headers()
        headers.set('Authorization', 'Basic ' + Buffer.from(this.connection_infos.username + ":" + this.connection_infos.password).toString('base64'))

        let full_url = `${endpoint}${url}`
        let params = {
            method: method,
            headers: headers,
        }
        console.log(full_url)

        let promise = fetch(full_url, params)

        return promise.then(r => {
            if (type == "json")
                return r.json()
            else if (type == "text")
                return r.text()
        })

    }
}

export default LCU