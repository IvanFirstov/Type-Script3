// Определение интерфейса Logger
interface Logger {
  log(message: string): void;
}

// Определение класса Plotter
class Plotter {
  private position: { x: number; y: number };
  private angle: number;
  private isCarriageDown: boolean;
  private color: string;
  private logger: Logger;

  constructor(logger: Logger) {
    this.position = { x: 0, y: 0 };
    this.angle = 0;
    this.isCarriageDown = false;
    this.color = 'black';
    this.logger = logger;
  }

  move(distance: number): void {
    const newX = this.position.x + distance * Math.cos(this.angle * (Math.PI / 180));
    const newY = this.position.y + distance * Math.sin(this.angle * (Math.PI / 180));
    const from = `(${this.position.x}, ${this.position.y})`;
    const to = `(${newX}, ${newY})`;
    const lineInfo = `Чертим линию из ${from} в ${to} используя ${this.color} цвет.`;
    const moveInfo = `Передвигаем на ${distance} от точки ${from}.`;

    this.logger.log(this.isCarriageDown ? lineInfo : moveInfo);

    this.position.x = newX;
    this.position.y = newY;
  }

  turn(degrees: number): void {
    this.logger.log(`Поворачиваем на ${degrees} градусов.`);
    this.angle += degrees;
  }

  carriageDown(): void {
    this.logger.log('Опускаем каретку.');
    this.isCarriageDown = true;
  }

  carriageUp(): void {
    this.logger.log('Поднимаем каретку.');
    this.isCarriageDown = false;
  }

  setColor(color: string): void {
    this.logger.log(`Устанавливаем ${color} цвет линии.`);
    this.color = color;
  }

  setPosition(x: number, y: number): void {
    this.logger.log(`Устанавливаем позицию каретки в (${x}, ${y}).`);
    this.position.x = x;
    this.position.y = y;
  }
}

// Определение класса LogToConsole, реализующего интерфейс Logger
class LogToConsole implements Logger {
  log(message: string): void {
    console.log(message);
  }
}

// Функция для черчения треугольника
function drawTriangle(plt: Plotter, size: number): void {
  plt.setColor('Green');
  plt.carriageDown();
  for (let i = 0; i < 3; ++i) {
    plt.move(size);
    plt.carriageUp();
    plt.turn(120.0);
    plt.carriageDown();
  }
  plt.carriageUp();
}

// Создание экземпляра плоттера и рисование треугольника
const plotter = new Plotter(new LogToConsole());
drawTriangle(plotter, 100.0);
