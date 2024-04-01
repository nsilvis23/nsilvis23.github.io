import EventEmitter from "events"

export default class Size extends EventEmitter {
    constructor () {
        super();
        console.log("BUILDING SIZE")
        this.width = window.innerWidth
        this.height = window.innerHeight
        
        
        this.ar = this.width / this.height
        this.pixelRatio = Math.min(window.devicePixelRatio, 2)
        this.frustrum = 12
        switch(this.width) {
            case (this.width <= 480):
                this.device = 'm'
                console.log("SET TO MOBILE")
                break;
            case (this.width > 480 && this.width <= 960):
                this.device = 't'
                console.log("SET TO TABLET")
                break;
            default:
                this.device = 'd'
                console.log("SET TO DESKTOP")
            }
        console.log("Done Building Size")


        window.addEventListener('resize', () => {
            this.width = window.innerWidth
            this.height = window.innerHeight
            this.ar = this.width / this.height
            this.pixelRatio = Math.min(window.devicePixelRatio, 2)


            this.emit('resize')


            if(this.width <= 480 && this.device !== 'm') {
                this.device = 'm'
                console.log("SWITCHING TO MOBILE")
                this.emit('switchdevice', this.device)
            } else if(this.width > 480 && this.width <= 960 && this.device !== 't') {
                this.device = 't'
                console.log("SWITCHING TO TABLET")
            } else if(this.width > 960 && this.device !== 'd') {
                this.device = 'd';
                console.log("SWITCHING TO DESKTOP")
            }
        })
    }
}

    