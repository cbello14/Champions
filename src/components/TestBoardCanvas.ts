class Test {
    private canvas!: HTMLCanvasElement;
    private context!: CanvasRenderingContext2D;

    private clickX: number[] = [];
    private clickY: number[] = [];

    constructor() {
        console.log("h");
        const canvasInit = document.getElementById("board") as HTMLCanvasElement;
        if (canvasInit === null) {
            return;
        }
        const contextInit = canvasInit.getContext("2d");
        if (contextInit === null) {
            return;
        }
        contextInit.lineCap = "round";
        contextInit.lineJoin = 'round';
        contextInit.strokeStyle = 'white';
        contextInit.lineWidth = 1;

        this.canvas = canvasInit;
        this.context = contextInit;

        this.createUserEvents();
    }

    private createUserEvents() {
        const canvas = this.canvas;
        canvas.addEventListener("mouseenter", this.onClick);
    }

    private onClick = () => {
        console.log("click");
    }
}

console.log("a");
new Test();