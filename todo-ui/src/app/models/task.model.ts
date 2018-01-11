export class Task {

  description: string;
  id: string;
  status: boolean;
  title: string;
  createdOn: number;

  constructor(id: string, title: string, status?: boolean, desc?: string, createdOn?: number) {
    this.id = id;
    this.title = title;
    this.status = status ? status : false;
    this.description = desc ? desc : '';
    this.createdOn = createdOn || Date.now();
  }

  /**
   * Get the task ID
   *
   * @returns
   * @memberof Task
   */
  getId() {
    return this.id;
  }

  /**
   * Set the task ID
   *
   * @param {any} id
   * @memberof Task
   */
  setId(id) {
    this.id = id;
  }

  /**
   * Get the task title
   *
   * @returns
   * @memberof Task
   */
  getTitle() {
    return this.title;
  }

  /**
   * Set the task title
   *
   * @param {any} title
   * @memberof Task
   */
  setTitle(title) {
    this.title = title;
  }

  /**
   * Get the task status
   *
   * @returns
   * @memberof Task
   */
  getStatus() {
    return this.status;
  }

  /**
   * Set the task status
   *
   * @param {any} status
   * @memberof Task
   */
  setStatus(status) {
    this.status = status;
  }

  /**
   * Get the task description
   *
   * @returns
   * @memberof Task
   */
  getDescription() {
    return this.description;
  }

  /**
   * Set the task description
   *
   * @param {any} desc
   * @memberof Task
   */
  setDescription(desc) {
    this.description = desc;
  }

  /**
   * Get the task creation date
   *
   * @returns
   * @memberof Task
   */
  getCreatedOn() {
    return this.createdOn;
  }
}
