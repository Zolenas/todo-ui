export class Task {

    private description: string;
    private status: boolean;
    private title: string;

    constructor(title: string, status?: boolean, desc?: string) {
        this.title = title;
        this.status = status ? status : false;
        this.description = desc ? desc : "";
    }

    getTitle() {
        return this.title;
    }

    setTitle(title) {
        this.title = title;
    }

    getStatus() {
        return this.status;
    }

    setStatus(status) {
        this.status = status;
    }

    getDescription() {
        return this.description;
    }

    setDescription(desc) {
        this.description = desc;
    }
}
