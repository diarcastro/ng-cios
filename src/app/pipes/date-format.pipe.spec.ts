import { DateFormatPipe } from './date-format.pipe';

describe('DateFormatPipe', () => {
  it('create an instance', () => {
    const pipe = new DateFormatPipe();
    expect(pipe).toBeTruthy();
  });

  it('show date martes 15 de agosto de 2017', () => {
    const pipe = new DateFormatPipe();
    const date = new Date(2017, 7, 15, 12, 0, 0);
    const transform: string = pipe.transform(date.getTime() / 1000);
    expect(transform).toContain('martes 15 de agosto de 2017, 12:00');
  });
});
