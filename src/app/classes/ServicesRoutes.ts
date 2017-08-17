export class ServicesRoutes {

  private _base: string;

  constructor() {
    this._base = './index.php?option=com_cios';
  }

  makePath(controller: string, task: string): string {
    return this._base + '&task=' + controller + '.' + task;
  }

  _(controller: string, task: string): string {
    return this.makePath(controller, task);
  }

  userInfo(): string {
    return this._('User', 'info');
  }

  userOne(): string {
    return this._('Nghistorical', 'one');

  }

  users(): string {
    return this._('Nghistorical', 'getAll');
  }

  checkIn(): string {
    return this._('Nghistorical', 'checkin');
  }

  checkOut(): string {
    return this._('Nghistorical', 'checkout');
  }

  checkOutAll(): string {
    return this._('Nghistorical', 'checkoutbatch');
  }
}
