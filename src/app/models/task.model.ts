export class Task {

  private description: string;
  private id: string;
  private status: boolean;
  private title: string;
  private createdOn: number;

  constructor(id: string, title: string, status?: boolean, desc?: string, createdOn?: number) {
    this.id = id;
    this.title = title;
    this.status = status ? status : false;
    this.description = desc ? desc : '';
    this.createdOn = createdOn || Date.now();
  }

  getId() {
    return this.id;
  }

  setId(id) {
    this.id = id;
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

  getCreatedOn() {
    return this.createdOn;
  }
}
