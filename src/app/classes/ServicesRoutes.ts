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
    return this.makePath('User', 'info');
  }

  userOne(): string {
    return this.makePath('Nghistorical', 'one');

  }

  users(): string {
    return this.makePath('Nghistorical', 'getAll');
  }

  checkIn(): string {
    return this.makePath('Nghistorical', 'checkin');
  }

  checkOut(): string {
    return this.makePath('Nghistorical', 'checkout');
  }

  checkOutAll(): string {
    return this.makePath('Nghistorical', 'checkoutbatch');
  }
}
